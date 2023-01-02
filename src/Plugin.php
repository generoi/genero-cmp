<?php

namespace GeneroWP\PluginBoilerplate;

class Plugin
{
    public $name = 'wp-plugin-boilerplate';
    public $file;
    public $path;
    public $url;

    protected static $instance;

    public static function getInstance()
    {
        if (!isset(self::$instance)) {
            self::$instance = new static();
        }
        return self::$instance;
    }

    public function __construct()
    {
        $this->file = realpath(__DIR__ . '/../wp-plugin-boilerplate.php');
        $this->path = untrailingslashit(plugin_dir_path($this->file));
        $this->url = untrailingslashit(plugin_dir_url($this->file));

        add_action('init', [$this, 'loadTextdomain']);
        add_action('wp_enqueue_scripts', [$this, 'registerAssets']);
        add_action('wp_enqueue_scripts', [$this, 'enqueueAssets']);
    }

    public function registerAssets(): void
    {
        wp_register_script(
            "{$this->name}/js",
            "{$this->url}/dist/main.js",
            [],
            filemtime($this->path . '/dist/main.js')
        );

        wp_register_style(
            "{$this->name}/css",
            "{$this->url}/dist/main.css",
            [],
            filemtime($this->path . '/dist/main.css')
        );
    }

    public function enqueueAssets(): void
    {
        wp_enqueue_style("{$this->name}/css");
        wp_enqueue_script("{$this->name}/js");
    }

    public function loadTextdomain(): void
    {
        load_plugin_textdomain(
            $this->name,
            false,
            dirname(plugin_basename($this->file)) . '/languages'
        );
    }

}
