module.exports = function (eleventyConfig) {
  function toDate(input) {
    const d = new Date(input);
    if (Number.isNaN(d.getTime())) return null;
    return d;
  }

  eleventyConfig.addPassthroughCopy({ 'src/styles.css': 'styles.css' });
  eleventyConfig.addPassthroughCopy({ 'src/assets': 'assets' });
  eleventyConfig.addPassthroughCopy({ 'src/LICENSE': 'LICENSE' });
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
