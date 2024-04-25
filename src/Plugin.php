<?php

namespace GeneroWP\GeneroCmp;

use GeneroWP\GeneroCmp\Models\Consent;

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
        add_action('enqueue_block_editor_assets', [$this, 'blockEditorAssets'], 0);

        add_filter('render_block', [$this, 'overrideYoutubeEmbeds'], 10, 2);

        new Admin($this->name);
        new Frontend($this->name, $this);
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
            filemtime($this->path . '/dist/main.js'),
            version_compare($GLOBALS['wp_version'],'6.3') >= 0 ? ['strategy' => 'async'] : false,
        );
        // Support async loading if a plugin implements it.
        wp_script_add_data("{$this->name}/js", 'async', true);
        wp_add_inline_script(
            "{$this->name}/js",
            file_get_contents($this->path . '/dist/inline.js'),
            'before'
        );

        wp_localize_script("{$this->name}/js", 'generoCmp', [
            'consents' => $this->consentCategories(),
            'necessary_cookies' => $this->necessaryCookies(),
        ]);

        wp_register_style(
            "{$this->name}/css",
            "{$this->url}/dist/main.css",
            [],
            filemtime($this->path . '/dist/main.css')
        );
        wp_style_add_data("{$this->name}/css", 'path', "{$this->path}/dist/main.css");
    }

    public function blockEditorAssets(): void
    {
        if ($manifest = include $this->path . '/dist/editor.asset.php') {
            wp_enqueue_script(
                "{$this->name}/editor.js",
                "{$this->url}/dist/editor.js",
                $manifest['dependencies'],
                filemtime($this->path . '/dist/editor.js')
            );
            wp_localize_script("{$this->name}/editor.js", 'generoCmp', [
                'consents' => $this->consentCategories(),
            ]);
        }
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

    /**
     * @return Consent[]
     */
    public function consentCategories(): array
    {
        $consents[] = new Consent(
            id: Consent::NECESSARY,
            label: __('Necessary', 'genero-cmp'),
            description: __('These cookies are technically required for our core website to work properly, e.g. security functions or your cookie consent preferences.', 'genero-cmp'),
            necessary: true,
            consent: true,
            wpConsentApiCategory: 'functional',
            gtmConsentModes: ['security_storage'],
        );

        $consents[] = new Consent(
            id: Consent::PREFERENCES,
            label: __('Preferences', 'genero-cmp'),
            description: __('Preference cookies enable a website to remember information that changes the way the website behaves or looks, like your preferred language or the region that you are in.', 'genero-cmp'),
            wpConsentApiCategory: 'preferences',
            // Noting that we do not distinguish functional from necessary so we use "preferences"
            gtmConsentModes: ['functionality_storage', 'personalization_storage'],
        );

        $consents[] = new Consent(
            id: Consent::STATISTICS,
            label: __('Statistics', 'genero-cmp'),
            description: __('In order to improve our website going forward, we anonymously collect data for statistical and analytical purposes. With these cookies we can, for instance, monitor the number or duration of visits of specific pages of our website helping us in optimizing user experience.', 'genero-cmp'),
            wpConsentApiCategory: 'statistics',
            gtmConsentModes: ['analytics_storage'],
        );

        $consents[] = new Consent(
            id: Consent::MARKETING,
            label: __('Marketing', 'genero-cmp'),
            description: __('These cookies help us in measuring and optimizing our marketing efforts.', 'genero-cmp'),
            wpConsentApiCategory: 'marketing',
            gtmConsentModes: ['ad_storage', 'ad_user_data', 'ad_personalization'],
        );

        return apply_filters('gds_cmp_consents', $consents);
    }

    public function getConsentCategory(string $id): ?Consent
    {
        foreach ($this->consentCategories() as $consent) {
            if ($consent->id === $id) {
                return $consent;
            }
        }
        return null;
    }

    public function consentHash(): string
    {
        return md5(json_encode(
            array_map(fn(Consent $consent) => $consent->hash(), $this->consentCategories())
        ));
    }

    public function necessaryCookies(): array
    {
        return apply_filters('gds_cmp_necessary_cookies', [
            'wp-settings-',
            'wp-settings-time-',
            'wordpress_test_cookie',
            'wordpress_logged_in_',
            'wordpress_sec_',
            'wp_woocommerce_session_',
            'woocommerce_cart_hash',
            'woocommerce_items_in_cart',
        ]);
    }
}
