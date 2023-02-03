<?php

add_action('wp_body_open', function () {

    // if no tag manager id is set, do nothing
    if (!$gtm_id = get_option('cmp_gtm_id', '')) {
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
            'id' => 'consent-necessary',
            'label' => __('Necessary', 'wp-gds-cmp'),
            'description' => __('These cookies are technically required for our core website to work properly, e.g. security functions or your cookie consent preferences.', 'wp-gds-cmp'),
            'necessary' => true,
            'consent' => true,
        ],
        [
            'id' => 'consent-statistics',
            'label' => __('Statistics', 'wp-gds-cmp'),
            'description' => __('In order to improve our website going forward, we anonymously collect data for statistical and analytical purposes. With these cookies we can, for instance, monitor the number or duration of visits of specific pages of our website helping us in optimizing user experience.', 'wp-gds-cmp'),
            'necessary' => false,
        ],
        [
            'id' => 'consent-marketing',
            'label' => __('Marketing', 'wp-gds-cmp'),
            'description' => __('These cookies help us in measuring and optimizing our marketing efforts.', 'wp-gds-cmp'),
            'necessary' => false,
        ],
    ];

    $settings['consents'] = apply_filters('gds_cmp_consents', $settings['consents']);

    $hash = md5(json_encode($settings['consents']));
    $configs = esc_html(wp_json_encode($settings));
    $body = '
    <modal-dialog
        class="cookie-consent"
        aria-labelledby="cc-heading"
        aria-descibedby="cc-description"
        persistent
        scroll-lock
        data-cookie-consent-hash="'. $hash .'"
        data-configs="'.$configs.'"
        >
        <h2 id="cc-heading">'. __('Cookie Preferences', 'gds') .'</h2>
        <p id="cc-description">
        '. __('We use cookies to provide a better user experience and personalised service. By consenting to the use of cookies, we can develop an even better service and will be able to provide content that is interesting to you. You are in control of your cookie preferences, and you may change them at any time. Read more about our cookies.') .'
        </p>
    ';

    if (count($settings['consents'])>0) {
        $body .= '
        <div id="cookie-settings" class="cookie-consent__cookies">

        <gds-accordion>
        ';
        foreach ($settings['consents'] as $consent) {
            $body .= '
            <gds-accordion-item>
                <label slot="label">
                    <input type="checkbox" name="cookie-consent" '. (($consent['necessary']) ? 'required' : '') .' '. ((@$consent['consent']) ? 'checked disabled' : '') . ' value="'. $consent['id'] .'">
                    '. $consent['label'] .'
                </label>
                <i slot="icon" class="fa fa-solid fa-chevron-down"></i>

                <p>'. $consent['description'] .'</p>
            </gds-accordion-item>
            ';
        }
        $body .= '
        </gds-accordion>
        </div>
        ';
    }
    $body .= '
        <div class="wp-block-buttons cookie-consent__buttons">
        <div class="wp-block-button is-style-outline" id="accept-selected-button">
            <button
            data-cookie-consent-accept-selected
            class="wp-block-button__link"
            >'.__('Accept selected cookies') .'</toggle-button>
        </div>

        <div class="wp-block-button is-style-outline">
            <toggle-button
            persistent
            aria-controls="cookie-settings accept-selected-button"
            class="wp-block-button__link"
            >'. __('Edit cookie settings') .'</toggle-button>
        </div>

        <div class="wp-block-button">
            <button
            data-cookie-consent-accept-all
            class="wp-block-button__link"
            >'. __('Accept all cookies') .'</button>
        </div>
        </div>
    </modal-dialog>';

    $body .= "
    <!-- Google Tag Manager -->
    <script>
		window.dataLayer = window.dataLayer || []
		// window.dataLayer = dataLayer
		;(function() {
		function loadGTM() {
			console.log('loadGTM exec');
			(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
			new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
			j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
			'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
			})(window,document,'script','dataLayer','".$gtm_id."');
		}
		var consentManager = document.querySelector('.cookie-consent')
		if (consentManager) {
			// TCF v2 API present, now check if CMP is loaded
			consentManager.addEventListener('accept', function(event) {
                console.log(event)
				// Push consent data to dataLayer for easy access in GTM.
				window.dataLayer.push({
					consentSetting: event.detail.setting,
				})
				// Now that we have all requred consent ready, we can finally load GTM.
				loadGTM()
			})
		}
		})()
    </script>
	<!-- End Google Tag Manager -->
    ";

    echo $body;
});
