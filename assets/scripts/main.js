/**
 * @file
 * Browser version of plugin scripts, includign polyfills and external
 * libraries.
 */

import './modal-dialog';
import './accordion';
import './accordion-item';
import './toggle-button';
import cookieConsent from './cookie-consent';
import {EVENT_CONSENT, getConsentData, hasConsent } from './api';

function ready(fn) {
  if (document.readyState !== 'loading') {
    return setTimeout(fn, 0)
  }
  document.addEventListener('DOMContentLoaded', fn);
}

ready(() => {
  // Initialize the cookie consent banenr and expose window.generoCmp object.
  const cookieConsentContainer = document.querySelector('.cookie-consent');
  if (cookieConsentContainer) {
    window.generoCmp = {
      ...cookieConsent(cookieConsentContainer),
      evaluateTags,
    };
  }

  // Attach open click listeners to all links with selector `.js-show-cookieconsent`
  for (const link of document.querySelectorAll('.js-show-cookieconsent')) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      cookieConsentContainer.show();
    });
  }
});

/**
 * Evaluate and initialize all script tags using data-cmp-consent="" string
 *
 * @param {Node} context
 * @returns void
 */
function evaluateTags(context = document) {
  for (const el of context.querySelectorAll(`[data-cmp-consent]`)) {
    const domConsents = el.dataset.cmpConsent.split(' ').sort();

    if (!hasConsent(...domConsents)) {
      continue;
    }

    switch (el.tagName) {
      case 'SCRIPT':
        const newTag = el.cloneNode(true);
        newTag.type = 'text/javascript';
        delete newTag.dataset.cmpConsent;
        el.replaceWith(newTag);
        break;
      case 'IMG':
      case 'VIDEO':
      case 'IFRAME':
        if (el.dataset.cmpSrc) {
          el.src = el.dataset.cmpSrc;
          delete el.dataset.cmpSrc;
          delete el.dataset.cmpConsent;
        }
        break;
    }
  }
}

// Add support for data-cmp-consent="marketing analytics necessary" attributes on script, img, video and
// iframe elements.
window.addEventListener(EVENT_CONSENT, () => evaluateTags());

// Add has-genero-cmp-consent--{'marketing'|'analytics'|'necessary'} classes to the body element
window.addEventListener(EVENT_CONSENT, () => {
  const consentData = getConsentData();

  for (const [consent, value] of Object.entries(consentData.consents)) {
    document.body.classList.toggle(`has-genero-cmp-consent--${consent}`, value);
  }
});
