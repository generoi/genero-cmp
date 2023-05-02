<?php

namespace GeneroWP\GeneroCmp;

class Plugin
{
    public $name = 'genero-cmp';
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
        $this->file = realpath(__DIR__ . '/../genero-cmp.php');
        $this->path = untrailingslashit(plugin_dir_path($this->file));
        $this->url = untrailingslashit(plugin_dir_url($this->file));

        add_action('init', [$this, 'loadTextdomain']);
        add_action('wp_enqueue_scripts', [$this, 'registerAssets']);

        add_filter('render_block', [$this, 'overrideYoutubeEmbeds'], 10, 2);

        new Admin($this->name);
        new Frontend($this->name);
        new Plugins($this->name);
    }

    /**
     * Assets
     */
    public function registerAssets(): void
    {
        wp_register_script(
            "{$this->name}/js",
            "{$this->url}/dist/main.js",
            [],
            filemtime($this->path . '/dist/main.js')
        );
        // Support async loading if a plugin implements it.
        wp_script_add_data("{$this->name}/js", 'async', true);

        wp_register_style(
            "{$this->name}/css",
            "{$this->url}/dist/main.css",
            [],
            filemtime($this->path . '/dist/main.css')
        );
        wp_style_add_data("{$this->name}/css", 'path', "{$this->path}/dist/main.css");
    }


    /**
     * Text domain
     */
    public function loadTextdomain(): void
    {
        load_plugin_textdomain(
            $this->name,
            false,
            dirname(plugin_basename($this->file)) . '/languages'
        );
    }

    /**
     * Override youtube embed blocks with no-cookie parameter
     */
    public function overrideYoutubeEmbeds($block_content, $block)
    {
        // ignore this code in backend
        if (is_admin()) {
            return $block_content;
        }

        // override youtube embeds url
        if ('core-embed/youtube' === $block['blockName']) {
            $block_content = str_replace('youtube.com', 'youtube-nocookie.com', $block_content);
        }

        return $block_content;
    }
}
