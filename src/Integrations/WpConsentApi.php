<?php

namespace GeneroWP\GeneroCmp\Integrations;

/**
 * @see https://github.com/Really-Simple-Plugins/wp-consent-level-api
 */
class WpConsentApi
{
    public function __construct(array $settings)
    {
        add_filter('wp_get_consent_type', fn () => 'optin');
        add_filter('wp_consent_categories', [$this, 'filterCategories']);
        add_action('plugins_loaded', [$this, 'addCookieInfo']);
    }

    public function filterCategories(array $categories): array
    {
        unset($categories['statistics-anonymous']);
        return $categories;
    }

    public function addCookieInfo(): void
    {
        if (function_exists('wp_add_cookie_info')) {
            return;
        }
        wp_add_cookie_info(
            name: 'gds-consent',
            plugin_or_service: 'Genero CMP',
            category: 'functional',
            expires: __('1 year', 'genero-cmp'),
            function: __('Stores users consent preference', 'genero-cmp'),
            collected_personal_data: false
        );

        wp_add_cookie_info(
            name: 'gds-consent-hash',
            plugin_or_service: 'Genero CMP',
            category: 'functional',
            expires: __('1 year', 'genero-cmp'),
            function: __('Stores a hash of the consent options last time consent was given so that any changes will prompt for a new consent', 'genero-cmp'),
            collected_personal_data: false
        );
    }
}
