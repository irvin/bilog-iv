#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');

const ROOT = process.cwd();
const POSTS_DIR = path.join(ROOT, 'src', 'posts');
const REPORT_PATH = path.join(ROOT, 'src', 'assets', 'medium-response-filter-report.json');
const APPLY = process.argv.includes('--apply');

function splitFrontMatter(text) {
  if (!text.startsWith('---\n')) return null;
  const end = text.indexOf('\n---\n', 4);
  if (end < 0) return null;
  return {
    frontMatter: text.slice(4, end),
    body: text.slice(end + 5)
  };
}

function getQuotedYamlValue(frontMatter, key) {
  const re = new RegExp(`^${key}:\\s*"([\\s\\S]*?)"$`, 'm');
  const m = frontMatter.match(re);
  return m ? m[1] : '';
}

function stripHtml(input) {
  return (input || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function isLikelyMediumResponse(bodyHtml) {
  const text = stripHtml(bodyHtml);
  const pCount = (bodyHtml.match(/<p\b/gi) || []).length;
  const headingCount = (bodyHtml.match(/<h[1-6]\b/gi) || []).length;
  const figureCount = (bodyHtml.match(/<figure\b/gi) || []).length;
  const mixtapeCount = (bodyHtml.match(/mixtapeEmbed/gi) || []).length;

  return (
    text.length <= 120 &&
    pCount <= 2 &&
    headingCount === 0 &&
    figureCount === 0 &&
    mixtapeCount === 0
  );
}

function main() {
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.startsWith('medium-') && f.endsWith('.md'));
  const candidates = [];

  for (const file of files) {
    const abs = path.join(POSTS_DIR, file);
    const text = fs.readFileSync(abs, 'utf8');
    const parsed = splitFrontMatter(text);
    if (!parsed) continue;

    const source = getQuotedYamlValue(parsed.frontMatter, 'source');
    if (source !== 'medium') continue;

    const title = getQuotedYamlValue(parsed.frontMatter, 'title');
    const permalink = getQuotedYamlValue(parsed.frontMatter, 'permalink');
    const body = parsed.body.trim();

    if (!isLikelyMediumResponse(body)) continue;

    candidates.push({
      file,
      permalink,
      title
    });
  }

  if (APPLY) {
    for (const item of candidates) {
      fs.unlinkSync(path.join(POSTS_DIR, item.file));
    }
  }

  const report = {
    generatedAt: new Date().toISOString(),
    apply: APPLY,
    removedCount: candidates.length,
    items: candidates
  };

  fs.writeFileSync(REPORT_PATH, `${JSON.stringify(report, null, 2)}\n`, 'utf8');

  console.log(`Candidates: ${candidates.length}`);
  console.log(`Mode: ${APPLY ? 'apply' : 'dry-run'}`);
  console.log(`Report: ${REPORT_PATH}`);
}

main();
