/**
 * @file
 * Browser version of plugin scripts, includign polyfills and external
 * libraries.
 */

import './modal-dialog';
import './accordion';
import './accordion-item';
import './toggle-button';
import './embed';
import cookieConsent from './cookie-consent';
import {EVENT_CONSENT, getConsentData, hasConsent } from './api';

function ready(fn) {
  if (document.readyState !== 'loading') {
    return setTimeout(fn, 0)
  }
  document.addEventListener('DOMContentLoaded', fn);
}

window.gdsCmp = {
  hasConsent,
  getConsentData,
  evaluateTags,
  ...(window.gdsCmp || {}),
};

ready(() => {
  // Initialize the cookie consent banenr and expose window.gdsCmp object.
  const cookieConsentContainer = document.querySelector('.cookie-consent');
  if (cookieConsentContainer) {
    window.gdsCmp = {
      ...window.gdsCmp,
      ...cookieConsent(cookieConsentContainer),
    };
  }

  // Attach open click listeners to all links with selector `.js-gds-cmp-show`
  for (const link of document.querySelectorAll('.js-gds-cmp-show')) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      window.gdCmp.show?.();
    });
  }

  // Attach open click listeners to all elements with data-gds-cmp-trigger="show|hide|withdraw"
  document.addEventListener('click', function ({target}) {
    if (target.matches('[data-gds-cmp-trigger]')) {
      const trigger = target.dataset.gdsCmpTrigger;
      window.gdCmp[trigger]?.();
    }
  }, {passive: true});
});

/**
 * Evaluate and initialize all script tags using data-gds-cmp-consent="" string
 *
 * @param {Node} context
 * @returns void
 */
function evaluateTags(context = document) {
  for (const el of context.querySelectorAll(`[data-gds-cmp-consent]`)) {
    const domConsents = el.dataset.gdsCmpConsent.split(' ').sort();

    if (!hasConsent(...domConsents)) {
      continue;
    }

    switch (el.tagName) {
      case 'SCRIPT':
        const newTag = el.cloneNode(true);
        newTag.type = 'text/javascript';
        delete newTag.dataset.gdsCmpConsent;
        el.replaceWith(newTag);
        break;
      case 'IMG':
      case 'VIDEO':
      case 'IFRAME':
        if (el.dataset.gdsCmpSrc) {
          el.src = el.dataset.gdsCmpSrc;
          delete el.dataset.gdsCmpSrc;
          delete el.dataset.gdsCmpConsent;
        }
        break;
    }
  }
}

// Add support for data-gds-cmp-consent="marketing analytics necessary" attributes on script, img, video and
// iframe elements.
window.addEventListener(EVENT_CONSENT, () => evaluateTags());

// Add has-gds-cmp-consent--{'marketing'|'analytics'|'necessary'} classes to the body element
window.addEventListener(EVENT_CONSENT, () => {
  const consentData = window.gdsCmp.getConsentData();

  for (const [consent, value] of Object.entries(consentData.consents)) {
    document.body.classList.toggle(`has-gds-cmp-consent--${consent}`, value);
  }
});
