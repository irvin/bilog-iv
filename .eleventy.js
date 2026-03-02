module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ 'src/styles.css': 'styles.css' });
  eleventyConfig.addPassthroughCopy({ 'src/assets': 'assets' });
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
