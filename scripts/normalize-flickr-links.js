#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");

const POSTS_DIR = path.join(process.cwd(), "src", "posts");
const FLICKR_BASE58 = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";

function encodeFlickrShortId(photoId) {
  let n = BigInt(photoId);
  if (n <= 0n) {
    return null;
  }

  let out = "";
  while (n > 0n) {
    const idx = Number(n % 58n);
    out = FLICKR_BASE58[idx] + out;
    n /= 58n;
  }
  return out;
}

function isDirectFlickrImageUrl(url) {
  return /^https?:\/\/(?:farm\d+\.static\.flickr\.com|static\.flickr\.com|live\.staticflickr\.com)\//i.test(
    url
  );
}

function toFlickrPageUrl(imageUrl) {
  const m = imageUrl.match(/\/(\d+)(?:_[^/?#]+)?(?:\.[a-z0-9]+)?(?:[?#].*)?$/i);
  if (!m) {
    return null;
  }
  const shortId = encodeFlickrShortId(m[1]);
  if (!shortId) {
    return null;
  }
  return `https://flic.kr/p/${shortId}`;
}

function normalizeFile(filePath) {
  const original = fs.readFileSync(filePath, "utf8");
  let changed = 0;

  const updated = original.replace(
    /<a\b([^>]*?)\bhref\s*=\s*("([^"]+)"|'([^']+)')([^>]*)>([\s\S]*?)<\/a>/gi,
    (full, before, quoted, q1, q2, after, inner) => {
      const href = q1 || q2 || "";
      if (!isDirectFlickrImageUrl(href)) {
        return full;
      }
      if (!/<img\b/i.test(inner)) {
        return full;
      }

      const pageUrl = toFlickrPageUrl(href);
      if (!pageUrl) {
        return full;
      }

      changed += 1;
      const quote = quoted[0];
      return `<a${before}href=${quote}${pageUrl}${quote}${after}>${inner}</a>`;
    }
  );

  if (changed > 0) {
    fs.writeFileSync(filePath, updated, "utf8");
  }

  return changed;
}

function main() {
  if (!fs.existsSync(POSTS_DIR)) {
    console.error(`Posts directory not found: ${POSTS_DIR}`);
    process.exit(1);
  }

  const files = fs
    .readdirSync(POSTS_DIR)
    .filter((name) => name.endsWith(".md"))
    .map((name) => path.join(POSTS_DIR, name));

  let changedFiles = 0;
  let changedLinks = 0;

  for (const filePath of files) {
    const changed = normalizeFile(filePath);
    if (changed > 0) {
      changedFiles += 1;
      changedLinks += changed;
      console.log(`${path.relative(process.cwd(), filePath)}: ${changed}`);
    }
  }

  console.log(`Done. changed_files=${changedFiles}, changed_links=${changedLinks}`);
}

main();
