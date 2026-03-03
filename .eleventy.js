const fs = require('fs');
const path = require('path');
const ROOT = __dirname;

module.exports = function (eleventyConfig) {
  function toDate(input) {
    const d = new Date(input);
    if (Number.isNaN(d.getTime())) return null;
    return d;
  }

  function getSystemUpdatedAt() {
    const watchedFiles = [
      path.join(ROOT, '.eleventy.js'),
      path.join(ROOT, 'src', '_includes', 'layout.njk'),
      path.join(ROOT, 'src', 'styles.css')
    ];
    const latestMtime = watchedFiles
      .map((file) => {
        try {
          return fs.statSync(file).mtimeMs;
        } catch (_err) {
          return 0;
        }
      })
      .reduce((max, value) => Math.max(max, value), 0);
    return latestMtime > 0 ? new Date(latestMtime) : new Date();
  }

  eleventyConfig.addPassthroughCopy({ 'src/styles.css': 'styles.css' });
  eleventyConfig.addPassthroughCopy({ 'src/assets': 'assets' });
  eleventyConfig.addPassthroughCopy({ 'src/LICENSE': 'LICENSE' });
  eleventyConfig.addPassthroughCopy({ 'src/CNAME': 'CNAME' });
  eleventyConfig.addFilter('readableDate', (dateObj) => {
    if (!dateObj) return '';
    const d = new Date(dateObj);
    if (Number.isNaN(d.getTime())) return String(dateObj);
    return new Intl.DateTimeFormat('zh-TW', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(d);
  });
  eleventyConfig.addFilter('rfc822Date', (dateObj) => {
    const d = toDate(dateObj);
    return d ? d.toUTCString() : '';
  });
  eleventyConfig.addFilter('isoDate', (dateObj) => {
    const d = toDate(dateObj);
    return d ? d.toISOString() : '';
  });
  eleventyConfig.addFilter('latestIsoDate', (dateObj, compareDateObj) => {
    const d1 = toDate(dateObj);
    const d2 = toDate(compareDateObj);
    if (!d1 && !d2) return '';
    if (!d1) return d2.toISOString();
    if (!d2) return d1.toISOString();
    return (d1 > d2 ? d1 : d2).toISOString();
  });
  eleventyConfig.addFilter('absoluteUrl', (urlPath, siteUrl) => {
    const target = String(urlPath || '');
    if (!target) return '';
    if (/^https?:\/\//i.test(target)) return target;
    const base = String(siteUrl || '').replace(/\/+$/, '');
    if (!base) return target;
    return `${base}${target.startsWith('/') ? '' : '/'}${target}`;
  });
  eleventyConfig.addFilter('xmlEscape', (value) =>
    String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;')
  );

  eleventyConfig.addCollection('postsByDate', function (collectionApi) {
    return collectionApi
      .getFilteredByGlob('src/posts/*.md')
      .filter((item) => item.data.permalink !== false && item.data.eleventyExcludeFromCollections !== true)
      .sort((a, b) => b.date - a.date);
  });
  eleventyConfig.addCollection('recentPosts', function (collectionApi) {
    return collectionApi
      .getFilteredByGlob('src/posts/*.md')
      .filter((item) => item.data.permalink !== false && item.data.eleventyExcludeFromCollections !== true)
      .sort((a, b) => b.date - a.date)
      .slice(0, 20);
  });
  eleventyConfig.addCollection('archivedPosts', function (collectionApi) {
    return collectionApi
      .getFilteredByGlob('src/posts/*.md')
      .filter((item) => item.data.permalink !== false && item.data.eleventyExcludeFromCollections !== true)
      .sort((a, b) => b.date - a.date)
      .slice(20);
  });
  eleventyConfig.addGlobalData('systemUpdatedAt', getSystemUpdatedAt());

  return {
    dir: {
      input: 'src',
      includes: '_includes',
      output: '_site'
    },
    markdownTemplateEngine: false,
    htmlTemplateEngine: 'njk',
    dataTemplateEngine: 'njk'
  };
};
