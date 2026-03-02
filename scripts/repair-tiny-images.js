const fs = require('fs');
const path = require('path');
const os = require('os');
const { execSync } = require('child_process');

const ROOT = process.cwd();
const MAP_PATH = path.join(ROOT, 'src', 'assets', 'image-src-map-complete.csv');
const POSTS_DIR = path.join(ROOT, 'src', 'posts');
const REPORT_PATH = path.join(ROOT, 'src', 'assets', 'repair-tiny-report.json');
const MIN_LONG_EDGE = 400;
const FETCH_TIMEOUT_MS = 12000;

function parseCsvLine(line) {
  const vals = [];
  let cur = '';
  let inQ = false;
  for (let i = 0; i < line.length; i += 1) {
    const ch = line[i];
    if (inQ) {
      if (ch === '"' && line[i + 1] === '"') {
        cur += '"';
        i += 1;
      } else if (ch === '"') {
        inQ = false;
      } else {
        cur += ch;
      }
    } else if (ch === '"') {
      inQ = true;
    } else if (ch === ',') {
      vals.push(cur);
      cur = '';
    } else {
      cur += ch;
    }
  }
  vals.push(cur);
  return vals;
}

function loadMapRows() {
  const lines = fs.readFileSync(MAP_PATH, 'utf8').split('\n').filter(Boolean);
  lines.shift(); // header
  return lines.map((line) => {
    const cols = parseCsvLine(line);
    return {
      file: cols[0] || '',
      index: Number(cols[1] || 0),
      status: cols[2] || '',
      original: cols[3] || '',
      current: cols[4] || ''
    };
  });
}

