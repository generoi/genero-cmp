<gds-cmp-modal-dialog
    class="cookie-consent"
    aria-labelledby="cc-heading"
    aria-describedby="cc-description"
    persistent
    scroll-lock
    data-cookie-consent-hash="<?php echo esc_attr($args['hash']); ?>"
    data-configs="<?php echo esc_html(wp_json_encode($args['settings'])); ?>"
>
    <h2 id="cc-heading"><?php echo esc_html(__('Cookie Preferences', 'genero-cmp')); ?></h2>
    <p id="cc-description">
        <?php echo esc_html(__('We use cookies to provide a better user experience and personalised service. By consenting to the use of cookies, we can develop an even better service and will be able to provide content that is interesting to you. You are in control of your cookie preferences, and you may change them at any time. Read more about our cookies.', 'genero-cmp')); ?>
    </p>

    <?php if (count($args['settings']['consents']) > 0) : ?>
        <div id="cookie-settings" class="cookie-consent__cookies">
            <gds-cmp-accordion>
                <?php foreach ($args['settings']['consents'] as $consent) : ?>
                    <gds-cmp-accordion-item>
                        <label slot="label">
                            <input
                                type="checkbox"
                                name="cookie-consent"
                                <?php if ($consent->necessary) : ?>
                                    required
                                <?php endif; ?>
                                <?php if ($consent->consent) : ?>
                                    checked
                                    disabled
                                <?php endif; ?>
                                value="<?php echo esc_attr($consent->id); ?>"
                            >
                            <?php echo esc_html($consent->label); ?>
                        </label>

                        <i slot="icon" class="fa fa-solid fa-chevron-down"></i>
                        <p><?php echo esc_html($consent->description); ?></p>
                    </gds-cmp-accordion-item>
                <?php endforeach; ?>
            </gds-cmp-accordion>
        </div>
    <?php endif; ?>
    <div class="wp-block-buttons is-layout-flex cookie-consent__buttons">
        <div class="wp-block-button is-style-outline" id="accept-selected-button">
            <button
                data-cookie-consent-accept-selected
                class="wp-block-button__link"
            ><?php echo esc_html(__('Accept selected cookies', 'genero-cmp')); ?></button>
        </div>

        <div class="wp-block-button is-style-outline">
            <gds-cmp-toggle-button
                persistent
                aria-controls="cookie-settings accept-selected-button"
                class="wp-block-button__link"
            ><?php echo esc_html(__('Edit cookie settings', 'genero-cmp')); ?></gds-cmp-toggle-button>
        </div>

        <div class="wp-block-button is-style-outline">
            <button
                data-cookie-consent-decline-all
                class="wp-block-button__link"
            ><?php echo esc_html(__('Decline all', 'genero-cmp')); ?></button>
        </div>

        <div class="wp-block-button">
            <button
                data-cookie-consent-accept-all
                class="wp-block-button__link"
            ><?php echo esc_html(__('Accept all cookies', 'genero-cmp')); ?></button>
        </div>
    </div>
</gds-cmp-modal-dialog>
