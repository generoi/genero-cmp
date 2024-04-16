<?php

namespace GeneroWP\GeneroCmp;

class Frontend
{
    public $settings;
    public $name;

    public function __construct($name)
    {
        $this->name = $name;
        $this->settings = apply_filters('gds_cmp_settings', get_option($name));

        add_action('wp_head', [$this, 'wpHead'], 9);
        add_action('wp_footer', [$this, 'wpFooter']);
        add_action('wp_enqueue_scripts', [$this, 'enqueueAssets'], 0);
        add_action('init', [$this, 'removeCookies']);
        add_action('wp_body_open', [$this, 'consentManager']);
        add_filter('wp_resource_hints', [$this, 'addPreconnectHint'], 10, 2);

        if (!empty($this->settings['event_user_logged_in'])) {
            add_action('wp_login', [$this, 'setLoginCookie']);
        }

        if (!empty($this->settings['event_new_user_reg'])) {
            add_action('user_register', [$this, 'setRegisterCookie']);
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

    public function wpHead()
    {
        if (empty($this->settings['gtm_id'])) {
            return;
        }
        if (isset($_GET['no_gtm'])) {
            return;
        }

        $datalayer_content = apply_filters('gds_cmp_datalayer', $this->getDataLayerData());
        ?>

        <!-- DataLayer by genero-cmp -->
        <script>
            var dataLayer = dataLayer || [];
            dataLayer.push(<?= wp_json_encode($datalayer_content, JSON_UNESCAPED_UNICODE) ?>);
        </script>
        <!-- End DataLayer by genero-cmp -->

        <?php

        if (!empty($this->settings['container_off'])) {
            return;
        }
        ?>

        <!-- Google Tag Manager by genero-cmp -->
        <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                console.debug('load gtm');
            })(window,document,'script','dataLayer','<?= $this->settings['gtm_id']; ?>');</script>
        <!-- End Google Tag Manager by genero-cmp -->

        <?php
    }

    public function wpFooter()
    {
        if (empty($this->settings['gtm_id'])) {
            return;
        }

        if (!empty($this->settings['event_user_logged_in'])) {
            $user_logged_in = array_key_exists('genero_cmp_logged_in', $_COOKIE) ? filter_var(wp_unslash($_COOKIE['genero_cmp_logged_in']), FILTER_VALIDATE_INT) : 0;

            if ($user_logged_in) {
                ?>

                <script>
                    if(window.dataLayer) {
                        window.dataLayer.push({'event' : 'generoCMP.userLoggedIn'})
                    }
                </script>

                <?php
                unset($_COOKIE['genero_cmp_logged_in']);
            }
        }

        if (!empty($this->settings['event_new_user_reg'])) {
            $user_registered  = array_key_exists('genero_cmp_registered', $_COOKIE) ? filter_var(wp_unslash($_COOKIE['genero_cmp_registered']), FILTER_VALIDATE_INT) : 0;

            if ($user_registered) {
                ?>

                <script>
                    if(window.dataLayer) {
                        window.dataLayer.push({'event' : 'generoCMP.userRegistered'})
                    }
                </script>

                <?php
                unset($_COOKIE['event_new_user_reg']);
            }
        }
    }

    public function enqueueAssets(): void
    {
        if (empty($this->settings['gtm_id'])) {
            return;
        }
        wp_enqueue_style("{$this->name}/css");
        wp_enqueue_script("{$this->name}/js");
    }

