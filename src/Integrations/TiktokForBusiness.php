<?php

namespace GeneroWP\GeneroCmp\Integrations;

use GeneroWP\GeneroCmp\Models\Consent;
use GeneroWP\GeneroCmp\Plugin;

/**
 * https://ads.tiktok.com/help/article/using-cookies-with-tiktok-pixel?lang=en
 */
class TiktokForBusiness
{
    public function __construct(
        protected Plugin $plugin,
    ) {
        add_filter('wp_inline_script_attributes', [$this, 'addScriptAttribute']);
    }

    public function addScriptAttribute(array $attributes): array
    {
        $scriptId = $attributes['id'] ?? null;
        if ($scriptId === 'tiktok-pixel-tracking-handle-header-js-after') {
            $attributes['type'] = 'text/plain';
            $attributes['data-gds-cmp-consent'] = implode(' ', [Consent::STATISTICS, Consent::MARKETING]);
        }
        return $attributes;
    }
}
