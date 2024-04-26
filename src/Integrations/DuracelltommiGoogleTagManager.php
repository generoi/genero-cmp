<?php

namespace GeneroWP\GeneroCmp\Integrations;

use GeneroWP\GeneroCmp\Plugin;

/**
 * @see https://www.cookieyes.com/documentation/features/integrations/facebook-pixel-consent-mode/
 */
class DuracelltommiGoogleTagManager
{
    public function __construct(
        protected Plugin $plugin,
    ) {
        if (! function_exists('gtm4wp_reload_options')) {
            return;
        }

        // If we add our own container code, we need to turn off GTM4WP one
        if (empty($this->plugin->settings('container_off'))) {
            add_filter('option_gtm4wp-options', [$this, 'removeGtmContainerPlacement']);
            $GLOBALS['gtm4wp_options'] = gtm4wp_reload_options();
        }
    }

    public function removeGtmContainerPlacement($options)
    {
        $options[GTM4WP_OPTION_GTM_PLACEMENT ] = GTM4WP_PLACEMENT_OFF;
        return $options;
    }
}
