const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = process.cwd();
const POSTS_DIR = path.join(ROOT, 'src', 'posts');
const PENDING_PATH = path.join(ROOT, 'src', 'assets', 'image-pending.txt');
const OUTPUT_DIR = path.join(ROOT, 'src', 'assets', 'images', 'live.staticflickr.com');

const MAX_CONCURRENCY = 3;
const TIMEOUT_MS = 12000;
const USER_AGENT = 'Mozilla/5.0 (compatible; flickr-pending-recover/1.0)';

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function readPending() {
  if (!fs.existsSync(PENDING_PATH)) return [];
  return fs.readFileSync(PENDING_PATH, 'utf8')
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean);
}

function listPostFiles() {
  return fs.readdirSync(POSTS_DIR)
    .filter((name) => name.endsWith('.md'))
    .map((name) => path.join(POSTS_DIR, name));
}

function parsePhotoId(urlText) {
  try {
    const u = new URL(urlText);
    const m = u.pathname.match(/\/(\d+)_/);
    return m ? m[1] : '';
  } catch {
    return '';
  }
}

function parseOwnerAndIdPhotoPages(fileText, photoId) {
  if (!photoId) return [];
  const matches = [...fileText.matchAll(new RegExp(`https?://(?:www\\.)?flickr\\.com/photos/[^\\s"'<>]+/${photoId}(?:/[^\\s"'<>]*)?`, 'g'))];
  return [...new Set(matches.map((m) => m[0]))];
}

async function fetchText(urlText) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(urlText, {
      redirect: 'follow',
      signal: controller.signal,
      headers: { 'User-Agent': USER_AGENT }
    });
    if (!res.ok) return '';
    return await res.text();
  } catch {
    return '';
  } finally {
    clearTimeout(timer);
  }
}

async function fetchBytes(urlText) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(urlText, {
      redirect: 'follow',
      signal: controller.signal,
      headers: { 'User-Agent': USER_AGENT }
    });
    if (!res.ok) return null;
    const ct = (res.headers.get('content-type') || '').toLowerCase();
    if (!ct.startsWith('image/')) return null;
    const arr = await res.arrayBuffer();
    if (!arr || arr.byteLength === 0) return null;
    return {
      finalUrl: res.url || urlText,
      contentType: ct,
      bytes: Buffer.from(arr)
    };
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

function extractLiveVariants(html, photoId) {
  if (!html || !photoId) return [];
  const re = new RegExp(`https://live\\.staticflickr\\.com/\\d+/${photoId}_[a-z0-9]+(?:_[a-z0-9]+)?\\.(?:jpg|png|jpeg|webp)`, 'ig');
  const hits = [...html.matchAll(re)].map((m) => m[0]);
  return [...new Set(hits)];
}

function buildSizeCandidates(baseUrl) {
  let u;
  try {
    u = new URL(baseUrl);
  } catch {
    return [];
  }
  const m = u.pathname.match(/^(\/\d+\/\d+_[a-z0-9]+)(?:_([a-z0-9]+))?(\.[a-z0-9]+)$/i);
  if (!m) return [baseUrl];
  const prefix = m[1];
  const ext = m[3].toLowerCase();
  const suffixes = ['_o', '_k', '_h', '_b', '_c', '_z', ''];
  return suffixes.map((s) => `${u.origin}${prefix}${s}${ext}`);
}

function localPathForUrl(urlText, ext) {
  const hash = crypto.createHash('sha1').update(urlText).digest('hex').slice(0, 16);
  return path.posix.join('assets', 'images', 'live.staticflickr.com', `${hash}${ext}`);
}

function extFromTypeOrUrl(contentType, finalUrl) {
  if (contentType.includes('png')) return '.png';
  if (contentType.includes('jpeg') || contentType.includes('jpg')) return '.jpg';
  if (contentType.includes('webp')) return '.webp';
  if (contentType.includes('gif')) return '.gif';
  try {
    const ext = path.extname(new URL(finalUrl).pathname).toLowerCase();
    if (ext) return ext;
  } catch {
    // ignore
  }
  return '.img';
}

