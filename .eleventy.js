module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ 'src/styles.css': 'styles.css' });
  eleventyConfig.addPassthroughCopy({ 'src/assets': 'assets' });

  eleventyConfig.addCollection('postsByDate', function (collectionApi) {
    return collectionApi.getFilteredByGlob('src/posts/*.md').sort((a, b) => b.date - a.date);
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
