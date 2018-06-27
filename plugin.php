<?php
/*
Plugin Name:        Plugin Boilerplate
Plugin URI:         http://genero.fi
Description:        A boilerplate WordPress plugin
Version:            0.1.0
Author:             Genero
Author URI:         http://genero.fi/
License:            MIT License
License URI:        http://opensource.org/licenses/MIT
*/
namespace GeneroWP\PluginBoilerplate;

use Puc_v4_Factory;
use GeneroWP\Common\Singleton;
use GeneroWP\Common\Assets;

if (!defined('ABSPATH')) {
    exit;
}

if (file_exists($composer = __DIR__ . '/vendor/autoload.php')) {
    require_once $composer;
}

class Plugin
{
    use Singleton;
    use Assets;

    public $version = '0.1.0';
    public $plugin_name = 'wp-plugin-boilerplate';
    public $plugin_path;
    public $plugin_url;
    public $github_url = 'https://github.com/generoi/wp-plugin-boilerplate';

    public function __construct()
    {
        $this->plugin_path = plugin_dir_path(__FILE__);
        $this->plugin_url = plugin_dir_url(__FILE__);

        register_activation_hook(__FILE__, [__CLASS__, 'activate']);
        register_deactivation_hook(__FILE__, [__CLASS__, 'deactivate']);

        Puc_v4_Factory::buildUpdateChecker($this->github_url, __FILE__, $this->plugin_name);

        add_action('plugins_loaded', [$this, 'init']);
    }

    public function init()
    {
        add_action('wp_enqueue_scripts', [$this, 'register_assets']);
        add_action('wp_enqueue_scripts', [$this, 'enqueue_assets']);
        add_action('init', [$this, 'load_textdomain']);
    }

    public function register_assets()
    {
        $this->registerScript("{$this->plugin_name}/js", 'dist/main.js', ['jquery'], true);
        $this->registerStyle("{$this->plugin_name}/css", 'dist/main.css');
    }

    public function enqueue_assets()
    {
        $this->enqueueScript("{$this->plugin_name}/js");
        $this->enqueueStyle("{$this->plugin_name}/css");
    }

    public function load_textdomain()
    {
        load_plugin_textdomain($this->plugin_name, false, $this->plugin_path . '/languages');
    }

    public static function activate()
    {
        foreach ([
            'advanced-custom-fields-pro/acf.php' => 'Advanced Custom Fields PRO',
            'timber-library/timber.php' => 'Timber Library',
            // 'wp-timber-extended/wp-timber-extended.php' => 'WP Timber Extended',
        ] as $plugin => $name) {
            if (!is_plugin_active($plugin) && current_user_can('activate_plugins')) {
                wp_die(sprintf(
                    __('Sorry, but this plugin requires the %s plugin to be installed and active. <br><a href="%s">&laquo; Return to Plugins</a>', 'wp-hero'),
                    $name,
                    admin_url('plugins.php')
                ));
            }
        }
    }

    public static function deactivate()
    {
    }
}

Plugin::getInstance();
