<?php

namespace GeneroWP\GeneroCmp;

class Frontend
{
    public array $settings;

    public function __construct(
        public string $name,
        public Plugin $plugin,
    ) {
        $this->settings = $plugin->settings() ?: [];

        add_action('wp_head', [$this, 'wpHead'], 9);
        add_action('wp_enqueue_scripts', [$this, 'enqueueAssets'], 0);
        add_filter('wp_resource_hints', [$this, 'addPreconnectHint'], 10, 2);

        if (empty($this->settings['banner_off'])) {
            add_action('wp_body_open', [$this, 'consentManager']);
        }
    }

    public function addPreconnectHint(array $hints, string $type): array
    {
        if ($type === 'preconnect') {
            if (empty($this->settings['gtm_id'])) {
                return $hints;
            }
            if (isset($_GET['no_gtm'])) {
                return $hints;
            }
            if (!empty($this->settings['container_off'])) {
                return $hints;
            }
            $hints[] = [
                'href' => 'https://www.googletagmanager.com',
                'crossorigin',
            ];
        }

        return $hints;
    }

    public function wpHead(): void
    {
        if (empty($this->settings['gtm_id'])) {
            return;
        }
        if (isset($_GET['no_gtm'])) {
            return;
        }

        $datalayer_content = apply_filters('gds_cmp_datalayer', []);

        echo wp_get_inline_script_tag(sprintf("
            var dataLayer = dataLayer || [];
            dataLayer.push(%s);
        ", wp_json_encode($datalayer_content, JSON_UNESCAPED_UNICODE)));

        if (!empty($this->settings['container_off'])) {
            return;
        }

        echo wp_get_inline_script_tag(sprintf("
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;var n=d.querySelector('[nonce]');
            n&&j.setAttribute('nonce',n.nonce||n.getAttribute('nonce'));f.parentNode.insertBefore(j,f);
            console.debug('load gtm');
            })(window,document,'script','dataLayer','%s');
        ", $this->settings['gtm_id']));
    }

    public function enqueueAssets(): void
    {
        wp_enqueue_style("{$this->name}/css");
        wp_enqueue_script("{$this->name}/js");

        if ($this->settings['tcfapi'] ?? false) {
            wp_enqueue_script("{$this->name}/tcfapi/js");
        }

        if ($this->settings['onetrust'] ?? false) {
            wp_enqueue_script("{$this->name}/onetrust/js");
        }
    }

    public function consentManager(): void
    {
        foreach (['gds/accordion', 'gds/accordion-item', 'core/button', 'core/buttons'] as $blockName) {
            render_block([
                'blockName' => $blockName,
                'attrs' => [],
                'innerBlocks' => [],
                'innerHTML' => '',
                'innerContent' => [],
            ]);
        }

        $settings = [];
        $settings['lang'] = get_locale();
        $settings['consents'] = $this->plugin->consentCategories();

        $this->view('consent-dialog.php', [
            'hash' => $this->plugin->consentHash(),
            'settings' => $settings,
        ]);
    }

    protected function view(string $view, array $args = []): void
    {
        if (! get_template_part('genero-cmp/' . str_replace('.php', '', $view), null, $args)) {
            load_template(dirname(__DIR__) . "/templates/$view", true, $args);
        }
    }
}
