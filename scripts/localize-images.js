const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = process.cwd();
const POSTS_DIR = path.join(ROOT, 'src', 'posts');
const ASSETS_DIR = path.join(ROOT, 'src', 'assets', 'images');
const MANIFEST_PATH = path.join(ROOT, 'src', 'assets', 'image-manifest.json');
const PENDING_PATH = path.join(ROOT, 'src', 'assets', 'image-pending.txt');

const FORCE_MEDIUM = process.argv.includes('--force-medium');
const LIST_PENDING = process.argv.includes('--list-pending');
const RETRY_PENDING = process.argv.includes('--retry-pending');
const IMG_SRC_PATTERN = /<img\b[^>]*?\bsrc=(['"])(.*?)\1/gi;
const MAX_RETRIES_PER_CANDIDATE = FORCE_MEDIUM ? 1 : 3;
const FETCH_TIMEOUT_MS = FORCE_MEDIUM ? 5000 : 12000;
const CONCURRENCY = FORCE_MEDIUM ? 3 : 8;

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
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

function getHost(urlText) {
  try {
    return new URL(urlText).host.toLowerCase();
  } catch {
    return '';
  }
}

function isMediumImageUrl(urlText) {
  return getHost(urlText).includes('medium.com');
}

function isBloggerImageUrl(urlText) {
  const host = getHost(urlText);
  if (!host) return false;
  if (host.includes('blogger.googleusercontent.com')) return true;
  if (host.includes('googleusercontent.com') && host.includes('ggpht')) return true;
  if (host.endsWith('.blogspot.com') || host.includes('.bp.blogspot.com')) return true;
  return false;
}

function shouldLocalize(urlText) {
  if (!isHttpUrl(urlText)) return false;
  const host = getHost(urlText);
  if (!host) return false;
  if (host.includes('medium.com')) return true;
  if (host.includes('staticflickr.com')) return true;
  if (host === 'static.flickr.com') return true;
  if (/^farm\d+\.static\.flickr\.com$/.test(host)) return true;
  if (isBloggerImageUrl(urlText)) return true;
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

function extractMediumAsset(pathname) {
  const match = pathname.match(/\/(?:v2\/(?:resize:[^/]+\/)?|max\/\d+\/|fit\/c\/\d+\/\d+\/)?(([0-9a-z]+)\*[^/?#]+)$/i);
  return match ? match[1] : '';
}

function mediumCandidates(urlText) {
  let u;
  try {
    u = new URL(urlText);
  } catch {
    return [urlText];
  }

  const list = [];
  const asset = extractMediumAsset(u.pathname);
  if (asset) {
    list.push(`https://miro.medium.com/v2/${asset}`);
    list.push(`https://miro.medium.com/v2/resize:fit:4096/${asset}`);
    list.push(`https://cdn-images-1.medium.com/v2/${asset}`);
    list.push(`https://cdn-images-1.medium.com/v2/resize:fit:4096/${asset}`);
    if (!FORCE_MEDIUM) {
      list.push(`https://cdn-images-1.medium.com/max/4096/${asset}`);
      list.push(`https://${u.host}/v2/${asset}`);
    }
  }

  if (/\/max\/\d+\//i.test(u.pathname)) {
    list.push(`https://${u.host}${u.pathname.replace(/\/max\/\d+\//i, '/max/4096/')}${u.search}`);
  }
  if (/\/fit\/c\/\d+\/\d+\//i.test(u.pathname)) {
    list.push(`https://${u.host}${u.pathname.replace(/\/fit\/c\/\d+\/\d+\//i, '/max/4096/')}${u.search}`);
  }

  if (!FORCE_MEDIUM) {
    list.push(`https://${u.host}${u.pathname}${u.search}`);
    list.push(urlText.replace(/^http:\/\//i, 'https://'));
  }
  return unique(list);
}

function flickrCandidates(urlText) {
  let u;
  try {
    u = new URL(urlText);
  } catch {
    return [urlText];
  }

  const pathname = u.pathname;
  const match = pathname.match(/^(.*\/\d+_[a-z0-9]+)(?:_([a-z0-9]+))?(\.[a-z0-9]+)$/i);
  if (!match) {
    return unique([
      `https://${u.host}${pathname}${u.search}`,
      urlText.replace(/^http:\/\//i, 'https://')
    ]);
  }

  const prefix = match[1];
  const ext = match[3];
  const suffixes = ['_o', '_k', '_h', '_b', ''];
  const list = suffixes.map((suffix) => `https://${u.host}${prefix}${suffix}${ext}${u.search}`);
  list.push(urlText.replace(/^http:\/\//i, 'https://'));
  return unique(list);
}

function buildCandidates(urlText) {
  const host = getHost(urlText);
  if (host.includes('medium.com')) return mediumCandidates(urlText);
  if (host.includes('staticflickr.com') || host === 'static.flickr.com' || /^farm\d+\.static\.flickr\.com$/.test(host)) {
    return flickrCandidates(urlText);
  }
  if (isBloggerImageUrl(urlText)) return bloggerCandidates(urlText);
  return [urlText];
}

function bloggerCandidates(urlText) {
  let u;
  try {
    u = new URL(urlText);
  } catch {
    return [urlText];
  }

  const list = [];
  const p = u.pathname;
  list.push(`https://${u.host}${p}${u.search}`);

  if (/\/s\d+(?:-[a-z]+)?\//i.test(p)) {
    list.push(`https://${u.host}${p.replace(/\/s\d+(?:-[a-z]+)?\//i, '/s0/')}${u.search}`);
    list.push(`https://${u.host}${p.replace(/\/s\d+(?:-[a-z]+)?\//i, '/s2048/')}${u.search}`);
  }

  if (/=s\d+(?:-[a-z]+)?$/i.test(u.pathname)) {
    list.push(`https://${u.host}${u.pathname.replace(/=s\d+(?:-[a-z]+)?$/i, '=s0')}${u.search}`);
  }

  if (/=w\d+-h\d+(?:-[a-z]+)?$/i.test(u.pathname)) {
    list.push(`https://${u.host}${u.pathname.replace(/=w\d+-h\d+(?:-[a-z]+)?$/i, '=s0')}${u.search}`);
  }

  list.push(urlText.replace(/^http:\/\//i, 'https://'));
  return unique(list);
}

function extFromUrlOrType(urlText, contentType) {
  try {
    const ext = path.extname(new URL(urlText).pathname).toLowerCase();
    if (ext && ext.length <= 5) return ext;
  } catch {
    // ignore
  }
  if (contentType.includes('jpeg')) return '.jpg';
  if (contentType.includes('png')) return '.png';
  if (contentType.includes('webp')) return '.webp';
  if (contentType.includes('gif')) return '.gif';
  if (contentType.includes('svg')) return '.svg';
  return '.img';
}

async function fetchImage(urlText) {
  for (let attempt = 1; attempt <= MAX_RETRIES_PER_CANDIDATE; attempt += 1) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
    try {
      const res = await fetch(urlText, {
        redirect: 'follow',
        signal: controller.signal,
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; blog-image-localizer/1.1)'
        }
      });
      clearTimeout(timer);

      if (res.status === 429 && attempt < MAX_RETRIES_PER_CANDIDATE) {
        await sleep(500 * attempt);
        continue;
      }
      if (!res.ok) continue;

      const contentType = (res.headers.get('content-type') || '').toLowerCase();
      if (!contentType.startsWith('image/')) continue;
      const arr = await res.arrayBuffer();
      if (!arr || arr.byteLength === 0) continue;

      return {
        finalUrl: res.url || urlText,
        contentType,
        bytes: Buffer.from(arr)
      };
    } catch {
      // retry
    } finally {
      clearTimeout(timer);
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

function loadManifestItems() {
  if (!fs.existsSync(MANIFEST_PATH)) return [];
  try {
    const parsed = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
    return Array.isArray(parsed.items) ? parsed.items : [];
  } catch {
    return [];
  }
}

function loadManifestCache() {
  const items = loadManifestItems();
  const success = new Map();
  const failed = new Set();
  for (const item of items) {
    if (!item || !item.originalUrl) continue;
    if (item.localPath) {
      const abs = path.join(ROOT, 'src', item.localPath.replace(/^\//, ''));
      if (fs.existsSync(abs)) success.set(item.originalUrl, item.localPath);
    } else if (item.status === 'failed' || item.status === 'failed-cached') {
      failed.add(item.originalUrl);
    }
  }
  return { success, failed, items };
}

function readPendingList() {
  if (!fs.existsSync(PENDING_PATH)) return [];
  return fs.readFileSync(PENDING_PATH, 'utf8')
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean);
}

function writePendingList(urls) {
  ensureDir(path.dirname(PENDING_PATH));
  const lines = unique(urls).sort((a, b) => a.localeCompare(b));
  fs.writeFileSync(PENDING_PATH, `${lines.join('\n')}\n`, 'utf8');
  return lines;
}

async function main() {
  ensureDir(ASSETS_DIR);

  const postFiles = listPostFiles();
  const fileContents = new Map(postFiles.map((file) => [file, fs.readFileSync(file, 'utf8')]));

  const allUrls = [];
  for (const text of fileContents.values()) allUrls.push(...extractImageUrlsFromText(text));

  const manifestCache = loadManifestCache();
  const mediumFromManifest = FORCE_MEDIUM
    ? manifestCache.items
      .map((i) => (i && i.originalUrl ? i.originalUrl : ''))
      .filter((u) => isMediumImageUrl(u))
    : [];

  const allCandidateUrls = unique([
    ...allUrls.filter(shouldLocalize),
    ...mediumFromManifest
  ]);
  const pendingFromCache = [...manifestCache.failed].filter((u) => allCandidateUrls.includes(u));
  const pendingFromCurrent = allCandidateUrls.filter((u) => !manifestCache.success.has(u));
  const pendingList = writePendingList([...pendingFromCache, ...pendingFromCurrent]);

  if (LIST_PENDING) {
    console.log(`Pending list written: ${PENDING_PATH}`);
    console.log(`Pending count: ${pendingList.length}`);
    return;
  }

  const candidateUrls = RETRY_PENDING ? readPendingList() : allCandidateUrls;

  console.log(`Found image URLs: ${allUrls.length}, target: ${candidateUrls.length}, forceMedium=${FORCE_MEDIUM}`);

  const urlToLocal = new Map();
  const downloadedByCanonical = new Map();
  const manifest = {
    generatedAt: new Date().toISOString(),
    mode: FORCE_MEDIUM ? 'force-medium' : 'normal',
    totals: {
      found: allUrls.length,
      target: candidateUrls.length,
      downloaded: 0,
      failed: 0,
      reused: 0
    },
    items: []
  };

  const processOne = async (originalUrl) => {
    const cached = manifestCache.success.get(originalUrl);
    const forceCurrentMedium = FORCE_MEDIUM && isMediumImageUrl(originalUrl);

    if (cached && !forceCurrentMedium) {
      urlToLocal.set(originalUrl, cached);
      manifest.totals.reused += 1;
      manifest.items.push({ originalUrl, status: 'cached', localPath: cached });
      return;
    }
    if (!forceCurrentMedium && manifestCache.failed.has(originalUrl)) {
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

    const candidates = buildCandidates(originalUrl);
    let best = null;
    let bestCandidate = '';
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
    let rel;
    if (cached && forceCurrentMedium) {
      rel = cached.replace(/^\//, '');
    } else {
      rel = makeLocalRelPath(best.finalUrl, ext);
    }

    const abs = path.join(ROOT, 'src', rel);
    ensureDir(path.dirname(abs));
    fs.writeFileSync(abs, best.bytes);

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
      status: forceCurrentMedium ? 're-downloaded' : 'downloaded'
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
  await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()));

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
  const failedAfterRun = manifest.items
    .filter((i) => i.status === 'failed' || i.status === 'failed-cached')
    .map((i) => i.originalUrl)
    .filter(Boolean);
  const nextPending = writePendingList(failedAfterRun);

  console.log(`Localized images: downloaded=${manifest.totals.downloaded}, failed=${manifest.totals.failed}, reused=${manifest.totals.reused}`);
  console.log(`Updated markdown files: ${changedFiles}`);
  console.log(`Manifest: ${MANIFEST_PATH}`);
  console.log(`Pending list: ${PENDING_PATH} (${nextPending.length})`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
