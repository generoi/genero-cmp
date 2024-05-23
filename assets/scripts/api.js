import { getCookie, gtag, isObject } from './utils';

/**
 * Cookie format: {consents: {'necessary': true, 'analytics': true, 'marketing': false}, version: 1}
 */
export const COOKIE_NAME = 'gds-consent';
export const EVENT_CONSENT = 'gds-cmp.consent';

export const NECESSARY_STORAGE_CONSENT = 'necessary';
export const PREFERENCES_STORAGE_CONSENT = 'preferences';
export const AD_STORAGE_CONSENT = 'marketing';
export const ANALYTICS_STORAGE_CONSENT = 'statistics';

export const NECESSARY_COOKIES = [
  COOKIE_NAME,
  `${COOKIE_NAME}-hash`,
];

/**
 * @typedef {('necessary'|'preferences'|'marketing'|'statistics')} Consent
 */

/**
 * @typedef {object} ConsentData
 * @property {Consents} consents
 * @property {number|undefined} version
 */

/**
 * @typedef {object} Consents
 * @property {boolean} necessary
 * @property {boolean} analytics
 * @property {boolean} marketing
 */

/**
 * Return if user has granted the passed consents.
 *
 * @param {...Consent} consents Consent name eg. 'necessary`, `preferences`, `marketing`, `statistics`.
 * @returns {boolean} if user has granted all the consents
 */
export function hasConsent(...consents) {
  const consentData = window.gdsCmp.getConsentData();

  return consents.every((consent) => {
    return consentData.consents?.[consent] === true;
  })
}

/**
 * Return the consent data object read from the current cookie.
 *
 * @returns {ConsentData}
 */
export function getConsentData() {
  return parseConsentString(
    getCookie(COOKIE_NAME)
  );
}

/**
 * Return a serialized consent data json string that can be stored as a cookie.
 *
 * @param {Consents} consents
 * @param {number} version
 * @returns {JSON} Serialized consent data
 */
export function buildConsentString(consents, version = 1) {
  return JSON.stringify({
    consents,
    version,
  });
}


/**
 * @private
 * @param {string} consentString The serialized JSON object stored in a cookie
 * @returns {ConsentData}
 */
function parseConsentString(consentString) {
  let data = {
    consents: {},
    version: undefined,
  };

  try {
    const parsedData = JSON.parse(consentString);
    if (isObject(parsedData)) {
      if (isObject(parsedData.consents)) {
        data.consents = parsedData.consents;
      }
      if (typeof parsedData.version === 'number') {
        data.version = parsedData.version;
      }
    }
  } catch (e) {
    // Migrate legacy data.
    if (typeof consentString === 'string' && /[0-9](,[01])+/.test(consentString)) {
      const parsedData = consentString.split(',');
      data = {
        ...data,
        ...{
          version: parsedData.shift() || undefined,
          consents: {
            [NECESSARY_STORAGE_CONSENT]: parsedData.shift() === '1',
            [ANALYTICS_STORAGE_CONSENT]: parsedData.shift() === '1',
            [AD_STORAGE_CONSENT]: parsedData.shift() === '1',
          }
        }
      };
    }
  }
  return data;
}

/**
 * Update all supported consent modes.
 *
 * @param {bool} synchronous Set the consent mode in the same thread (default: false)
 * @returns {void}
 */
export function updateConsentMode(synchronous = false) {
  [
    googleConsentMode,
    metaConsentMode,
    tiktokConsentMode,
    wpConsentMode,
  ].forEach((cb) => {
    if (synchronous) {
      cb();
    } else {
      setTimeout(cb, 0);
    }
  });
}

/**
 * Update Google Tag Manager consent mode.
 *
 * @returns {void}
 */
export function googleConsentMode() {
  const consentData = window.gdsCmp.getConsentData();

  const gtmConsents = {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    functionality_storage: 'denied',
    personalization_storage: 'denied',
    security_storage: 'granted',
  };

  // Map custom consent names to GTM consent names.
  for (const [consent, value] of Object.entries(consentData.consents)) {
    const consentSettings = window.gdsCmp?.consents?.find?.((c) => c.id === consent);
    if (!consentSettings) {
      continue;
    }

    for (const gtmConsentModeId of consentSettings.gtmConsentModes) {
      gtmConsents[gtmConsentModeId] = value === true ? 'granted' : 'denied';
    }
  }

  gtag('consent', 'update', gtmConsents);
  gtag('set', {consents: gtmConsents});
}

/**
 * Update Meta pixel consent mode.
 *
 * @returns {void}
 */
export function metaConsentMode() {
  if (!window.fbq) {
    return;
  }

  if (window.gdsCmp.hasConsent(AD_STORAGE_CONSENT, ANALYTICS_STORAGE_CONSENT)) {
    window.fbq('consent', 'grant');
    console.debug('meta pixel consent granted');
  } else {
    window.fbq('consent', 'revoke');
    console.debug('meta pixel consent revoked');
  }
}

/**
 * Update TikTok consent mode.
 *
 * @returns {void}
 */
export function tiktokConsentMode() {
  if (!window.ttq) {
    return;
  }

  if (window.gdsCmp.hasConsent(AD_STORAGE_CONSENT, ANALYTICS_STORAGE_CONSENT)) {
    window.ttq.enableCookie();
    console.debug('tiktok enable cookies.');
  } else {
    window.ttq.disableCookie();
    console.debug('tiktok disable cookies.');
  }
}

/**
 * Update WP Consent API consent mode.
 *
 * @returns {void}
 */
export function wpConsentMode() {
  if (!window.wp_set_consent) {
    return;
  }

  for (const consent of window.gdsCmp.consents) {
    if (! consent.wpConsentApiCategory) {
      continue;
    }

    window.wp_set_consent(
      consent.wpConsentApiCategory,
      window.gdsCmp.hasConsent(consent.id) ? 'allow' : 'deny'
    );
  }
}
