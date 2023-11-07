/**
 * @file
 * Browser version of plugin scripts, includign polyfills and external
 * libraries.
 */

import './modal-dialog';
import './accordion';
import './accordion-item';
import './toggle-button';
import cookieConsent, {EVENT_CONSENT, getConsentData, googleConsentMode} from './cookie-consent';

googleConsentMode();

function ready(fn) {
  if (document.readyState !== 'loading') {
    return setTimeout(fn, 0)
  }
  document.addEventListener('DOMContentLoaded', fn);
}

ready(() => {
  let cookieConsentContainer = document.querySelector('.cookie-consent');
  if (cookieConsentContainer) {
    window.generoCmp = {
      getConsentData,
      evaluateTags,
    };
    cookieConsent(cookieConsentContainer);
  }

  for (const link of document.querySelectorAll('.js-show-cookieconsent')) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      cookieConsentContainer.show();
    });
  }
});

function evaluateTags(context = document) {
  const consents = getConsentData();
  const userConsents = [
    consents.length && consents[1] === '1' ? 'statistics' : false,
    consents.length && consents[2] === '1' ? 'marketing' : false,
  ].filter(Boolean).sort();

  for (const el of context.querySelectorAll(`[data-cmp-consent]`)) {
    const domConsents = el.dataset.cmpConsent.split(' ').sort();

    const hasAllConsents = domConsents.length === userConsents.length
      && domConsents.every((consent, idx) => consent === userConsents[idx]);

    if (!hasAllConsents) {
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

window.addEventListener(EVENT_CONSENT, () => evaluateTags());

window.addEventListener(EVENT_CONSENT, () => {
  const consents = getConsentData();
  const consentData = {
    'statistics': consents.length ? consents[1] === '1' : false,
    'marketing': consents.length ? consents[2] === '1' : false,
  }

  for (const [consent, value] of Object.entries(consentData)) {
    document.body.classList.toggle(`has-genero-cmp-consent--${consent}`, value);
  }
});
