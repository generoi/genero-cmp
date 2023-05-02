/**
 * @file
 * Browser version of plugin scripts, includign polyfills and external
 * libraries.
 */

import './modal-dialog';
import './accordion';
import './accordion-item';
import './toggle-button';
import cookieConsent, {googleConsentMode} from './cookie-consent';

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
    cookieConsent(cookieConsentContainer);
  }
});
