<?php

namespace GeneroWP\GeneroCmp\Integrations;

use GeneroWP\GeneroCmp\Plugin;

/**
 * @see https://www.cookieyes.com/documentation/features/integrations/facebook-pixel-consent-mode/
 */
class FacebookForWooCommerce
{
    public function __construct(
        protected Plugin $plugin,
    ) {
        add_filter('facebook_woocommerce_pixel_init', [$this, 'defaultRevokeConsent']);
    }

    public function defaultRevokeConsent(string $code): string
    {
        return "console.debug('FacebookForWoocommerce consent revoked');fbq('consent', 'revoke');" . $code;
    }
}
