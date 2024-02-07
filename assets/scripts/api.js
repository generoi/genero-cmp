import { getCookie, gtag } from './utils';

/**
 * Cookie format: (version,consent1,consent2,consent3,consent4)  Example(String): "1,1,1,0,1"
 */
export const COOKIE_NAME = 'gds-consent';
export const EVENT_CONSENT = 'genero-cmp-accept';

function parseConsentString(consentString) {
  const values = consentString?.split(',') || [];
  values.shift(); // remove version number;
  return values;
}

export function getConsentData() {
  return parseConsentString(
    getCookie(COOKIE_NAME)
  );
}

export function hasDefinedConsent() {
  const consents = getConsentData();
  const consentHash = getCookie(COOKIE_NAME + '-hash');
  return consents.length && consentHash;
}


export function updateConsentMode() {
  setTimeout(googleConsentMode, 0);
  setTimeout(metaConsentMode, 0);
  setTimeout(tiktokConsentMode, 0);
}

export function googleConsentMode() {
  const consents = getConsentData();
  const consentState = {
    'analytics_storage': consents.length ? (consents[1] === '1' ? 'granted' : 'denied') : 'denied',
    'ad_storage': consents.length ? (consents[2] === '1' ? 'granted' : 'denied') : 'denied',
  }

  gtag('consent', 'update', consentState);
  gtag('set', {consents: consentState});
}

export function metaConsentMode() {
  if (!window.fbq) {
    return;
  }

  const consents = getConsentData();
  const hasConsent = consents.length && consents[1] === '1' && consents[2] === '1';
  if (hasConsent) {
    window.fbq('consent', 'grant');
  } else {
    window.fbq('consent', 'revoke');
  }
}

export function tiktokConsentMode() {
  if (!window.ttq) {
    return;
  }

  const consents = getConsentData();
  const hasConsent = consents.length && consents[1] === '1' && consents[2] === '1';
  if (hasConsent) {
    window.ttq.enableCookie();
  } else {
    window.ttq.disableCookie();
  }
}
