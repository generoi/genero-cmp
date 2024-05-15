<?php

namespace GeneroWP\GeneroCmp;

class Admin
{
    public $settings_title;
    public $text_domain;

    public function __construct(
        public string $name,
        public Plugin $plugin,
    ) {
        $this->settings_title = $name;
        $this->text_domain = $name;

        add_action('admin_menu', [$this, 'addSettingsMenu'], 100);
        add_filter('admin_init', [$this, 'registerSettings']);
    }

    public function addSettingsMenu()
    {
        add_options_page(
            __('Genero CMP Settings', $this->text_domain),
            __('Genero CMP', $this->text_domain),
            'manage_options',
            $this->settings_title,
            [$this, 'settingsPage']
        );
    }

    public function settingsPage()
    {
        ?>
        <div class="wrap">
            <h2><?php esc_html_e('Genero CMP Settings', $this->text_domain); ?></h2>

            <form action='options.php' method='post'>
                <?php
                settings_fields($this->settings_title);
                do_settings_sections($this->settings_title);
                submit_button();
                ?>
            </form>
        </div>
        <?php
    }

    public function registerSettings()
    {
        register_setting(
            $this->settings_title,
            $this->settings_title,
            [$this, 'sanitizeSettings']
        );

        add_settings_section(
            $this->settings_title . '_general',
            __('General', $this->text_domain),
            '__return_false',
            $this->settings_title
        );

        add_settings_field(
            $this->settings_title . '_gtm_id',
            __('Google Tag Manager ID', $this->text_domain),
            [$this, 'renderText'],
            $this->settings_title,
            $this->settings_title . '_general',
            [
                'key' => 'gtm_id',
            ]
        );

        add_settings_field(
            $this->settings_title . '_container_off',
            __('Container code OFF', $this->text_domain),
            [$this, 'renderCheckbox'],
            $this->settings_title,
            $this->settings_title . '_general',
            [
                'key' => 'container_off',
                'label' => __('Remove container code but leave data layer codes working.', $this->text_domain),
                'description' => __('This should be only used in specific cases where you need to place the container code manually or using another tool.', $this->text_domain),
            ]
        );

        add_settings_field(
            $this->settings_title . '_embeds_require_consent',
            __('Block embeds', $this->text_domain),
            [$this, 'renderCheckbox'],
            $this->settings_title,
            $this->settings_title . '_general',
            [
                'key' => 'embeds_require_consent',
                'label' => __('Block embeds until consent has been given', $this->text_domain),
                'description' => __('YouTube videos require "marketing" consent while other iframes require "functional" (if enabled).', $this->text_domain),
            ]
        );

        add_settings_section(
            $this->settings_title . '_data_posts',
            __('Posts Data', $this->text_domain),
            '__return_false',
            $this->settings_title
        );

        add_settings_field(
            $this->settings_title . '_incl_post_type',
            __('Post Type of current post/archive', $this->text_domain),
            [$this, 'renderCheckbox'],
            $this->settings_title,
            $this->settings_title . '_data_posts',
            [
                'key' => 'incl_post_type',
                'label' => __('Include the type of the current post or archive page (post, page or any custom post type).', $this->text_domain),
            ]
        );

        add_settings_field(
            $this->settings_title . '_incl_categories',
            __('Category list of current post/archive', $this->text_domain),
            [$this, 'renderCheckbox'],
            $this->settings_title,
            $this->settings_title . '_data_posts',
            [
                'key' => 'incl_categories',
                'label' => __('Include the category names of the current post or archive page.', $this->text_domain),
            ]
        );

        add_settings_field(
            $this->settings_title . '_incl_tags',
            __('Tags of current post', $this->text_domain),
            [$this, 'renderCheckbox'],
            $this->settings_title,
            $this->settings_title . '_data_posts',
            [
                'key' => 'incl_tags',
                'label' => __('Include the tags of the current post.', $this->text_domain),
            ]
        );

        add_settings_field(
            $this->settings_title . '_incl_author_id',
            __('Post author ID', $this->text_domain),
            [$this, 'renderCheckbox'],
            $this->settings_title,
            $this->settings_title . '_data_posts',
            [
                'key' => 'incl_author_id',
                'label' => __('Include the ID of the author on the current post or author page.', $this->text_domain),
            ]
        );

        add_settings_field(
            $this->settings_title . '_incl_author_name',
            __('Post author name', $this->text_domain),
            [$this, 'renderCheckbox'],
            $this->settings_title,
            $this->settings_title . '_data_posts',
            [
                'key' => 'incl_author_name',
                'label' => __('Include the name of the author on the current post or author page.', $this->text_domain),
            ]
        );

        add_settings_field(
            $this->settings_title . '_incl_post_date',
            __('Post date', $this->text_domain),
            [$this, 'renderCheckbox'],
            $this->settings_title,
            $this->settings_title . '_data_posts',
            [
                'key' => 'incl_post_date',
                'label' => __('Include the date of the current post. This will include 4 dataLayer variables: full date, post year, post month, post date.', $this->text_domain),
            ]
        );

        add_settings_field(
            $this->settings_title . '_incl_post_title',
            __('Post title', $this->text_domain),
            [$this, 'renderCheckbox'],
            $this->settings_title,
            $this->settings_title . '_data_posts',
            [
                'key' => 'incl_post_title',
                'label' => __('Include the title of the current post.', $this->text_domain),
            ]
        );

        add_settings_field(
            $this->settings_title . '_incl_post_count',
            __('Post count', $this->text_domain),
            [$this, 'renderCheckbox'],
            $this->settings_title,
            $this->settings_title . '_data_posts',
            [
                'key' => 'incl_post_count',
                'label' => __('Include the count of the posts currently shown on the page and the total number of posts in the category/tag/any taxonomy.', $this->text_domain),
            ]
        );

        add_settings_field(
            $this->settings_title . '_incl_post_id',
            __('Post ID', $this->text_domain),
            [$this, 'renderCheckbox'],
            $this->settings_title,
            $this->settings_title . '_data_posts',
            [
                'key' => 'incl_post_id',
                'label' => __('Include the post id.', $this->text_domain),
            ]
        );

        add_settings_field(
            $this->settings_title . '_incl_post_format',
            __('Post format', $this->text_domain),
            [$this, 'renderCheckbox'],
            $this->settings_title,
            $this->settings_title . '_data_posts',
            [
                'key' => 'incl_post_format',
                'label' => __('Include the post format.', $this->text_domain),
            ]
        );

        add_settings_field(
            $this->settings_title . '_incl_post_terms',
            __('Post terms', $this->text_domain),
            [$this, 'renderCheckbox'],
            $this->settings_title,
            $this->settings_title . '_data_posts',
            [
                'key' => 'incl_post_terms',
                'label' => __('Include taxonomy values associated with a given post.', $this->text_domain),
            ]
        );

        add_settings_section(
            $this->settings_title . '_data_search',
            __('Search Data', $this->text_domain),
            '__return_false',
            $this->settings_title
        );

        add_settings_field(
            $this->settings_title . '_incl_search_data',
            __('Search data', $this->text_domain),
            [$this, 'renderCheckbox'],
            $this->settings_title,
            $this->settings_title . '_data_search',
            [
                'key' => 'incl_search_data',
                'label' => __('Include the search term, referring page URL and number of results on the search page.', $this->text_domain),
            ]
        );

        add_settings_section(
            $this->settings_title . '_data_visitors',
            __('Visitors Data', $this->text_domain),
            '__return_false',
            $this->settings_title
        );

        add_settings_field(
            $this->settings_title . '_incl_logged_in',
            __('Logged in status', $this->text_domain),
            [$this, 'renderCheckbox'],
            $this->settings_title,
            $this->settings_title . '_data_visitors',
            [
                'key' => 'incl_logged_in',
                'label' => __('Include whether there is a logged in user on your website.', $this->text_domain),
            ]
        );

        add_settings_field(
            $this->settings_title . '_incl_user_role',
            __('Logged in user role', $this->text_domain),
            [$this, 'renderCheckbox'],
            $this->settings_title,
            $this->settings_title . '_data_visitors',
            [
                'key' => 'incl_user_role',
                'label' => __('Include the role of the logged in user.', $this->text_domain),
            ]
        );

        add_settings_field(
            $this->settings_title . '_incl_user_id',
            __('Logged in user ID', $this->text_domain),
            [$this, 'renderCheckbox'],
            $this->settings_title,
            $this->settings_title . '_data_visitors',
            [
                'key' => 'incl_user_id',
                'label' => __('Include the ID of the logged in user.', $this->text_domain),
            ]
        );

        add_settings_field(
            $this->settings_title . '_incl_user_name',
            __('Logged in user name', $this->text_domain),
            [$this, 'renderCheckbox'],
            $this->settings_title,
            $this->settings_title . '_data_visitors',
            [
                'key' => 'incl_user_name',
                'label' => __('Include the ID of the logged in user.', $this->text_domain),
            ]
        );

        add_settings_field(
            $this->settings_title . '_incl_user_email',
            __('Logged in user email', $this->text_domain),
            [$this, 'renderCheckbox'],
            $this->settings_title,
            $this->settings_title . '_data_visitors',
            [
                'key' => 'incl_user_email',
                'label' => __('Include the email address of the logged in user.', $this->text_domain),
            ]
        );

        add_settings_field(
            $this->settings_title . '_incl_user_reg_date',
            __('Logged in user creation date', $this->text_domain),
            [$this, 'renderCheckbox'],
            $this->settings_title,
            $this->settings_title . '_data_visitors',
            [
                'key' => 'incl_user_reg_date',
                'label' => __('Include the date of creation (registration) of the logged in user.', $this->text_domain),
            ]
        );

        add_settings_section(
            $this->settings_title . '_events',
            __('Events', $this->text_domain),
            '__return_false',
            $this->settings_title
        );

        add_settings_field(
            $this->settings_title . '_event_new_user_reg',
            __('New user registration', $this->text_domain),
            [$this, 'renderCheckbox'],
            $this->settings_title,
            $this->settings_title . '_events',
            [
                'key' => 'event_new_user_reg',
                'label' => __('Include an event event when a new user registration has been completed on the frontend of your site (admin events not included).', $this->text_domain),
            ]
        );

        add_settings_field(
            $this->settings_title . '_event_user_logged_in',
            __('User logged in', $this->text_domain),
            [$this, 'renderCheckbox'],
            $this->settings_title,
            $this->settings_title . '_events',
            [
                'key' => 'event_user_logged_in',
                'label' => __('Include an event when an existing user has been logged in on the frontend of your site (admin events not included).', $this->text_domain),
            ]
        );

        add_settings_section(
            $this->settings_title . '_plugins',
            __('Plugins', $this->text_domain),
            '__return_false',
            $this->settings_title
        );

        add_settings_field(
            $this->settings_title . '_plugin_ctx_feed_facebook_pixel_off',
            __('CTX Feed - Fb Pixel OFF', $this->text_domain),
            [$this, 'renderCheckbox'],
            $this->settings_title,
            $this->settings_title . '_plugins',
            [
                'key' => 'plugin_ctx_feed_facebook_pixel_off',
                'label' => __('Check to remove Facebook Pixel code added by CTX Feed plugin.', $this->text_domain),
            ]
        );

        add_settings_field(
            $this->settings_title . '_plugin_gravity_forms_google_analytics_event_tracking_container_off',
            __('Event Tracking for Gravity Forms - GTM Container OFF', $this->text_domain),
            [$this, 'renderCheckbox'],
            $this->settings_title,
            $this->settings_title . '_plugins',
            [
                'key' => 'plugin_gravity_forms_google_analytics_event_tracking_container_off',
                'label' => __('Check to remove GTM container code added by Event Tracking for Gravity Forms plugin.', $this->text_domain),
            ]
        );
    }

