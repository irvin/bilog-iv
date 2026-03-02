const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const BLOGGER_FEED = path.join(ROOT, 'backups', 'blogger-takeout', 'Blogger', 'Blogs', 'Bilog II', 'feed.atom');
const MEDIUM_POSTS_DIR = path.join(ROOT, 'backups', 'medium-export', 'posts');
const OUTPUT_DIR = path.join(ROOT, 'src', 'posts');
const REPORT_PATH = path.join(ROOT, 'src', 'import-report.json');
const SKIP_MEDIUM_POST_IDS = new Set([
  '66311dff92c7',
  '6ba331c77303',
  '1b50cccff72a',
  '8822823054d6',
  'ddb3759747e9',
  '7a4235a67b59',
  '557daa258383',
  '158864b58ba3',
  'c527ef6b505e',
  '22ed51ad6d60',
  'b93b50122383',
  'a259b74c3970',
  'e8560b142a9d'
]);

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function clearDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    return;
  }
  for (const name of fs.readdirSync(dirPath)) {
    const full = path.join(dirPath, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      fs.rmSync(full, { recursive: true, force: true });
    } else {
      fs.unlinkSync(full);
    }
  }
}

function decodeXmlEntities(input) {
  if (!input) return '';
  return input
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, num) => String.fromCodePoint(parseInt(num, 10)))
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, '&');
}

function stripHtml(input) {
  return (input || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function isLikelyMediumResponsePost(contentHtml) {
  const body = contentHtml || '';
  const text = stripHtml(body);
  const pCount = (body.match(/<p\b/gi) || []).length;
  const headingCount = (body.match(/<h[1-6]\b/gi) || []).length;
  const figureCount = (body.match(/<figure\b/gi) || []).length;
  const mixtapeCount = (body.match(/mixtapeEmbed/gi) || []).length;

  return (
    text.length <= 120 &&
    pCount <= 2 &&
    headingCount === 0 &&
    figureCount === 0 &&
    mixtapeCount === 0
  );
}

function safeYamlString(input) {
  const text = String(input || '')
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\n/g, ' ')
    .trim();
  return `"${text}"`;
}

function slugifyForFilename(input) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80) || 'post';
}

function getTag(entry, tagName) {
  const re = new RegExp(`<${tagName}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tagName}>`);
  const m = entry.match(re);
  return m ? m[1].trim() : '';
}

function getAllCategoryTerms(entry) {
  const matches = [...entry.matchAll(/<category[^>]*term='([^']+)'[^>]*\/>/g)];
  return matches.map((m) => m[1]).filter(Boolean);
}

function extractBloggerPosts() {
  const xml = fs.readFileSync(BLOGGER_FEED, 'utf8');
  const entries = [...xml.matchAll(/<entry>[\s\S]*?<\/entry>/g)].map((m) => m[0]);
  const posts = [];

  for (const entry of entries) {
    const type = getTag(entry, 'blogger:type');
    const status = getTag(entry, 'blogger:status');
    if (type !== 'POST' || status !== 'LIVE') continue;

    const filename = getTag(entry, 'blogger:filename');
    if (!filename) continue;

    const title = decodeXmlEntities(getTag(entry, 'title')) || 'Untitled';
    const published = getTag(entry, 'published') || getTag(entry, 'updated');
    const updated = getTag(entry, 'updated');
    const rawContent = getTag(entry, 'content');
    const contentHtml = decodeXmlEntities(rawContent).trim();
    const categories = getAllCategoryTerms(entry).map(decodeXmlEntities);

    posts.push({
      source: 'blogger',
      title,
      published,
      updated,
      permalink: filename,
      originalUrl: `http://irvin.sto.tw${filename}`,
      tags: [...new Set(categories)],
      contentHtml,
      excerpt: stripHtml(contentHtml).slice(0, 180)
    });
  }

  return posts;
}

