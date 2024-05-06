<?php

namespace GeneroWP\GeneroCmp\Integrations;

use GeneroWP\GeneroCmp\Plugin;

class Redirection
{
    public function __construct(
        protected Plugin $plugin,
    ) {
        if (! defined('REDIRECTION_OPTION')) {
            return;
        }

        add_filter('red_default_options', [$this, 'defaultOptions']);
        add_filter('option_' . REDIRECTION_OPTION, [$this, 'enforceOptions']);
    }

    public function defaultOptions(array $options): array
    {
        $options['ip_logging'] = 0;

        return $options;
    }

    public function enforceOptions($options)
    {
        if (!empty($options['ip_logging']) && $options['ip_logging'] === 1) {
            $options['ip_logging'] = 2;
        }

        return $options;
    }
}
