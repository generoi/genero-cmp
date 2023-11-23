const mix = require('laravel-mix');
require('@tinypixelco/laravel-mix-wp-blocks');

mix.sass('assets/styles/main.scss', 'dist/')
  .js('assets/scripts/main.js', 'dist/')
  .js('assets/scripts/inline.js', 'dist/')
  .blocks('assets/scripts/editor.js', 'dist/');
