<?php

namespace GeneroWP\GeneroCmp\Integrations;

use GeneroWP\GeneroCmp\Plugin;
use WP_Post;
use WP_Post_Type;
use WP_Term;
use WP_User;

class DataLayer
{
    protected array $settings;

    public function __construct(
        protected Plugin $plugin,
    ) {
        $this->settings = $plugin->settings();
        add_filter('gds_cmp_datalayer', [$this, 'getDataLayerData']);
        add_action('wp_footer', [$this, 'wpFooter']);
        add_action('init', [$this, 'removeCookies']);

        if (!empty($this->settings['event_user_logged_in'])) {
            add_action('wp_login', [$this, 'setLoginCookie']);
        }

        if (!empty($this->settings['event_new_user_reg'])) {
            add_action('user_register', [$this, 'setRegisterCookie']);
        }
    }

    public function getDataLayerData(array $data_layer): array
    {
        global $wp_query;
        if (empty($this->settings)) {
            return $data_layer;
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

            $object = get_queried_object();
            $data_layer['pageName'] = match (true) {
                $object instanceof WP_Post => $object->post_title,
                $object instanceof WP_Term => $object->name,
                $object instanceof WP_Post_Type => $object->name,
                $object instanceof WP_User => $object->display_name,
                default => $data_layer['pageTitle'],
            };
        }

        if (is_singular()) {
            if (! empty($this->settings['incl_post_type'])) {
                $data_layer['pagePostType']  = get_post_type();
                $data_layer['pagePostType2'] = 'single-' . get_post_type();
            }

            if (! empty($this->settings['incl_categories'])) {
                $_post_cats = get_the_category();
                if ($_post_cats) {
                    $_post_cats = $this->sortTerms($_post_cats, 'category', get_queried_object_id());
                    $data_layer['pageCategory'] = [];
                    foreach ($_post_cats as $_one_cat) {
                        $data_layer['pageCategory'][] = $_one_cat->slug;
                    }
                }
            }

            if (! empty($this->settings['incl_tags'])) {
                $_post_tags = get_the_tags();
                if ($_post_tags) {
                    $_post_tags = $this->sortTerms($_post_tags, 'post_tag', get_queried_object_id());
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
                        $post_taxonomy_values = $this->sortTerms($post_taxonomy_values, $one_object_taxonomy, get_queried_object_id());
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

    public function wpFooter(): void
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

    protected function sortTerms(array $terms, string $taxonomy, int $postId): array
    {
        $primaryTermId = match (true) {
            function_exists('the_seo_framework') => the_seo_framework()->data()->plugin()->post()->get_primary_term_id($postId, $taxonomy),
            function_exists('yoast_get_primary_term_id') => yoast_get_primary_term_id($taxonomy, $postId),
            default => 0,
        };


        if ($primaryTermId) {
            usort($terms, function ($a, $b) use ($primaryTermId) {
                $aId = $a instanceof WP_Term ? $a->term_id : $a;
                $bId = $a instanceof WP_Term ? $b->term_id : $b;

                if ($aId === $primaryTermId) {
                    return -1;
                }
                if ($bId === $primaryTermId) {
                    return 1;
                }
                return 0;
            });
        }

        return $terms;
    }

    public function setLoginCookie(): void
    {
        setcookie('genero_cmp_logged_in', '1', 0, '/', '', ( false !== strstr(get_option('home'), 'https:') ) && is_ssl(), true);
    }

    public function setRegisterCookie(): void
    {
        setcookie('genero_cmp_registered', '1', 0, '/', '', ( false !== strstr(get_option('home'), 'https:') ) && is_ssl(), true);
    }

    public function removeCookies(): void
    {
        if (array_key_exists('genero_cmp_logged_in', $_COOKIE)) {
            setcookie('genero_cmp_logged_in', '', -10000, '/', '', ( false !== strstr(get_option('home'), 'https:') ) && is_ssl(), true);
        }

        if (array_key_exists('genero_cmp_registered', $_COOKIE)) {
            setcookie('genero_cmp_registered', '', -10000, '/', '', ( false !== strstr(get_option('home'), 'https:') ) && is_ssl(), true);
        }
    }
}
