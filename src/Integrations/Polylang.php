<?php

namespace GeneroWP\GeneroCmp\Integrations;

use GeneroWP\GeneroCmp\Models\Consent;
use GeneroWP\GeneroCmp\Plugin;
use PLL_Integrations;

class Polylang
{
    public function __construct(
        protected Plugin $plugin,
    ) {
        // Needs to run before plugins_loaded 0
        add_filter('pll_is_cache_active', '__return_true');
        // Needs to run after pll_init 10
        add_action('pll_init', [$this, 'init'], 11);
    }

    public function init(): void
    {
        // We need to be in cache-compatibility mode to not set the cookie in PHP
        /** @var \PLL_Cache_Compat $pllCacheIntegration */
        $pllCacheIntegration = PLL_Integrations::instance()->cache_compat;

        // Remove the default script and instead wait for consent
        remove_action('wp_print_footer_scripts', [$pllCacheIntegration, 'add_cookie_script']);
        add_action('wp_print_footer_scripts', [$this, 'addConsentTag']);
    }

    public function addConsentTag(): void
    {
        /** @var \PLL_Cache_Compat $pllCacheIntegration */
        $pllCacheIntegration = PLL_Integrations::instance()->cache_compat;

        ob_start();
        $pllCacheIntegration->add_cookie_script();
        $script = ob_get_clean();

        if (str_contains($script, ' type="text/javascript"')) {
            $script = str_replace(' type="text/javascript"', '', $script);
        }

        $script = str_replace(
            '<script',
            sprintf('<script data-gds-cmp-consent="%s" type="text/plain"', Consent::PREFERENCES),
            $script
        );

        echo $script;
    }
}
