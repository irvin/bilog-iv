#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');

const ROOT = process.cwd();
const POSTS_DIR = path.join(ROOT, 'src', 'posts');
const MAP_PATH = path.join(ROOT, 'src', 'assets', 'image-src-map-complete.csv');

const IMG_SRC_RE = /<img\b[^>]*?\bsrc=(['"])(.*?)\1/gi;

function csvEscape(v) {
  return `"${String(v ?? '').replace(/"/g, '""')}"`;
}

function parseSimpleCsvLine(line) {
  const out = [];
  let i = 0;
  while (i < line.length) {
    if (line[i] !== '"') return null;
    i += 1;
    let cur = '';
    while (i < line.length) {
      if (line[i] === '"') {
        if (line[i + 1] === '"') {
          cur += '"';
          i += 2;
          continue;
        }
        i += 1;
        break;
      }
      cur += line[i];
      i += 1;
    }
    out.push(cur);
    if (i >= line.length) break;
    if (line[i] !== ',') return null;
    i += 1;
  }
  return out;
}

function collectCurrentSrcByFile() {
  const map = new Map();
  for (const name of fs.readdirSync(POSTS_DIR)) {
    if (!name.endsWith('.md')) continue;
    const abs = path.join(POSTS_DIR, name);
    const text = fs.readFileSync(abs, 'utf8');
    const list = [];
    let m;
    while ((m = IMG_SRC_RE.exec(text)) !== null) {
      list.push(m[2]);
    }
    map.set(name, list);
  }
  return map;
}

function main() {
  if (!fs.existsSync(MAP_PATH)) {
    console.error(`Map file not found: ${MAP_PATH}`);
    process.exit(1);
  }
  const currentByFile = collectCurrentSrcByFile();
  const lines = fs.readFileSync(MAP_PATH, 'utf8').split(/\r?\n/).filter(Boolean);
  if (lines.length === 0) {
    console.error('Map file is empty');
    process.exit(1);
  }

  const header = lines[0];
  const expectedHeader = '"file","index","status","original_src","current_src"';
  if (header !== expectedHeader) {
    console.error(`Unexpected header: ${header}`);
    process.exit(1);
  }

  const outLines = [expectedHeader];
  let unchangedRows = 0;
  let rewrittenRows = 0;
  let missingRows = 0;

  for (let i = 1; i < lines.length; i += 1) {
    const cols = parseSimpleCsvLine(lines[i]);
    if (!cols || cols.length < 5) {
      console.error(`Invalid CSV row at line ${i + 1}`);
      process.exit(1);
    }

    const [file, indexText, _status, originalSrc] = cols;
    const index = Number(indexText);
    const currentList = currentByFile.get(file) || [];
    const currentSrc = Number.isFinite(index) && index > 0 ? (currentList[index - 1] || '') : '';

    if (!currentSrc) {
      missingRows += 1;
    }

    const status = currentSrc && currentSrc === originalSrc ? 'same' : 'rewritten';
    if (status === 'same') unchangedRows += 1;
    else rewrittenRows += 1;

    outLines.push(
      [file, String(index), status, originalSrc, currentSrc].map(csvEscape).join(',')
    );
  }

  fs.writeFileSync(MAP_PATH, `${outLines.join('\n')}\n`, 'utf8');
  console.log(`Updated: ${MAP_PATH}`);
  console.log(`Rows: ${outLines.length - 1}, same=${unchangedRows}, rewritten=${rewrittenRows}, missing_current=${missingRows}`);
}

main();