async function recoverOne(oldUrl, posts) {
  const photoId = parsePhotoId(oldUrl);
  if (!photoId) return { oldUrl, status: 'skip-no-photo-id' };

  const hitPosts = posts.filter((p) => p.text.includes(oldUrl));
  if (hitPosts.length === 0) return { oldUrl, status: 'skip-not-in-posts' };

  const pageCandidates = [];
  for (const p of hitPosts) {
    pageCandidates.push(...parseOwnerAndIdPhotoPages(p.text, photoId));
  }
  pageCandidates.push(`https://www.flickr.com/photos/irvin/${photoId}`);
  pageCandidates.push(`https://www.flickr.com/photos/60061298@N00/${photoId}`);
  pageCandidates.push(`https://www.flickr.com/photo.gne?id=${photoId}`);
  const uniqPages = [...new Set(pageCandidates)];

  let variants = [];
  for (const page of uniqPages) {
    const html = await fetchText(page);
    if (!html) continue;
    variants = extractLiveVariants(html, photoId);
    if (variants.length > 0) break;
  }
  if (variants.length === 0) return { oldUrl, status: 'fail-no-live-variants' };

  // prefer non-buddyicon variants; usually first is correct image.
  const imageVariants = variants.filter((v) => !v.includes('buddyicons')).slice(0, 3);
  let best = null;
  let chosen = '';
  for (const variant of imageVariants) {
    const candidates = buildSizeCandidates(variant);
    for (const c of candidates) {
      const fetched = await fetchBytes(c);
      if (!fetched) continue;
      best = fetched;
      chosen = c;
      break;
    }
    if (best) break;
  }
  if (!best) return { oldUrl, status: 'fail-download' };

  const ext = extFromTypeOrUrl(best.contentType, best.finalUrl);
  const rel = localPathForUrl(best.finalUrl, ext);
  const abs = path.join(ROOT, 'src', rel);
  ensureDir(path.dirname(abs));
  fs.writeFileSync(abs, best.bytes);

  const localUrl = `/${rel}`;
  let replacedCount = 0;
  for (const p of hitPosts) {
    const before = p.text;
    p.text = p.text.replaceAll(oldUrl, localUrl);
    if (p.text !== before) {
      p.changed = true;
      replacedCount += 1;
    }
  }

  return {
    oldUrl,
    status: 'recovered',
    chosen,
    finalUrl: best.finalUrl,
    localUrl,
    replacedPosts: replacedCount
  };
}

async function main() {
  ensureDir(OUTPUT_DIR);

  const pending = readPending().filter((u) => u.includes('flickr.com'));
  const postPaths = listPostFiles();
  const posts = postPaths.map((p) => ({
    path: p,
    text: fs.readFileSync(p, 'utf8'),
    changed: false
  }));

  console.log(`Flickr pending: ${pending.length}`);
  const queue = [...pending];
  const results = [];

  async function worker() {
    while (queue.length > 0) {
      const oldUrl = queue.shift();
      if (!oldUrl) return;
      const result = await recoverOne(oldUrl, posts);
      results.push(result);
      if (result.status === 'recovered') {
        console.log(`recovered: ${oldUrl} -> ${result.localUrl}`);
      }
    }
  }

  await Promise.all(Array.from({ length: MAX_CONCURRENCY }, () => worker()));

  let changedFiles = 0;
  for (const p of posts) {
    if (!p.changed) continue;
    fs.writeFileSync(p.path, p.text, 'utf8');
    changedFiles += 1;
  }

  const summary = {
    total: results.length,
    recovered: results.filter((r) => r.status === 'recovered').length,
    failed: results.filter((r) => r.status.startsWith('fail-')).length,
    skipped: results.filter((r) => r.status.startsWith('skip-')).length,
    changedFiles
  };
  const reportPath = path.join(ROOT, 'src', 'assets', 'flickr-recover-report.json');
  fs.writeFileSync(reportPath, JSON.stringify({ summary, results }, null, 2), 'utf8');

  console.log(`Summary: ${JSON.stringify(summary)}`);
  console.log(`Report: ${reportPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
