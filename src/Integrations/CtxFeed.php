<?php

namespace GeneroWP\GeneroCmp\Integrations;

use GeneroWP\GeneroCmp\Plugin;

class CtxFeed
{
    public function __construct(
        protected Plugin $plugin,
    ) {
        if (empty($this->plugin->settings('plugin_ctx_feed_facebook_pixel_off'))) {
            return;
        }

        add_action('init', [$this, 'init']);
    }

    public function init(): void
    {
        $this->removePluginFilter('wp_head', 'add_pixel_script');
        add_action('wp_head', function () {
            ?><script><?php do_action('woo_feed_after_pixel_init'); ?></script><?php
        }, 20);
    }

    public function removePluginFilter(string $hook_name = '', string $method_name = '', int $priority = 10): bool
    {
        global $wp_filter;

        // Take only filters on right hook name and priority
        if (! isset($wp_filter[ $hook_name ][ $priority ]) || ! is_array($wp_filter[ $hook_name ][ $priority ])) {
            return false;
        }
        // Loop on filters registered
        foreach ((array) $wp_filter[ $hook_name ][ $priority ] as $unique_id => $filter_array) {
            // Test if filter is an array ! (always for class/method)
            if (isset($filter_array['function']) && is_array($filter_array['function'])) {
                // Test if object is a class and method is equal to param !
                if (is_object($filter_array['function'][0]) && get_class($filter_array['function'][0]) && $filter_array['function'][1] == $method_name) {
                    // Test for WordPress >= 4.7 WP_Hook class (https://make.wordpress.org/core/2016/09/08/wp_hook-next-generation-actions-and-filters/)
                    if (is_a($wp_filter[ $hook_name ], 'WP_Hook')) {
                        unset($wp_filter[ $hook_name ]->callbacks[ $priority ][ $unique_id ]);
                    } else {
                        unset($wp_filter[ $hook_name ][ $priority ][ $unique_id ]);
                    }
                }
            }
        }
        return false;
    }
}