    public function getDataLayerData()
    {
        global $wp_query;

        $data_layer = [];

        if (empty($this->settings)) {
            return;
        }

        if (! empty($this->settings['incl_logged_in'])) {
            if (is_user_logged_in()) {
                $data_layer['visitorLoginState'] = 'logged-in';
            } else {
                $data_layer['visitorLoginState'] = 'logged-out';
            }
        }

        if (! empty($this->settings['incl_user_role']) || ! empty($this->settings['incl_user_email']) || ! empty($this->settings['incl_user_reg_date']) || ! empty($this->settings['incl_user_name'])) {
            $current_user = wp_get_current_user();

            if (! empty($this->settings['incl_user_role'])) {
                $data_layer['visitorType'] = ( 0 === $current_user->ID ? 'visitor-logged-out' : implode(',', $current_user->roles) );
            }

            if (! empty($this->settings['incl_user_email'])) {
                $data_layer['visitorEmail']     = ( empty($current_user->user_email) ? '' : $current_user->user_email );
                $data_layer['visitorEmailHash'] = ( empty($current_user->user_email) ? '' : hash('sha256', $current_user->user_email) );
            }

            if (! empty($this->settings['incl_user_reg_date'])) {
                $data_layer['visitorRegistrationDate'] = ( empty($current_user->user_registered) ? '' : strtotime($current_user->user_registered) );
            }

            if (! empty($this->settings['incl_user_name'])) {
                $data_layer['visitorUsername'] = ( empty($current_user->user_login) ? '' : $current_user->user_login );
            }
        }


        if (! empty($this->settings['incl_user_id'])) {
            $_userid = get_current_user_id();
            if ($_userid > 0) {
                $data_layer['visitorId'] = $_userid;
            }
        }

        if (! empty($this->settings['incl_post_title'])) {
            $data_layer['pageTitle'] = wp_strip_all_tags(wp_title('|', false, 'right'));
        }

        if (is_singular()) {
            if (! empty($this->settings['incl_post_type'])) {
                $data_layer['pagePostType']  = get_post_type();
                $data_layer['pagePostType2'] = 'single-' . get_post_type();
            }

            if (! empty($this->settings['incl_categories'])) {
                $_post_cats = get_the_category();
                if ($_post_cats) {
                    $data_layer['pageCategory'] = [];
                    foreach ($_post_cats as $_one_cat) {
                        $data_layer['pageCategory'][] = $_one_cat->slug;
                    }
                }
            }

            if (! empty($this->settings['incl_tags'])) {
                $_post_tags = get_the_tags();
                if ($_post_tags) {
                    $data_layer['pageAttributes'] = [];
                    foreach ($_post_tags as $_one_tag) {
                        $data_layer['pageAttributes'][] = $_one_tag->slug;
                    }
                }
            }

            if (! empty($this->settings['incl_author_id']) || ! empty($this->settings['incl_author_name'])) {
                $postuser = get_userdata($GLOBALS['post']->post_author);

                if (false !== $postuser) {
                    if (! empty($this->settings['incl_author_id'])) {
                        $data_layer['pagePostAuthorID'] = $postuser->ID;
                    }

                    if (! empty($this->settings['incl_author_name'])) {
                        $data_layer['pagePostAuthor'] = $postuser->display_name;
                    }
                }
            }

            if (! empty($this->settings['incl_post_date'])) {
                $data_layer['pagePostDate']        = get_the_date();
                $data_layer['pagePostDateYear']    = get_the_date('Y');
                $data_layer['pagePostDateMonth']   = get_the_date('m');
                $data_layer['pagePostDateDay']     = get_the_date('d');
                $data_layer['pagePostDateDayName'] = get_the_date('l');
                $data_layer['pagePostDateHour']    = get_the_date('H');
                $data_layer['pagePostDateMinute']  = get_the_date('i');
                $data_layer['pagePostDateIso']     = get_the_date('c');
                $data_layer['pagePostDateUnix']    = get_the_date('U');
            }

            if (! empty($this->settings['incl_post_terms'])) {
                $data_layer['pagePostTerms'] = array();

                $object_taxonomies = get_object_taxonomies(get_post_type());

                foreach ($object_taxonomies as $one_object_taxonomy) {
                    $post_taxonomy_values = get_the_terms($GLOBALS['post']->ID, $one_object_taxonomy);
                    if (is_array($post_taxonomy_values)) {
                        $data_layer['pagePostTerms'][ $one_object_taxonomy ] = array();
                        foreach ($post_taxonomy_values as $one_taxonomy_value) {
                            $data_layer['pagePostTerms'][ $one_object_taxonomy ][] = $one_taxonomy_value->name;
                        }
                    }
                }
            }
        }

        if (is_archive() || is_post_type_archive()) {
            if (! empty($this->settings['incl_post_type'])) {
                $data_layer['pagePostType'] = get_post_type();

                if (is_category()) {
                    $data_layer['pagePostType2'] = 'category-' . get_post_type();
                } elseif (is_tag()) {
                    $data_layer['pagePostType2'] = 'tag-' . get_post_type();
                } elseif (is_tax()) {
                    $data_layer['pagePostType2'] = 'tax-' . get_post_type();
                } elseif (is_author()) {
                    $data_layer['pagePostType2'] = 'author-' . get_post_type();
                } elseif (is_year()) {
                    $data_layer['pagePostType2'] = 'year-' . get_post_type();

                    if (! empty($this->settings['incl_post_date'])) {
                        $data_layer['pagePostDateYear'] = get_the_date('Y');
                    }
                } elseif (is_month()) {
                    $data_layer['pagePostType2'] = 'month-' . get_post_type();

                    if (! empty($this->settings['incl_post_date'])) {
                        $data_layer['pagePostDateYear']  = get_the_date('Y');
                        $data_layer['pagePostDateMonth'] = get_the_date('m');
                    }
                } elseif (is_day()) {
                    $data_layer['pagePostType2'] = 'day-' . get_post_type();

                    if (! empty($this->settings['incl_post_date'])) {
                        $data_layer['pagePostDate']      = get_the_date();
                        $data_layer['pagePostDateYear']  = get_the_date('Y');
                        $data_layer['pagePostDateMonth'] = get_the_date('m');
                        $data_layer['pagePostDateDay']   = get_the_date('d');
                    }
                } elseif (is_time()) {
                    $data_layer['pagePostType2'] = 'time-' . get_post_type();
                } elseif (is_date()) {
                    $data_layer['pagePostType2'] = 'date-' . get_post_type();

                    if (! empty($this->settings['incl_post_date'])) {
                        $data_layer['pagePostDate']      = get_the_date();
                        $data_layer['pagePostDateYear']  = get_the_date('Y');
                        $data_layer['pagePostDateMonth'] = get_the_date('m');
                        $data_layer['pagePostDateDay']   = get_the_date('d');
                    }
                }
            }

            if (! empty($this->settings['incl_categories']) && ( is_tax() || is_category() )) {
                $_post_cats                 = get_the_category();
                $data_layer['pageCategory'] = array();
                foreach ($_post_cats as $_one_cat) {
                    $data_layer['pageCategory'][] = $_one_cat->slug;
                }
            }

            if (! empty($this->settings['incl_author_id']) && is_author()) {
                global $authordata;
                $data_layer['pagePostAuthorID'] = isset($authordata->ID) ? $authordata->ID : 0;
            }

            if (! empty($this->settings['incl_author_name']) && is_author()) {
                $data_layer['pagePostAuthor'] = get_the_author();
            }
        }

        if (! empty($this->settings['incl_search_data']) && is_search()) {
            $data_layer['pagePostType']   = 'search-results';
            $data_layer['siteSearchTerm'] = get_search_query();
            $data_layer['siteSearchFrom'] = '';
            if (! empty($_SERVER['HTTP_REFERER'])) {
                $referer_url_parts = explode('?', esc_url_raw(wp_unslash($_SERVER['HTTP_REFERER'])));
                if (count($referer_url_parts) > 1) {
                    $data_layer['siteSearchFrom'] = $referer_url_parts[0] . '?' . rawurlencode($referer_url_parts[1]);
                } else {
                    $data_layer['siteSearchFrom'] = $referer_url_parts[0];
                }
            }
            $data_layer['siteSearchResults'] = $wp_query->post_count;
        }

        if (! empty($this->settings['incl_post_type']) && is_front_page()) {
            $data_layer['pagePostType'] = 'frontpage';
        }

        if (! empty($this->settings['incl_post_type']) && ! is_front_page() && is_home()) {
            $data_layer['pagePostType'] = 'bloghome';
        }

        if (! empty($this->settings['incl_post_count'])) {
            $data_layer['postCountOnPage'] = (int) $wp_query->post_count;
            $data_layer['postCountTotal']  = (int) $wp_query->found_posts;
        }

        if (! empty($this->settings['incl_post_id']) && is_singular()) {
            $data_layer['postID'] = (int) get_the_ID();
        }

        if (! empty($this->settings['incl_post_format']) && is_singular()) {
            $data_layer['postFormat'] = get_post_format() ? '' : 'standard';
        }

        return $data_layer;
    }

