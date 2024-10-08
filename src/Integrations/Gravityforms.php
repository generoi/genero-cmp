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
        // Never store IP.
        add_filter('gform_ip_address', '__return_empty_string');
        // Set better new form defaults.
        add_filter('gform_form_update_meta', [$this, 'setDefaultPersonalDataSettings'], 10, 3);

        if (empty($this->plugin->settings('plugin_gravity_forms_google_analytics_event_tracking_container_off'))) {
            return;
        }

        // Event Tracking for Gravity Forms plugin
        add_filter('gform_gtm_script_enable', '__return_false');

        if (class_exists(GF_Google_Analytics::class)) {
            add_action('init', [$this, 'removeAnalayticsTags']);
        }
    }

    public function setDefaultPersonalDataSettings(array $formMeta, int $formId, string $metaName): array
    {
        if (isset($formMeta['personalData']) || $metaName !== 'display_meta') {
            return $formMeta;
        }
        $formMeta['personalData']['preventIP'] = true;
        $formMeta['personalData']['retention'] = [
            'policy' => 'delete',
            'retain_entries_days' => 365 * 2,
        ];
        return $formMeta;
    }

    public function removeAnalayticsTags(): void
    {
        $plugin = GF_Google_Analytics::get_instance();
        remove_action('wp_head', [$plugin, 'maybe_install_tag_manager_header']);
        remove_action('wp_body_open', [$plugin, 'maybe_install_tag_manager_body']);
    }
}
