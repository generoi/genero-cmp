<?php

namespace GeneroWP\GeneroCmp\Integrations;

use GeneroWP\GeneroCmp\Plugin;

/**
 * @see https://wp-glogin.com/docs/api/login-hooks/#gal_set_login_cookie
 */
class GoogleAppsLogin
{
    public function __construct(
        protected Plugin $plugin,
    ) {
        add_filter('gal_set_login_cookie', [$this, 'maybeSetLoginCookie']);
    }

    public function maybeSetLoginCookie(): bool
    {
        return $GLOBALS['pagenow'] == 'wp-login.php';
    }
}
