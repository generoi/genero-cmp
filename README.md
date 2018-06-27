# wp-plugin-boilerplate

> A wordpress boilerplate plugin with which you can write ES6 JavaScript and SASS.

## Requirements

_Does the plugin have any requirements?_

## Features

_A list of features_.

## API

_Any hooks exposed?_

```php
// Load recaptcha script.
add_filter('gravityforms-timber/options', function ($options) {
  $options['recaptcha'] = true;
});
```

## Development

Install dependencies

    composer install
    npm install

Run the tests

    npm run test

Build assets

    # Minified assets which are to be committed to git
    npm run production

    # Development assets while developing the plugin
    npm run dev

    # Watch for changes and re-compile while developing the plugin
    npm run watch

### Translations

Rebuild POT files (after this, copy to each language as `languages/wp-plugin-boilerplate-<langcode>.po` and translate it)

    npm run lang:pot

Compile MO files (requires msgfmt which is available with `brew install gettext && brew link gettext --force`)

    npm run lang:mo

Or run all of these with:

    npm run lang