function listCurrentLocalImages() {
  const IMG = /<img\b[^>]*?\bsrc=(['"])(.*?)\1/gi;
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith('.md'));
  const refs = [];
  for (const f of files) {
    const txt = fs.readFileSync(path.join(POSTS_DIR, f), 'utf8');
    let m;
    IMG.lastIndex = 0;
    while ((m = IMG.exec(txt)) !== null) {
      const src = m[2];
      if (src.startsWith('/assets/images/')) refs.push(src);
    }
  }
  return [...new Set(refs)];
}

function dims(absPath) {
  try {
    const out = execSync(`sips -g pixelWidth -g pixelHeight "${absPath}"`, {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore']
    });
    const w = Number((out.match(/pixelWidth:\s*(\d+)/) || [])[1] || 0);
    const h = Number((out.match(/pixelHeight:\s*(\d+)/) || [])[1] || 0);
    return { w, h, long: Math.max(w, h) };
  } catch {
    return { w: 0, h: 0, long: 0 };
  }
}

function host(urlText) {
  try {
    return new URL(urlText).host.toLowerCase();
  } catch {
    return '';
  }
}

function ext(urlText) {
  try {
    return path.extname(new URL(urlText).pathname).toLowerCase();
  } catch {
    return '';
  }
}

function mediumCandidates(urlText) {
  let u;
  try { u = new URL(urlText); } catch { return [urlText]; }
  const p = u.pathname;
  const m = p.match(/\/(?:v2\/(?:resize:[^/]+\/)?|max\/\d+\/|fit\/c\/\d+\/\d+\/)?(([0-9a-z]+)\*[^/?#]+)$/i);
  const list = [];
  if (m && m[1]) {
    const asset = m[1];
    list.push(`https://miro.medium.com/v2/${asset}`);
    list.push(`https://miro.medium.com/v2/resize:fit:4096/${asset}`);
    list.push(`https://cdn-images-1.medium.com/v2/${asset}`);
  }
  list.push(urlText.replace(/^http:\/\//i, 'https://'));
  return [...new Set(list)];
}

function bloggerCandidates(urlText) {
  let u;
  try { u = new URL(urlText); } catch { return [urlText]; }
  const list = [`https://${u.host}${u.pathname}${u.search}`];
  if (/\/s\d+(?:-[a-z]+)?\//i.test(u.pathname)) {
    list.push(`https://${u.host}${u.pathname.replace(/\/s\d+(?:-[a-z]+)?\//i, '/s0/')}${u.search}`);
    list.push(`https://${u.host}${u.pathname.replace(/\/s\d+(?:-[a-z]+)?\//i, '/s2048/')}${u.search}`);
  }
  return [...new Set(list)];
}

function flickrCandidates(urlText) {
  let u;
  try { u = new URL(urlText); } catch { return [urlText]; }
  const m = u.pathname.match(/^(.*\/\d+_[a-z0-9]+)(?:_([a-z0-9]+))?(\.[a-z0-9]+)$/i);
  if (!m) return [urlText.replace(/^http:\/\//i, 'https://')];
  const prefix = m[1];
  const ex = m[3];
  const suffixes = ['_o', '_k', '_h', '_b', '_c', '_z', ''];
  return [...new Set(suffixes.map((s) => `https://${u.host}${prefix}${s}${ex}`))];
}

function buildCandidates(urlText) {
  const h = host(urlText);
  if (h.includes('medium.com')) return mediumCandidates(urlText);
  if (h.includes('flickr.com')) return flickrCandidates(urlText);
  if (h.includes('blogspot') || h.includes('googleusercontent.com')) return bloggerCandidates(urlText);
  return [urlText];
}

async function fetchToFile(urlText, outFile) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(urlText, {
      redirect: 'follow',
      signal: controller.signal,
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; repair-tiny-images/1.0)' }
    });
    if (!res.ok) return false;
    const ct = (res.headers.get('content-type') || '').toLowerCase();
    if (!ct.startsWith('image/')) return false;
    const buf = Buffer.from(await res.arrayBuffer());
    if (!buf.length) return false;
    fs.writeFileSync(outFile, buf);
    return true;
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
}

async function main() {
  const rows = loadMapRows().filter((r) => r.current.startsWith('/assets/images/') && r.original.startsWith('http'));
  const originalByCurrent = new Map();
  for (const r of rows) {
    if (!originalByCurrent.has(r.current)) originalByCurrent.set(r.current, r.original);
  }

  const currentImgs = listCurrentLocalImages();
  const tiny = currentImgs.filter((rel) => {
    const d = dims(path.join(ROOT, 'src', rel.replace(/^\//, '')));
    return d.long > 0 && d.long <= 300;
  });

  const results = [];
  for (const rel of tiny) {
    const original = originalByCurrent.get(rel);
    if (!original) {
      results.push({ rel, status: 'skip-no-original' });
      continue;
    }
    const abs = path.join(ROOT, 'src', rel.replace(/^\//, ''));
    const oldDims = dims(abs);
    const candidates = buildCandidates(original);
    let replaced = false;
    for (const c of candidates) {
      const tmp = path.join(os.tmpdir(), `repair-${Date.now()}-${Math.random().toString(16).slice(2)}${ext(c) || '.img'}`);
      const ok = await fetchToFile(c, tmp);
      if (!ok) continue;
      const nd = dims(tmp);
      if (nd.long < MIN_LONG_EDGE || nd.long <= oldDims.long) {
        fs.unlinkSync(tmp);
        continue;
      }
      fs.copyFileSync(tmp, abs);
      fs.unlinkSync(tmp);
      results.push({ rel, original, chosen: c, old: oldDims, next: nd, status: 'replaced' });
      replaced = true;
      break;
    }
    if (!replaced) {
      results.push({ rel, original, old: oldDims, status: 'unchanged' });
    }
  }

  const summary = {
    tinyFound: tiny.length,
    replaced: results.filter((r) => r.status === 'replaced').length,
    unchanged: results.filter((r) => r.status === 'unchanged').length,
    skipped: results.filter((r) => r.status.startsWith('skip-')).length
  };
  fs.writeFileSync(REPORT_PATH, JSON.stringify({ summary, results }, null, 2), 'utf8');
  console.log(JSON.stringify(summary));
  console.log(REPORT_PATH);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