    public function renderText($args)
    {
        if (empty($args['key'])) {
            return;
        }

        $settings = get_option($this->settings_title) ?: $this->getDefaultSettings();

        $value = $settings[$args['key']] ?? '';

        if (! $value && isset($args['default'])) {
            $value = $args['default'];
        }
        ?>

        <input type="text"
               class="<?= $args['class'] ?? ''; ?>"
               id="<?= sprintf('%1$s_%2$s', $this->text_domain, $args['key']); ?>"
               name="<?= sprintf('%1$s[%2$s]', $this->text_domain, $args['key']); ?>"
               value="<?= esc_attr($value); ?>"
        >

        <?php if ($args['description'] ?? false) : ?>
        <p class="description"><?= $args['description']; ?></p>
        <?php endif;
    }

    public function renderCheckbox($args)
    {
        if (empty($args['key'])) {
            return;
        }

        $settings = get_option($this->settings_title) ?: $this->getDefaultSettings();
        $value = $settings[$args['key']] ?? '';
        ?>

        <label for="<?= sprintf('%1$s_%2$s', $this->text_domain, $args['key']); ?>">
            <input type="checkbox"
                   id="<?= sprintf('%1$s_%2$s', $this->text_domain, $args['key']); ?>"
                   name="<?= sprintf('%1$s[%2$s]', $this->text_domain, $args['key']); ?>"
                   value="1"
                <?php checked('1', $value); ?>
            >
            <?= $args['label'] ?? '' ?>
        </label>

        <?php if ($args['description'] ?? false) : ?>
        <p class="description"><?= $args['description']; ?></p>
        <?php endif;
    }

