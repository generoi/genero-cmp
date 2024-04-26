# genero-cmp

CMP Plugin

## Features

- YouTube block use `youtube-noockie.com` domain instead
- YouTube and Google Maps iframes require marketing and statistics consent before shown.
- [Event Tracking for Gravity Forms](https://wordpress.org/plugins/gravity-forms-google-analytics-event-tracking/) container code is removed.
- [Gravity Forms Analytics](https://www.gravityforms.com/add-ons/google-analytics/) analytics tag is removed.
- [CTX Feed](https://wordpress.org/plugins/webappick-product-feed-for-woocommerce/) pixel is removed.
- [WP Consent API](https://wordpress.org/plugins/wp-consent-api/) integration (required for GDPR compliant WooCommerce).
- [TikTok for Business](https://wordpress.org/plugins/tiktok-for-business/) pixel is removed until marketing consent has been given
- [Facebook for WooCommerce](https://wordpress.org/plugins/facebook-for-woocommerce/) pixel gets `fbq('consent', 'revoke');` when initialized

## Block consent settings (beta)

Blocks in the block editor are extended with an option to either hide/show based on one or multiple consents.

Note this is likely broken in some cases at the moment.

## PHP API

### Define necessary cookies

When withdrawing consent, all non-necessary cookies are removed. You can edit this set of cookies.

```php
add_filter('gds_cmp_necessary_cookies', function (array $cookies) {
    $cookies[] = CartServiceProvider::CART_COUNT_COOKIE;
    $cookies[] = CartServiceProvider::LOGGED_IN_COOKIE;
    return $cookies;
});
```

### Alter consent categories

You can add or remove custom consent categories.

```php
add_filter('gds_cmp_consents', function (array $consents) {
    $consents[] = new \GeneroWP\GeneroCmp\Models\Consent(
        id: 'custom-consent',
        label: __('Custom Consent'),
        description: __('Custom consent'),
        wpConsentApiCategory: 'marketing',
        gtmConsentModes: ['ad_storage', 'ad_user_data', 'ad_personalization'],
    );
    return $consents;
});
```


### Block additional iframe embeds

By default iframes in `the_content` referencing _youtube.com_ get blocked using `<gds-cmp-consent consent="marketing">`. You can extend this to other iframe matches or all of them.

```php
add_filter('gds_cmp_embed_consents', function (array $consents, string $tag) {
  // Block all iframes by default
  if (! $consents) {
    $consents[] = 'preferences';
  }
  return $consents;
}, 10, 2);
```

## JavaScript API

```js
/**
 * @param {HTMLElement} modal Reference to the <gds-cmp-modal-dialog> element
 * @returns {void}
 */
window.gdsCmp.modal

/**
 * Show the consent dialog
 *
 * @returns {void}
 */
window.gdsCmp.show()

/**
 * Hide the consent dialog
 *
 * @returns {void}
 */
window.gdsCmp.hide()

/**
 * Withdraw current consent.
 *
 * @returns {void}
 */
window.gdsCmp.withdraw()

/**
 * Return if user has granted the passed consents.
 *
 * @param {...Consent} consents Consent name eg. 'necessary`, `preferences`, `marketing`, `statistics`.
 * @returns {boolean} if user has granted all the consents
 */
window.gdsCmp.hasConsent(...consents)

/**
 * Evaluate and initialize all script tags using data-cmp-consent="" string
 *
 * @param {Node} context
 * @returns void
 */
window.gdsCmp.evaluateTags(context = document)
```

### Events

```js
window.addEventListener('gds-cmp.consent', () => {
  if (window.gdsCmp.hasConsent('marketing')) {
    // ....
  }
});

window.addEventListener('gds-cmp.consent.marketing', () => {
  // ...
});
```

## Utilities

### Hide content using CSS

```html
<div data-gds-cmp-consent-optin="necessary marketing">
  Show when consent is given for necessary and marketing cookies.
</div>
<div data-gds-cmp-consent-optout="necessary marketing">
  Hide when consent is given for necessary and marketing cookies.
</div>
```

### Control cookie consent dialog

Add `.js-gds-cmp-show` class to any element (needs to be in DOM before DOMDocumentReady).

```html
<a class="js-gds-cmp-show">Change consent</a>
```

Add `[data-gds-cmp-trigger="show|hide|withdraw"]` selector to any element (delegates as a document click listener)

```html
<button data-gds-cmp-trigger="show">Change consent</button>
```

- Run manually with `window.gdsCmp.show()`
- Run `show()` on the `<gds-cmp-modal-dialog>` element

### Block elements from being loaded using `[data-gds-cmp-consent]` attribute

You can add `data-gds-cmp-consent="marketing preferences"` to an element and once consent has been given, the element will evaluate.

Supported elements are `<script>`, `<img>`, `<video>` and `<iframe>`.

This is useful if content is entirely opt-in and doesnt require prompting the user for consent.

```html
<script src="..." type="text/plain" data-gds-cmp-consent="marketing statistics"></script>

<iframe data-gds-cmp-src="..." data-gds-cmp-consent="marketing"></iframe>
<img data-gds-cmp-src="..." data-gds-cmp-consent="marketing" />
<video data-gds-cmp-src="..." data-gds-cmp-consent="marketing"></video>
```

### Block elements with a message using `<gds-cmp-embed>`

```html
<gds-cmp-embed
  consent="{{ \GeneroWP\GeneroCmp\Models\Consent::MARKETING }}"
  description="{{ sprintf(__('Viewing this embed loads content from a third party and thus requires <em>%s</em> consent.', 'wp-gds-theme'), __('Marketing', 'genero-cmp')) }}"
  button="{{ __('Modify preferences', 'genero-cmp') }}"
>
  Content which gets rendered once consent has been given.
</gds-cmp-embed>
```

You can also use `as=""` attribute to replace eg an `<iframe>`.

```html
<gds-cmp-embed
  as="iframe"
  consent="{{ \GeneroWP\GeneroCmp\Models\Consent::MARKETING }}"
  description="{{ sprintf(__('Viewing this embed loads content from a third party and thus requires <em>%s</em> consent.', 'wp-gds-theme'), __('Marketing', 'genero-cmp')) }}"
  button="{{ __('Modify preferences', 'genero-cmp') }}"
  class="embed-youtube"
  frameborder="0"
  allowfullscreen=""
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  src="https://www.youtube.com/embed/..."
>
</gds-cmp-embed>
```

If you need to run JS once the embed replace has taken place, you can listen for the `gds-cmp-embed.replaced` event.

```js
function init(el) {
  if (el.tagName === 'GDS-CMP-EMBED') {
    el.addEventListener('gds-cmp-embed.replaced', (e) => init(e.detail.element));
    return;
  }
  // ... do stuff
}

init(document.querySelector('[data-custom-function]'));
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
