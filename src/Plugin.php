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
        add_filter('admin_init', [$this, 'registerSettings']);
        add_action('wp_enqueue_scripts', [$this, 'registerAssets']);
        add_action('wp_enqueue_scripts', [$this, 'enqueueAssets']);
        add_filter('render_block', [$this, 'overrideYoutubeEmbeds'], 10, 2);

        include_once $this->path . '/assets/scripts/cookie-consent/index.php';
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

    public function registerSettings()
    {
        register_setting('general', 'cmp_gtm_id', 'esc_attr');
        add_settings_field('cmp_gtm_id', '<label for="cmp_gtm_id">' . __('GTM ID', 'cmp_gtm_id') . '</label>', __NAMESPACE__ . '\\fields_html', 'general');

        function fields_html()
        {
            ?>
            <input type="text" id="cmp_gtm_id" name="cmp_gtm_id" class="regular-text code" value="<?php echo get_option('cmp_gtm_id', ''); ?>" />
            <p class="description" id="tagline-description">Google Tag Manager ID</p>
            <?php
        }
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
