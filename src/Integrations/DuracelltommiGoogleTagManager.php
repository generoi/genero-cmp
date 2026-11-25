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
        // Defined when GTM4WP's main file loads, in 1.x and 2.x alike. Its
        // options are read later (1.22+ and 2.x on plugins_loaded), so
        // gtm4wp_reload_options() can't tell whether it's active yet.
        if (! defined('GTM4WP_PATH')) {
            return;
        }

        // If we add our own container code, we need to turn off GTM4WP one
        if (empty($this->plugin->settings('container_off')) && ! empty($this->plugin->settings('gtm_id'))) {
            add_filter('option_gtm4wp-options', [$this, 'removeGtmContainerPlacement']);
            // Older 1.x read its options as soon as its file loaded: read them again.
            if (function_exists('gtm4wp_reload_options')) {
                $GLOBALS['gtm4wp_options'] = gtm4wp_reload_options();
            }
        }
    }

    public function removeGtmContainerPlacement($options)
    {
        if (is_array($options)) {
            $options[GTM4WP_OPTION_GTM_PLACEMENT] = GTM4WP_PLACEMENT_OFF;
        }
        return $options;
    }
}
