# genero-cmp

> CMP Plugin

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
    npm run build:production

    # Watch for changes and re-compile while developing the plugin
    npm run start

## Translations

    wp i18n make-pot . languages/genero-cmp.pot
    wp i18n make-mo languages/
