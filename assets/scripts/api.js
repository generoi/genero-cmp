import { getCookie, gtag, isObject } from './utils';

/**
 * Cookie format: {consents: {'necessary': true, 'analytics': true, 'marketing': false}, version: 1}
 */
export const COOKIE_NAME = 'gds-consent';
export const EVENT_CONSENT = 'genero-cmp-accept';

export const NECESSARY_STORAGE_CONSENT = 'necessary';
export const AD_STORAGE_CONSENT = 'marketing';
export const ANALYTICS_STORAGE_CONSENT = 'statistics';

export const NECESSARY_COOKIES = [
  COOKIE_NAME,
  `${COOKIE_NAME}-hash`,
  'wp-settings-',
  'wp-settings-time-',
  'wordpress_test_cookie',
  'wordpress_logged_in_',
  'wordpress_sec_',
  'wp_woocommerce_session_',
  'woocommerce_cart_hash',
  'woocommerce_items_in_cart',
];

/**
 * @typedef {('necessary'|'marketing'|'statistics')} Consent
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
 * @param {...Consent} consents Consent name eg. 'necessary`, `marketing`, `statistics`.
 * @returns {boolean} if user has granted all the consents
 */
export function hasConsent(...consents) {
  const consentData = getConsentData();

  return consents.every((consent) => {
    return consentData.consents?.[consent] === true;
  })
}

/**
 * Return the consent data object read from the current cookie.
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
 * @returns {void}
 */
export function updateConsentMode() {
  setTimeout(googleConsentMode, 0);
  setTimeout(metaConsentMode, 0);
  setTimeout(tiktokConsentMode, 0);
  setTimeout(wpConsentMode, 0);
}

/**
 * Update Google Tag Manager consent mode.
 *
 * @returns {void}
 */
export function googleConsentMode() {
  const consentData = getConsentData();

  const gtmConsents = {
    analytics_storage: 'denied',
    ad_storage: 'denied',
  };

  // Map custom consent names to GTM consent names.
  for (const [consent, value] of Object.entries(consentData.consents)) {
    const gtmConsentName = {
      [ANALYTICS_STORAGE_CONSENT]: 'analytics_storage',
      [AD_STORAGE_CONSENT]: 'ad_storage'
    }[consent] || consent;

    gtmConsents[gtmConsentName] = value === true ? 'granted' : 'denied';
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

  if (hasConsent(AD_STORAGE_CONSENT, ANALYTICS_STORAGE_CONSENT)) {
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

  if (hasConsent(AD_STORAGE_CONSENT, ANALYTICS_STORAGE_CONSENT)) {
    window.ttq.enableCookie();
    console.debug('tiktok enable cookies.');
  } else {
    window.ttq.disableCookie();
    console.debug('tiktok disable cookies.');
  }
}

export function wpConsentMode() {
  if (!window.wp_set_consent) {
    return;
  }

  window.wp_set_consent('marketing', hasConsent(AD_STORAGE_CONSENT) ? 'allow' : 'deny');
  window.wp_set_consent('statistics', hasConsent(ANALYTICS_STORAGE_CONSENT) ? 'allow' : 'deny');
}