    public function getDefaultSettings(): array
    {
        return [
            'gtm_id' => '',
            'container_off' => 0,
            'embeds_require_consent' => 0,
            'incl_post_type' => 1,
            'incl_categories' => 1,
            'incl_tags' => 1,
            'incl_author_id' => 0,
            'incl_author_name' => 0,
            'incl_post_date' => 0,
            'incl_post_title' => 0,
            'incl_post_count' => 0,
            'incl_post_id' => 1,
            'incl_post_format' => 1,
            'incl_post_terms' => 1,
            'incl_search_data' => 1,
            'incl_logged_in' => 1,
            'incl_user_role' => 1,
            'incl_user_id' => 0,
            'incl_user_name' => 0,
            'incl_user_email' => 0,
            'incl_user_reg_date' => 0,
            'event_new_user_reg' => 1,
            'event_user_logged_in' => 1,
            'plugin_ctx_feed_facebook_pixel_off' => 0,
            'plugin_gravity_forms_google_analytics_event_tracking_container_off' => 0,
        ];
    }

    public function sanitizeSettings($fields): array
    {
        $defaults = $this->getDefaultSettings();

        foreach ($defaults as $key => $val) {
            switch ($key) {
                case 'gtm_id':
                    $fields[$key] = esc_attr($fields[$key]);
                    break;
                default:
                    $defaults[$key] = isset($fields[$key]) ? absint($val) : 0;
            }
        }

        return wp_parse_args($fields, $defaults);
    }
}
