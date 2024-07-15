<?php

namespace GeneroWP\GeneroCmp\Integrations;

use GeneroWP\GeneroCmp\Models\Consent;
use GeneroWP\GeneroCmp\Plugin;

/**
 * https://wordpress.org/plugins/wp-tiktok-feed/
 */
class WpTiktokFeed
{
    public function __construct(
        protected Plugin $plugin,
    ) {
        add_filter('script_loader_tag', [$this, 'scriptLoaderTag'], 10, 2);
    }

    public function scriptLoaderTag(string $tag, string $handle): string
    {
        if ($handle === 'qlttf-frontend') {
            $tag = str_replace(
                '<script ',
                sprintf('<script type="text/plain" data-gds-cmp-consent="%s"', implode(' ', [Consent::STATISTICS, Consent::MARKETING])),
                $tag,
            );
        }
        return $tag;
    }
}
