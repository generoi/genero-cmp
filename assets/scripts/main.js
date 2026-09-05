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
import cookieConsent, { needsConsent, showOnce } from './cookie-consent';
import {EVENT_CONSENT, hasConsent } from './api';

function ready(fn) {
  if (document.readyState !== 'loading') {
    return setTimeout(fn, 0)
  }
  document.addEventListener('DOMContentLoaded', fn);
}

window.gdsCmp = {
  evaluateTags,
  ...(window.gdsCmp || {}),
};

// Delete legacy wp-gds-cmp cookie
if (/gds-consent=\d,[01],[01],[01]/.test(document.cookie)) {
  const host = document.location.host.split('.').slice(-2).join('.');
  document.cookie = `gds-consent=; expires=Thu, 01 Jan 1970 00:00:00 GMT; domain=.${host}; path=/`;
  document.cookie = `gds-consent-hash=; expires=Thu, 01 Jan 1970 00:00:00 GMT; domain=.${host}; path=/`;
}

/*
 * Decide whether the dialog is needed as soon as the element upgrades, instead of
 * waiting for DOMContentLoaded.
 *
 * The dialog is normally the largest contentful element on the page, so the frame
 * it first paints in is the frame that decides LCP. Everything the decision needs
 * — the two cookies and the hash attribute — exists as soon as the element is
 * parsed, so there was never a reason to wait for the rest of the document.
 *
 * The full init() still runs on DOMContentLoaded: it binds the buttons and reads
 * the checkboxes, which are children the parser may not have reached yet.
 *
 * Measured on the front page of a production-sized site, 412px viewport at 4x CPU
 * throttling, ten runs per arm interleaved to spread drift:
 *
 *     LCP median            960ms -> 512ms
 *     dialog gets layout    338ms -> 172ms
 *     paired wins           8/10
 *
 * The LCP element is the dialog's own description paragraph in both arms — at
 * ~57,000px it is roughly four times the area of the page's <h1>, so nothing else
 * is in contention for it.
 *
 * Two things worth knowing before optimising this further:
 *
 * LCP equals FCP in every patched run. The dialog is ready at ~172ms and the first
 * paint does not happen until ~512ms, so it is no longer the dialog that decides
 * when the banner appears — it lands in the first paint the page manages. Moving
 * the chrome out of the shadow root to render it as plain HTML would take that
 * 172ms to ~0ms and would not move LCP at all; whatever is gating FCP is the thing
 * left to fix, and it is not this.
 *
 * Slow runs are slow from FCP onward, in both arms, and are the environment rather
 * than this change: the tail cases pair 1884ms LCP with 1884ms FCP, and the
 * unpatched arm has its own 4388/4244. An earlier six-run pass reported "6/6 paired
 * wins" and a reviewer refuted it; ten runs give 8/10, and the LCP-equals-FCP
 * reading is what separates a real stall from a slow page.
 */
customElements.whenDefined('gds-cmp-modal-dialog').then(() => {
  (function attempt() {
    const modal = document.querySelector('.cookie-consent');

    if (modal) {
      if (needsConsent(modal)) {
        showOnce(modal);
      }
      return;
    }

    // Script ran before the parser reached the dialog. Re-check next frame, and
    // give up once the document is parsed — init() below covers that case.
    if (document.readyState === 'loading') {
      requestAnimationFrame(attempt);
    }
  }());
});

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
      window.gdsCmp.show?.();
    });
  }

  // Attach open click listeners to all elements with data-gds-cmp-trigger="show|hide|withdraw"
  document.addEventListener('click', function ({target}) {
    if (target.matches('[data-gds-cmp-trigger]')) {
      const trigger = target.dataset.gdsCmpTrigger;
      window.gdsCmp[trigger]?.();
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

    let newTag;
    switch (el.tagName) {
      case 'SCRIPT':
        newTag = el.cloneNode(true);
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
