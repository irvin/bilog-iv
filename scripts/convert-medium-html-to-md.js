const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const ROOT = path.resolve(__dirname, '..');
const POSTS_DIR = path.join(ROOT, 'src', 'posts');

function splitFrontMatter(raw) {
  const match = raw.match(/^---\n[\s\S]*?\n---\n*/);
  if (!match) return { frontMatter: '', body: raw };
  return {
    frontMatter: match[0],
    body: raw.slice(match[0].length)
  };
}

function escapeInlineText(text) {
  return String(text || '')
    .replace(/\r/g, '')
    .replace(/\n+/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`');
}

function cleanInlineOutput(text) {
  return text
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[ \t]{2,}/g, ' ')
    .trim();
}

function nodeToInline($, node) {
  if (!node) return '';
  if (node.type === 'text') return escapeInlineText(node.data);
  if (node.type !== 'tag') return '';

  const $node = $(node);
  const tag = (node.tagName || '').toLowerCase();
  const inner = childrenToInline($, $node.contents().toArray());

  if (tag === 'br') return '  \n';
  if (tag === 'strong' || tag === 'b') return inner ? `**${inner}**` : '';
  if (tag === 'em' || tag === 'i') return inner ? `*${inner}*` : '';
  if (tag === 'code') return `\`${inner || escapeInlineText($node.text())}\``;
  if (tag === 'a') {
    const href = $node.attr('href') || $node.attr('data-href') || '';
    const text = inner || escapeInlineText(href);
    if (!href) return text;
    return `[${text}](${href})`;
  }
  if (tag === 'img') {
    const src = $node.attr('src') || '';
    if (!src) return '';
    const alt = escapeInlineText($node.attr('alt') || '');
    return `![${alt}](${src})`;
  }

  return inner;
}

function childrenToInline($, nodes) {
  return cleanInlineOutput(nodes.map((n) => nodeToInline($, n)).join(''));
}

function blockquoteify(input) {
  return input
    .split('\n')
    .map((line) => `> ${line}`)
    .join('\n');
}

function listToMarkdown($, node, ordered) {
  const $node = $(node);
  const items = $node.children('li').toArray();
  if (!items.length) return '';

  return items
    .map((li, idx) => {
      const raw = childrenToBlocks($, $(li).contents().toArray());
      const text = cleanInlineOutput(raw.replace(/\n{2,}/g, '\n'));
      const marker = ordered ? `${idx + 1}.` : '-';
      if (!text) return `${marker} `;
      const lines = text.split('\n');
      if (lines.length === 1) return `${marker} ${lines[0]}`;
      return [`${marker} ${lines[0]}`, ...lines.slice(1).map((l) => `   ${l}`)].join('\n');
    })
    .join('\n');
}

function figureToMarkdown($, node) {
  const $node = $(node);
  const $img = $node.find('img').first();
  if ($img.length) {
    const src = $img.attr('src') || '';
    if (!src) return '';
    const alt = escapeInlineText($img.attr('alt') || '');
    const image = `![${alt}](${src})`;
    const caption = cleanInlineOutput(childrenToInline($, $node.find('figcaption').contents().toArray()));
    return caption ? `${image}\n\n*${caption}*` : image;
  }

  const $iframe = $node.find('iframe').first();
  if ($iframe.length) {
    return $.html($iframe);
  }

  return childrenToBlocks($, $node.contents().toArray());
}

function nodeToBlock($, node) {
  if (!node) return '';
  if (node.type === 'text') {
    const text = cleanInlineOutput(escapeInlineText(node.data));
    return text;
  }
  if (node.type !== 'tag') return '';

  const tag = (node.tagName || '').toLowerCase();
  const $node = $(node);

  if (tag === 'section' || tag === 'article' || tag === 'main') {
    return childrenToBlocks($, $node.contents().toArray());
  }
  if (tag === 'div') {
    return childrenToBlocks($, $node.contents().toArray());
  }
  if (/^h[1-6]$/.test(tag)) {
    const level = Number(tag[1]);
    const text = childrenToInline($, $node.contents().toArray());
    return text ? `${'#'.repeat(level)} ${text}` : '';
  }
  if (tag === 'p') {
    return childrenToInline($, $node.contents().toArray());
  }
  if (tag === 'blockquote') {
    const content = childrenToBlocks($, $node.contents().toArray());
    return content ? blockquoteify(content) : '';
  }
  if (tag === 'ul') return listToMarkdown($, node, false);
  if (tag === 'ol') return listToMarkdown($, node, true);
  if (tag === 'figure') return figureToMarkdown($, node);
  if (tag === 'img') return nodeToInline($, node);
  if (tag === 'hr') {
    const cls = String($node.attr('class') || '');
    if (cls.includes('section-divider')) return '';
    return '---';
  }
  if (tag === 'iframe') return $.html($node);
  if (tag === 'pre') {
    const code = $node.text().replace(/\n$/, '');
    return `\`\`\`\n${code}\n\`\`\``;
  }
  if (tag === 'table') return $.html($node);
  if (tag === 'script' || tag === 'style') return '';

  const inline = childrenToInline($, $node.contents().toArray());
  if (inline) return inline;
  return childrenToBlocks($, $node.contents().toArray());
}

function childrenToBlocks($, nodes) {
  return nodes
    .map((n) => nodeToBlock($, n))
    .filter(Boolean)
    .join('\n\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function convertHtmlToMarkdown(html) {
  const wrapped = `<root>${html}</root>`;
  const $ = cheerio.load(wrapped, { decodeEntities: false });
  const $root = $('root');
  const md = childrenToBlocks($, $root.contents().toArray());
  return `${md}\n`;
}

function listMediumPostFiles() {
  return fs
    .readdirSync(POSTS_DIR)
    .filter((name) => name.startsWith('medium-') && name.endsWith('.md'))
    .sort();
}

function isLikelyHtmlBody(body) {
  const sample = String(body || '').trim().slice(0, 500);
  return /<section\b|<div\b|<p\b|<h[1-6]\b|<figure\b/i.test(sample);
}

function main() {
  const files = listMediumPostFiles();
  let converted = 0;
  let skipped = 0;

  for (const file of files) {
    const fullPath = path.join(POSTS_DIR, file);
    const raw = fs.readFileSync(fullPath, 'utf8');
    const { frontMatter, body } = splitFrontMatter(raw);
    if (!isLikelyHtmlBody(body)) {
      skipped += 1;
      continue;
    }

    const markdownBody = convertHtmlToMarkdown(body);
    const output = `${frontMatter}${frontMatter.endsWith('\n') ? '' : '\n'}${markdownBody}`;
    fs.writeFileSync(fullPath, output, 'utf8');
    converted += 1;
  }

  console.log(`Converted medium posts: ${converted}, skipped: ${skipped}`);
}

main();
