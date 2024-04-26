<?php

namespace GeneroWP\GeneroCmp\Integrations;

use GeneroWP\GeneroCmp\Plugin;
use Gravity_Forms\Gravity_Forms_Google_Analytics\GF_Google_Analytics;

/**
 * @see https://www.cookieyes.com/documentation/features/integrations/facebook-pixel-consent-mode/
 */
class Gravityforms
{
    public function __construct(
        protected Plugin $plugin,
    ) {
        if (empty($this->plugin->settings('plugin_gravity_forms_google_analytics_event_tracking_container_off'))) {
            return;
        }

        // Event Tracking for Gravity Forms plugin
        add_filter('gform_gtm_script_enable', '__return_false');

        if (class_exists(GF_Google_Analytics::class)) {
            add_action('init', [$this, 'removeAnalayticsTags']);
        }
    }

    public function removeAnalayticsTags(): void
    {
        $plugin = GF_Google_Analytics::get_instance();
        remove_action('wp_head', [$plugin, 'maybe_install_tag_manager_header']);
        remove_action('wp_body_open', [$plugin, 'maybe_install_tag_manager_body']);
    }
}
