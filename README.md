# genero-cmp

CMP Plugin

## Third Party integrations

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
window.generoCmp.modal

/**
 * Show the consent dialog
 *
 * @returns {void}
 */
window.generoCmp.show()

/**
 * Hide the consent dialog
 *
 * @returns {void}
 */
window.generoCmp.hide()

/**
 * Withdraw current consent.
 *
 * @returns {void}
 */
window.generoCmp.withdraw()

/**
 * Return if user has granted the passed consents.
 *
 * @param {...Consent} consents Consent name eg. 'necessary`, `preferences`, `marketing`, `statistics`.
 * @returns {boolean} if user has granted all the consents
 */
window.generoCmp.hasConsent(...consents)

/**
 * Evaluate and initialize all script tags using data-cmp-consent="" string
 *
 * @param {Node} context
 * @returns void
 */
window.generoCmp.evaluateTags(context = document)
```

## Utilities

### Hide content using CSS

```html
<div data-consent-optin="necessary marketing">
  Show when consent is given for necessary and marketing cookies.
</div>
<div data-consent-optout="necessary marketing">
  Hide when consent is given for necessary and marketing cookies.
</div>
```

### Display cookie consent dialog

Add `.js-show-cookieconsent` selector to any element (runs on `DOMContentLoaded`)

```html
<button class="js-show-cookieconsent">Change consent</button>
```


Add `[data-genero-cmp-show]` selector to any element (delegates as a document click listener)

```js
if (window.generoCmp && !window.generoCmp.hasConsent('preferences')) {
  noticeMessage = __('You need to accept "preferences" cookies to use this feature.');
  noticeMessage = `<p>${noticeMessage}</p><button class="button" data-genero-cmp-show>${__('Adjust settings')}</button>`;
  showNotice(noticeMessage, 'error');
}
```

- Run manually with `window.generoCmp.show()`
- Run `show()` on the `<gds-cmp-modal-dialog>` element

### Block elements from being loaded using `[data-cmp-consent]` attribute

You can add `data-cmp-consent="marketing preferences"` to an element and once consent has been given, the element will evaluate.

Supported elements are `<script>`, `<img>`, `<video>` and `<iframe>`.

This is useful if content is entirely opt-in and doesnt require prompting the user for consent.

```html
<script src="..." type="text/plain" data-cmp-consnet="marketing statistics"></script>

<iframe data-cmp-src="..." data-cmp-consent="marketing"></iframe>
<img data-cmp-src="..." data-cmp-consent="marketing" />
<video data-cmp-src="..." data-cmp-consent="marketing"></video>
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

If you need to run JS once the embed replace has taken place, you can listen for the `cmp-embed.visible` event.

```js
function init(el) {
  if (el.tagName === 'GDS-CMP-EMBED') {
    el.addEventListener('cmp-embed.visible', (e) => init(e.detail.element));
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
