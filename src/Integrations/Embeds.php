<?php

namespace GeneroWP\GeneroCmp\Integrations;

use GeneroWP\GeneroCmp\Models\Consent;
use GeneroWP\GeneroCmp\Plugin;

/**
 * @see https://www.cookieyes.com/documentation/features/integrations/facebook-pixel-consent-mode/
 */
class Embeds
{
    public function __construct(
        protected Plugin $plugin,
    ) {
        add_filter('render_block', [$this, 'changeYoutubeEmbedDomain'], 10, 2);

        if (! empty($this->plugin->settings('embeds_require_consent'))) {
            add_filter('the_content', [$this, 'blockEmbeds'], 1000);
        }
    }

    /**
     * Override youtube embed blocks with no-cookie parameter
     */
    public function changeYoutubeEmbedDomain(string $block_content, array $block): string
    {
        if (is_admin()) {
            return $block_content;
        }

        if ($block['blockName'] === 'core-embed/youtube') {
            $block_content = str_replace('youtube.com', 'youtube-nocookie.com', $block_content);
        }

        return $block_content;
    }

    public function blockEmbeds(string $content): string
    {
        $description = __('Viewing this embed loads content from a third party and thus requires <em>%s</em> consent.', 'genero-cmp');
        $button = __('Modify preferences', 'genero-cmp');

        $content = preg_replace_callback(
            '~<(iframe|youtube-embed)(.*?)>(.*?)</(iframe|youtube-embed)>~is',
            function (array $matches) use ($description, $button) {
                [$tag, $element, $attributes, $innerContent] = $matches;

                $consents = match (true) {
                    str_contains($tag, 'youtube') => [Consent::MARKETING, Consent::STATISTICS],
                    str_contains($tag, 'google.com/maps') => [Consent::MARKETING, Consent::STATISTICS],
                    default => [],
                };

                $consents = apply_filters('gds_cmp_embed_consents', $consents, $tag);
                if (! $consents) {
                    return $tag;
                }

                if (count($consents) === 1 && $consents[0] === Consent::NECESSARY) {
                    return $tag;
                }

                $consentLabels = array_map(
                    fn (string $consentId) => $this->plugin->getConsentCategory($consentId)?->label,
                    $consents,
                );
                $consentLabels = array_filter($consentLabels);
                if (! $consentLabels) {
                    return $tag;
                }

                return sprintf(
                    '<gds-cmp-embed as="%s" consent="%s" description="%s" button="%s"%s>%s</gds-cmp-embed>',
                    $matches[1],
                    implode(' ', $consents),
                    sprintf($description, implode(', ', $consentLabels)),
                    $button,
                    $matches[2],
                    $matches[3],
                );
            },
            $content,
        );

        return $content;
    }
}
