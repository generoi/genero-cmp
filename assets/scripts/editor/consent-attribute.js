import { addFilter } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';
import { hasBlockSupport } from '@wordpress/blocks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { InspectorAdvancedControls } from '@wordpress/block-editor';
import { Button, ButtonGroup, BaseControl } from '@wordpress/components';

function isBlockSupported(blockType) {
  // Just default to whatever blocks support custom class names (most).
  return hasBlockSupport(blockType, 'customClassName', true);
}

function addAttribute(settings) {
  if (isBlockSupported(settings.name)) {
    settings.attributes = {
      ...settings.attributes,
      consentOptin: {
        type: 'bool',
        default: false,
      },
      consents: {
        type: 'array',
        items: {
          type: 'string',
        },
        default: [],
      },
    };
  }

  return settings;
}

const withDataAttributes = createHigherOrderComponent((BlockListBlock) => {
  return (props) => {
    const { name, attributes } = props;

    if (isBlockSupported(name) && attributes.consents?.length) {
      const mode = attributes?.consentOptin ? 'optin' : 'optout';

      let wrapperProps = props.wrapperProps;
      wrapperProps = {
        ...wrapperProps,
        [`data-consent-${mode}`]: attributes.consents.join(' '),
      };

      return <BlockListBlock { ...props } wrapperProps={ wrapperProps } />;
    }
    return <BlockListBlock { ...props } />;
  };
});

const withInspectorControl = createHigherOrderComponent((BlockEdit) => {
  return (props) => {
    if (isBlockSupported(props.name) && props.isSelected) {
      const consentsAvailable = window.generoCmp.consents;

      return (
        <>
          <BlockEdit { ...props } />
          <InspectorAdvancedControls>
            <BaseControl id="consent-settings" label={ __('Consent settings') }>
              <div style={ {marginBottom: '1rem'}}>
                <ButtonGroup>
                  <Button
                    isSmall
                    isPressed={ props.attributes?.consentOptin  }
                    onClick={ () => props.setAttributes({consentOptin: true}) }
                  >
                    { __('Visible') }
                  </Button>
                  <Button
                    isSmall
                    isPressed={ ! props.attributes?.consentOptin }
                    onClick={ () => props.setAttributes({consentOptin: false}) }
                  >
                    { __('Hidden') }
                  </Button>
                </ButtonGroup>
                <p>when user has given all consents below</p>
              </div>
              <div>
                <ButtonGroup>
                  { consentsAvailable.map(({id, label}) => {
                    const onClick = () => {
                      const consents = props.attributes.consents || [];

                      props.setAttributes({
                        consents: consents.includes(id)
                          ? consents.filter((consent) => consent !== id)
                          : consents.concat([id]),
                      });
                    };

                    return (
                      <Button
                        isSmall
                        isPressed={ props.attributes.consents?.includes?.(id) }
                        onClick={ onClick }
                      >
                        {label}
                      </Button>
                    );
                  }) }
                </ButtonGroup>
              </div>
            </BaseControl>
          </InspectorAdvancedControls>
        </>
      );
    }
    return <BlockEdit { ...props } />;
  };
}, 'withInspectorControl');

function addSaveProps(extraProps, blockType, attributes) {
  if (isBlockSupported(blockType) && attributes.consents.length) {
      const mode = attributes?.consentOptin ? 'optin' : 'optout';
      extraProps[`data-consent-${mode}`] = attributes.consents.join(' ');
  }

  return extraProps;
}

addFilter(
  'blocks.registerBlockType',
  'genero-cmp-consent/attribute',
  addAttribute
);
addFilter(
  'editor.BlockListBlock',
  'genero-cmp-consent/with-data-attributes',
  withDataAttributes
);
addFilter(
  'editor.BlockEdit',
  'genero-cmp-consent/with-inspector-control',
  withInspectorControl
);
addFilter(
  'blocks.getSaveContent.extraProps',
  'genero-cmp-consent/save-props',
  addSaveProps
);