function extractBetween(input, startPattern, endPattern) {
  const startMatch = input.match(startPattern);
  if (!startMatch) return '';
  const startIdx = startMatch.index + startMatch[0].length;
  const rest = input.slice(startIdx);
  const endMatch = rest.match(endPattern);
  if (!endMatch) return '';
  return rest.slice(0, endMatch.index);
}

function deriveMediumSlug(canonicalUrl, filename) {
  if (canonicalUrl) {
    try {
      const u = new URL(canonicalUrl);
      const parts = u.pathname.split('/').filter(Boolean);
      if (parts.length > 0) {
        if (parts[0].startsWith('@') && parts[1]) {
          return parts[1];
        }
        return parts[parts.length - 1];
      }
    } catch {
      // ignore malformed URL and fallback to filename
    }
  }

  const withoutExt = filename.replace(/\.html$/i, '');
  const idMatch = withoutExt.match(/-([0-9a-f]{12})$/i);
  if (idMatch) {
    return `post-${idMatch[1].toLowerCase()}`;
  }
  return slugifyForFilename(withoutExt);
}

function decodeURIComponentSafe(input) {
  try {
    return decodeURIComponent(input);
  } catch {
    return input;
  }
}

function normalizeHumanSlug(input) {
  return String(input || '')
    .replace(/[，。、！？：；（）「」『』【】《》〈〉'"`]/g, '-')
    .replace(/[\s/\\?#&=]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function normalizeMediumSlug(slug, canonicalUrl, filename, title) {
  const raw = String(slug || '').trim();
  const decoded = decodeURIComponentSafe(raw);
  const invalidPercent = /%(?![0-9A-Fa-f]{2})/.test(raw);

  let normalized = normalizeHumanSlug(invalidPercent ? title : decoded);
  if (!normalized) {
    normalized = slugifyForFilename(title || 'post');
  }

  const encodedLength = encodeURIComponent(normalized).length;
  if (encodedLength <= 180) return normalized;

  const fromCanonical = (canonicalUrl.match(/-([0-9a-f]{12})$/i) || [])[1];
  const fromFilename = (filename.match(/-([0-9a-f]{12})\\.html$/i) || [])[1];
  const id = (fromCanonical || fromFilename || '').toLowerCase();
  const base = normalized.slice(0, 80).replace(/-+$/g, '');
  return id ? `${base}-${id}` : base;
}

function extractMediumPosts() {
  const files = fs.readdirSync(MEDIUM_POSTS_DIR).filter((name) => name.endsWith('.html'));
  const posts = [];
  const skippedResponses = [];
  const skippedById = [];

  for (const file of files) {
    const fullPath = path.join(MEDIUM_POSTS_DIR, file);
    const html = fs.readFileSync(fullPath, 'utf8');

    const title = decodeXmlEntities((html.match(/<title>([\s\S]*?)<\/title>/i) || [])[1] || 'Untitled');
    const published = (html.match(/<time class="dt-published" datetime="([^"]+)"/i) || [])[1] || '';
    const canonicalUrl = (html.match(/<a href="([^"]+)" class="p-canonical"/i) || [])[1] || '';
    const canonicalPath = (() => {
      try {
        return canonicalUrl ? new URL(canonicalUrl).pathname : '';
      } catch {
        return '';
      }
    })();
    const postId = extractMediumPostIdFromPath(canonicalPath) || extractMediumPostIdFromPath(file);
    if (postId && SKIP_MEDIUM_POST_IDS.has(postId)) {
      skippedById.push({ file, title, postId });
      continue;
    }

    const rawSlug = deriveMediumSlug(canonicalUrl, file);
    const slug = normalizeMediumSlug(rawSlug, canonicalUrl, file, title);
    const bodyHtml = extractBetween(
      html,
      /<section data-field="body" class="e-content">/i,
      /<\/section>\s*<footer>/i
    ).trim();

    const permalink = `/${slug}.html`;
    const originalUrl = `https://irvinfly.medium.com/${slug}`;

    if (isLikelyMediumResponsePost(bodyHtml)) {
      skippedResponses.push({
        file,
        title,
        permalink
      });
      continue;
    }

    posts.push({
      source: 'medium',
      title,
      published,
      updated: published,
      permalink,
      originalUrl,
      canonicalUrl,
      tags: [],
      contentHtml: bodyHtml,
      excerpt: stripHtml(bodyHtml).slice(0, 180)
    });
  }

  return { posts, skippedResponses, skippedById };
}

function serializePostToMarkdown(post) {
  const tags = [...post.tags, post.source];
  const tagsYaml = tags.map((t) => safeYamlString(t)).join(', ');

  return [
    '---',
    'layout: "post.njk"',
    `title: ${safeYamlString(post.title)}`,
    `date: ${safeYamlString(post.published || post.updated || new Date().toISOString())}`,
    `source: ${safeYamlString(post.source)}`,
    `original_url: ${safeYamlString(post.originalUrl || '')}`,
    `canonical_url: ${safeYamlString(post.canonicalUrl || '')}`,
    `permalink: ${safeYamlString(post.permalink)}`,
    `tags: [${tagsYaml}]`,
    `excerpt: ${safeYamlString(post.excerpt || '')}`,
    '---',
    '',
    post.contentHtml,
    ''
  ].join('\n');
}

function writePosts(posts) {
  const usedNames = new Set();

  for (const post of posts) {
    const base = `${post.source}-${slugifyForFilename(post.title)}-${slugifyForFilename(post.permalink)}`;
    let name = `${base}.md`;
    let idx = 1;
    while (usedNames.has(name)) {
      idx += 1;
      name = `${base}-${idx}.md`;
    }
    usedNames.add(name);

    const outputPath = path.join(OUTPUT_DIR, name);
    fs.writeFileSync(outputPath, serializePostToMarkdown(post), 'utf8');
  }
}

function normalizePathname(pathname) {
  if (!pathname) return '/';
  if (pathname.length > 1 && pathname.endsWith('/')) {
    return pathname.slice(0, -1);
  }
  return pathname;
}

function extractMediumPostIdFromPath(pathname) {
  if (!pathname) return '';
  const p = pathname.replace(/\/+$/, '');
  const pMatch = p.match(/\/p\/([0-9a-f]{12})$/i);
  if (pMatch) return pMatch[1].toLowerCase();
  const tail = p.split('/').filter(Boolean).pop() || '';
  const withNoExt = tail.replace(/\.html$/i, '');
  const idMatch = withNoExt.match(/-([0-9a-f]{12})$/i);
  return idMatch ? idMatch[1].toLowerCase() : '';
}

function buildInternalLinkMap(posts) {
  const map = new Map();
  const mediumIdMap = new Map();

  function addAbsoluteUrlToMap(urlText, targetPermalink) {
    if (!urlText || !targetPermalink) return;
    let parsed;
    try {
      parsed = new URL(urlText);
    } catch {
      return;
    }

    const key = `${parsed.host.toLowerCase()}${normalizePathname(parsed.pathname)}`;
    map.set(key, targetPermalink);
  }

  for (const post of posts) {
    const target = post.permalink;
    addAbsoluteUrlToMap(post.originalUrl, target);
    addAbsoluteUrlToMap(post.canonicalUrl, target);

    if (post.source === 'blogger' && target.startsWith('/')) {
      const hosts = ['irvin.sto.tw', 'www.irvin.sto.tw', 'localhost:8080'];
      for (const host of hosts) {
        map.set(`${host}${normalizePathname(target)}`, target);
      }
    }

    if (post.source === 'medium') {
      const ids = [
        extractMediumPostIdFromPath(target),
        extractMediumPostIdFromPath((() => {
          try {
            return post.originalUrl ? new URL(post.originalUrl).pathname : '';
          } catch {
            return '';
          }
        })()),
        extractMediumPostIdFromPath((() => {
          try {
            return post.canonicalUrl ? new URL(post.canonicalUrl).pathname : '';
          } catch {
            return '';
          }
        })())
      ].filter(Boolean);

      for (const id of ids) {
        mediumIdMap.set(id, target);
      }
    }
  }

  return { map, mediumIdMap };
}

function rewriteInternalUrl(urlText, linkLookup) {
  const { map, mediumIdMap } = linkLookup;
  if (!urlText) return urlText;
  if (
    urlText.startsWith('#') ||
    urlText.startsWith('mailto:') ||
    urlText.startsWith('tel:') ||
    urlText.startsWith('javascript:')
  ) {
    return urlText;
  }
  if (!urlText.startsWith('http://') && !urlText.startsWith('https://') && !urlText.startsWith('//')) {
    return urlText;
  }

  let parsed;
  try {
    parsed = urlText.startsWith('//') ? new URL(`http:${urlText}`) : new URL(urlText);
  } catch {
    return urlText;
  }

  const key = `${parsed.host.toLowerCase()}${normalizePathname(parsed.pathname)}`;
  const target = map.get(key);
  if (target) return `${target}${parsed.search}${parsed.hash}`;

  const mediumHosts = new Set(['medium.com', 'www.medium.com', 'irvinfly.medium.com']);
  if (mediumHosts.has(parsed.host.toLowerCase())) {
    const id = extractMediumPostIdFromPath(parsed.pathname);
    const byIdTarget = id ? mediumIdMap.get(id) : '';
    if (byIdTarget) {
      return `${byIdTarget}${parsed.search}${parsed.hash}`;
    }
  }

  if (!target) return urlText;
  return `${target}${parsed.search}${parsed.hash}`;
}

function rewritePostInternalLinks(posts) {
  const linkLookup = buildInternalLinkMap(posts);
  const attrPattern = /(href|data-href)\s*=\s*("([^"]*)"|'([^']*)')/gi;

  return posts.map((post) => {
    const rewritten = post.contentHtml.replace(attrPattern, (full, attr, quoted, doubleValue, singleValue) => {
      const rawUrl = doubleValue !== undefined ? doubleValue : singleValue;
      const nextUrl = rewriteInternalUrl(rawUrl, linkLookup);
      const quote = quoted[0] === "'" ? "'" : '"';
      return `${attr}=${quote}${nextUrl}${quote}`;
    });

    return {
      ...post,
      contentHtml: rewritten
    };
  });
}

function main() {
  ensureDir(OUTPUT_DIR);
  clearDir(OUTPUT_DIR);

  const bloggerPosts = extractBloggerPosts();
  const mediumResult = extractMediumPosts();
  const mediumPosts = mediumResult.posts;
  const allPosts = [...bloggerPosts, ...mediumPosts];
  const rewrittenPosts = rewritePostInternalLinks(allPosts);

  writePosts(rewrittenPosts);

  const report = {
    generatedAt: new Date().toISOString(),
    counts: {
      blogger: bloggerPosts.length,
      medium: mediumPosts.length,
      mediumSkippedResponses: mediumResult.skippedResponses.length,
      mediumSkippedById: mediumResult.skippedById.length,
      total: rewrittenPosts.length
    },
    samples: {
      bloggerPermalinks: bloggerPosts.slice(0, 5).map((p) => p.permalink),
      mediumPermalinks: mediumPosts.slice(0, 5).map((p) => p.permalink)
    }
  };

  fs.writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2), 'utf8');

  console.log(
    `Imported posts: ${allPosts.length} (blogger=${bloggerPosts.length}, medium=${mediumPosts.length}, medium_skipped_responses=${mediumResult.skippedResponses.length}, medium_skipped_by_id=${mediumResult.skippedById.length})`
  );
}

main();
