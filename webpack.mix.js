const mix = require('laravel-mix');

mix.sass('assets/styles/main.scss', 'dist/')
  .js('assets/scripts/main.js', 'dist/')
  .options({
    processCssUrls: false,
  });

mix.webpackConfig({
  externals: {
    '@wordpress/ajax': 'wp.ajax',
    '@wordpress/api': 'wp.api',
    '@wordpress/apiRequest': 'wp.apiRequest',
    '@wordpress/apiSettings': 'wpApiSettings',
    '@wordpress/Backbone': 'wp.Backbone',
    '@wordpress/template': 'wp.template',
  },
});
