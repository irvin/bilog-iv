const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = process.cwd();
const POSTS_DIR = path.join(ROOT, 'src', 'posts');
const ASSETS_DIR = path.join(ROOT, 'src', 'assets', 'images');
const MANIFEST_PATH = path.join(ROOT, 'src', 'assets', 'image-manifest.json');

const IMG_SRC_PATTERN = /<img\b[^>]*?\bsrc=(['"])(.*?)\1/gi;
const MAX_RETRIES_PER_CANDIDATE = 1;
const FETCH_TIMEOUT_MS = 8000;
const CONCURRENCY = 8;

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function loadManifestCache() {
  if (!fs.existsSync(MANIFEST_PATH)) {
    return { success: new Map(), failed: new Set() };
  }
  try {
    const raw = fs.readFileSync(MANIFEST_PATH, 'utf8');
    const parsed = JSON.parse(raw);
    const items = Array.isArray(parsed.items) ? parsed.items : [];
    const success = new Map();
    const failed = new Set();
    for (const item of items) {
      if (!item || !item.originalUrl) continue;
      if (item.localPath) {
        const abs = path.join(ROOT, 'src', item.localPath.replace(/^\//, ''));
        if (fs.existsSync(abs)) {
          success.set(item.originalUrl, item.localPath);
        }
      } else if (item.status === 'failed') {
        failed.add(item.originalUrl);
      }
    }
    return { success, failed };
  } catch {
    return { success: new Map(), failed: new Set() };
  }
}

function listPostFiles() {
  return fs.readdirSync(POSTS_DIR)
    .filter((name) => name.endsWith('.md'))
    .map((name) => path.join(POSTS_DIR, name));
}

function extractImageUrlsFromText(text) {
  const urls = [];
  let match;
  while ((match = IMG_SRC_PATTERN.exec(text)) !== null) {
    if (match[2]) urls.push(match[2]);
  }
  return urls;
}

function unique(arr) {
  return [...new Set(arr)];
}

function isHttpUrl(urlText) {
  return /^https?:\/\//i.test(urlText);
}

function shouldLocalize(urlText) {
  if (!isHttpUrl(urlText)) return false;
  let u;
  try {
    u = new URL(urlText);
  } catch {
    return false;
  }

  const host = u.host.toLowerCase();
  if (host.includes('medium.com')) return true;
  if (host.includes('staticflickr.com')) return true;
  if (host === 'static.flickr.com') return true;
  if (/^farm\d+\.static\.flickr\.com$/.test(host)) return true;
  return false;
}

function normalizedUrl(urlText) {
  try {
    const u = new URL(urlText);
    u.hash = '';
    return u.toString();
  } catch {
    return urlText;
  }
}

function mediumCandidates(urlText) {
  const list = [];
  let u;
  try {
    u = new URL(urlText);
  } catch {
    return [urlText];
  }

  u.protocol = 'https:';
  const p = u.pathname;

  const maxMatch = p.match(/\/max\/(\d+)\//i);
  if (maxMatch) {
    const hi = p.replace(/\/max\/\d+\//i, '/max/4096/');
    list.push(new URL(hi + u.search, `${u.protocol}//${u.host}`).toString());
  }

  if (/\/fit\/c\/\d+\/\d+\//i.test(p)) {
    const p1 = p.replace(/\/fit\/c\/\d+\/\d+\//i, '/max/4096/');
    list.push(new URL(p1 + u.search, `${u.protocol}//${u.host}`).toString());
  }

  list.push(u.toString());
  list.push(urlText.replace(/^http:\/\//i, 'https://'));

  return unique(list);
}

function flickrCandidates(urlText) {
  let u;
  try {
    u = new URL(urlText);
  } catch {
    return [urlText];
  }

  const protocol = 'https:';
  const host = u.host;
  const pathname = u.pathname;
  const match = pathname.match(/^(.*\/\d+_[a-z0-9]+)(?:_([a-z0-9]+))?(\.[a-z0-9]+)$/i);

  if (!match) {
    return unique([
      `${protocol}//${host}${pathname}${u.search}`,
      urlText.replace(/^http:\/\//i, 'https://')
    ]);
  }

  const prefix = match[1];
  const ext = match[3];
  const suffixes = ['_o', '_k', '_h', '_b', ''];

  const list = suffixes.map((suffix) => `${protocol}//${host}${prefix}${suffix}${ext}${u.search}`);
  list.push(urlText.replace(/^http:\/\//i, 'https://'));
  return unique(list);
}

function buildCandidates(urlText) {
  let u;
  try {
    u = new URL(urlText);
  } catch {
    return [urlText];
  }

  const host = u.host.toLowerCase();
  if (host.includes('medium.com')) return mediumCandidates(urlText);
  if (host.includes('staticflickr.com') || host === 'static.flickr.com' || /^farm\d+\.static\.flickr\.com$/.test(host)) {
    return flickrCandidates(urlText);
  }

  return [urlText];
}

function extFromUrlOrType(urlText, contentType) {
  try {
    const u = new URL(urlText);
    const ext = path.extname(u.pathname).toLowerCase();
    if (ext && ext.length <= 5) return ext;
  } catch {
    // ignore
  }

  if (contentType) {
    if (contentType.includes('jpeg')) return '.jpg';
    if (contentType.includes('png')) return '.png';
    if (contentType.includes('webp')) return '.webp';
    if (contentType.includes('gif')) return '.gif';
    if (contentType.includes('svg')) return '.svg';
  }

  return '.img';
}

async function fetchImage(urlText) {
  for (let attempt = 1; attempt <= MAX_RETRIES_PER_CANDIDATE; attempt += 1) {
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
      const res = await fetch(urlText, {
        redirect: 'follow',
        signal: controller.signal,
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; blog-image-localizer/1.0)'
        }
      });
      clearTimeout(timer);

      if (!res.ok) {
        if (attempt === MAX_RETRIES_PER_CANDIDATE) return null;
        continue;
      }

      const contentType = (res.headers.get('content-type') || '').toLowerCase();
      if (!contentType.startsWith('image/')) {
        if (attempt === MAX_RETRIES_PER_CANDIDATE) return null;
        continue;
      }

      const arr = await res.arrayBuffer();
      if (!arr || arr.byteLength === 0) {
        if (attempt === MAX_RETRIES_PER_CANDIDATE) return null;
        continue;
      }

      return {
        finalUrl: res.url || urlText,
        contentType,
        bytes: Buffer.from(arr)
      };
    } catch {
      if (attempt === MAX_RETRIES_PER_CANDIDATE) return null;
    }
  }

  return null;
}

function makeLocalRelPath(sourceUrl, ext) {
  const u = new URL(sourceUrl);
  const hostPart = u.host.toLowerCase().replace(/[^a-z0-9.-]+/g, '-');
  const hash = crypto.createHash('sha1').update(sourceUrl).digest('hex').slice(0, 16);
  return path.posix.join('assets', 'images', hostPart, `${hash}${ext}`);
}

function replaceImageSrc(text, replacements) {
  return text.replace(IMG_SRC_PATTERN, (full, quote, srcValue) => {
    const newValue = replacements.get(srcValue);
    if (!newValue) return full;
    return full.replace(`${quote}${srcValue}${quote}`, `${quote}${newValue}${quote}`);
  });
}

async function main() {
  ensureDir(ASSETS_DIR);

  const postFiles = listPostFiles();
  const fileContents = new Map(postFiles.map((file) => [file, fs.readFileSync(file, 'utf8')]));

  const allUrls = [];
  for (const text of fileContents.values()) {
    allUrls.push(...extractImageUrlsFromText(text));
  }

  const candidateUrls = unique(allUrls.filter(shouldLocalize));
  console.log(`Found image URLs: ${allUrls.length}, to localize: ${candidateUrls.length}`);

  const urlToLocal = new Map();
  const manifestCache = loadManifestCache();
  const manifest = {
    generatedAt: new Date().toISOString(),
    totals: {
      found: allUrls.length,
      target: candidateUrls.length,
      downloaded: 0,
      failed: 0,
      reused: 0
    },
    items: []
  };

  const downloadedByCanonical = new Map();

  const processOne = async (originalUrl) => {
    const cached = manifestCache.success.get(originalUrl);
    if (cached) {
      urlToLocal.set(originalUrl, cached);
      manifest.totals.reused += 1;
      manifest.items.push({ originalUrl, status: 'cached', localPath: cached });
      return;
    }
    if (manifestCache.failed.has(originalUrl)) {
      manifest.totals.failed += 1;
      manifest.items.push({ originalUrl, status: 'failed-cached' });
      return;
    }

    const norm = normalizedUrl(originalUrl);
    if (downloadedByCanonical.has(norm)) {
      const rel = downloadedByCanonical.get(norm);
      urlToLocal.set(originalUrl, `/${rel}`);
      manifest.totals.reused += 1;
      manifest.items.push({ originalUrl, status: 'reused', localPath: `/${rel}` });
      return;
    }

    let best = null;
    let bestCandidate = '';
    const candidates = buildCandidates(originalUrl);

    for (const c of candidates) {
      const fetched = await fetchImage(c);
      if (!fetched) continue;
      best = fetched;
      bestCandidate = c;
      break;
    }

    if (!best) {
      manifest.totals.failed += 1;
      manifest.items.push({ originalUrl, status: 'failed' });
      return;
    }

    const ext = extFromUrlOrType(best.finalUrl, best.contentType);
    const rel = makeLocalRelPath(best.finalUrl, ext);
    const abs = path.join(ROOT, 'src', rel);

    ensureDir(path.dirname(abs));
    if (!fs.existsSync(abs)) {
      fs.writeFileSync(abs, best.bytes);
    }

    const localUrl = `/${rel}`;
    urlToLocal.set(originalUrl, localUrl);
    downloadedByCanonical.set(norm, rel);

    manifest.totals.downloaded += 1;
    manifest.items.push({
      originalUrl,
      chosenCandidate: bestCandidate,
      finalUrl: best.finalUrl,
      bytes: best.bytes.length,
      contentType: best.contentType,
      localPath: localUrl,
      status: 'downloaded'
    });
  };

  const queue = [...candidateUrls];
  async function worker() {
    while (queue.length > 0) {
      const current = queue.shift();
      if (!current) return;
      await processOne(current);
    }
  }

  const workers = Array.from({ length: CONCURRENCY }, () => worker());
  await Promise.all(workers);

  let changedFiles = 0;
  for (const [file, text] of fileContents.entries()) {
    const replaced = replaceImageSrc(text, urlToLocal);
    if (replaced !== text) {
      fs.writeFileSync(file, replaced, 'utf8');
      changedFiles += 1;
    }
  }

  ensureDir(path.dirname(MANIFEST_PATH));
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2), 'utf8');

  console.log(`Localized images: downloaded=${manifest.totals.downloaded}, failed=${manifest.totals.failed}, reused=${manifest.totals.reused}`);
  console.log(`Updated markdown files: ${changedFiles}`);
  console.log(`Manifest: ${MANIFEST_PATH}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
