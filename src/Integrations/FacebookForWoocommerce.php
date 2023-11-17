<?php

namespace GeneroWP\GeneroCmp\Integrations;

/**
 * @see https://www.cookieyes.com/documentation/features/integrations/facebook-pixel-consent-mode/
 */
class FacebookForWooCommerce
{
    public function __construct(array $settings)
    {
        add_filter('facebook_woocommerce_pixel_init', [$this, 'defaultRevokeConsent']);
    }

    public function defaultRevokeConsent(string $code): string
    {
        return "fbq('consent', 'revoke');" . $code;
    }
}
