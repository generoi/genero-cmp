<?php

namespace GeneroWP\GeneroCmp\Integrations;

/**
 * https://ads.tiktok.com/help/article/using-cookies-with-tiktok-pixel?lang=en
 */
class TiktokForBusiness
{
    public function __construct(array $settings)
    {
        add_filter('wp_inline_script_attributes', [$this, 'addScriptAttribute'], 10, 2);
    }

    public function addScriptAttribute(array $attributes, $script): array
    {
        $scriptId = $attributes['id'] ?? null;
        if ($scriptId === 'tiktok-pixel-tracking-handle-header-js-after') {
            $attributes['type'] = 'text/plain';
            $attributes['data-cmp-consent'] = 'statistics marketing';
        }
        return $attributes;
    }
}