    public function setLoginCookie()
    {
        setcookie('genero_cmp_logged_in', '1', 0, '/', '', ( false !== strstr(get_option('home'), 'https:') ) && is_ssl(), true);
    }

    public function setRegisterCookie()
    {
        setcookie('genero_cmp_registered', '1', 0, '/', '', ( false !== strstr(get_option('home'), 'https:') ) && is_ssl(), true);
    }

    public function removeCookies()
    {
        if (array_key_exists('genero_cmp_logged_in', $_COOKIE)) {
            setcookie('genero_cmp_logged_in', '', -10000, '/', '', ( false !== strstr(get_option('home'), 'https:') ) && is_ssl(), true);
        }

        if (array_key_exists('genero_cmp_registered', $_COOKIE)) {
            setcookie('genero_cmp_registered', '', -10000, '/', '', ( false !== strstr(get_option('home'), 'https:') ) && is_ssl(), true);
        }
    }

    public function consentManager()
    {
        // if no tag manager id is set, do nothing
        if (empty($this->settings['gtm_id'])) {
            return;
        }

        render_block(['blockName' => 'gds/accordion']);
        render_block(['blockName' => 'gds/accordion-item']);
        render_block(['blockName' => 'core/button']);
        render_block(['blockName' => 'core/buttons']);

        $settings = [];
        $settings['lang'] = get_locale();
        $settings['consents'] = [
            [
                'id' => 'necessary',
                'label' => __('Necessary', 'genero-cmp'),
                'description' => __('These cookies are technically required for our core website to work properly, e.g. security functions or your cookie consent preferences.', 'genero-cmp'),
                'necessary' => true,
                'consent' => true,
            ],
            [
                'id' => 'statistics',
                'label' => __('Statistics', 'genero-cmp'),
                'description' => __('In order to improve our website going forward, we anonymously collect data for statistical and analytical purposes. With these cookies we can, for instance, monitor the number or duration of visits of specific pages of our website helping us in optimizing user experience.', 'genero-cmp'),
                'necessary' => false,
            ],
            [
                'id' => 'marketing',
                'label' => __('Marketing', 'genero-cmp'),
                'description' => __('These cookies help us in measuring and optimizing our marketing efforts.', 'genero-cmp'),
                'necessary' => false,
            ],
        ];

        $settings['consents'] = apply_filters('gds_cmp_consents', $settings['consents']);

        $hash = $settings['consents'];
        foreach ($hash as &$item) {
            unset($item['label']);
            unset($item['description']);
        }

        $this->view('consent-dialog.php', [
            'hash' => md5(json_encode($hash)),
            'settings' => $settings,
        ]);
    }

    protected function view(string $view, array $args = []): void
    {
        if (! get_template_part('genero-cmp/' . $view, null, $args)) {
            load_template(dirname(__DIR__) . "/templates/$view", true, $args);
        }
    }
}
