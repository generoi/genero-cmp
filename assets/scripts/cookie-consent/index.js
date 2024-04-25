import { COOKIE_NAME, EVENT_CONSENT, NECESSARY_COOKIES, buildConsentString, getConsentData, hasConsent, updateConsentMode } from '../api';
import { getCookie, setCookie, removeCookie, getAllCookies } from '../utils';
import { Consents } from '../api';
import './index.scss';

/**
 * @returns {void}
 */
function runEvent(modal) {
  const settings = JSON.parse(modal.attributes['data-configs'].value);
  const consentData = getConsentData();

  const event = new CustomEvent(EVENT_CONSENT, {
    detail: {
      message: 'Cookies have been accepted',
      settings,
      consentData,
    }
  });
  window.dispatchEvent(event);

  for (const [consent, value] of Object.entries(consentData.consents)) {
    if (value) {
      window.dispatchEvent(new CustomEvent(`${EVENT_CONSENT}.${consent}`));
    }
  }
}

/**
 * @param {NodeList} inputs
 * @returns {Consents}
 */
function getConsentsFromInputs(inputs) {
  return inputs.reduce((carry, input) => {
    carry[input.value] = input.checked ? true : false;
    return carry;
  }, {});
}

/**
 * Remove non-necessary cookies
 * @returns {void}
 */
function removeNonNecessaryCookies() {
  const necessaryCookies = NECESSARY_COOKIES.concat(window.generoCmp?.necessary_cookies || []);
  for (const cookie of getAllCookies()) {
    const isNecessaryCookie = necessaryCookies.some((necessaryCookie) => {
      const regex = new RegExp(`^${necessaryCookie}`);
      return regex.test(cookie);
    });
    if (!isNecessaryCookie) {
      console.debug('Removing non-necessary cookie', cookie);
      removeCookie(cookie)
    }
  }

  localStorage.clear();
  sessionStorage.clear();
}

export default function init(modal) {
  const hash = modal.attributes['data-cookie-consent-hash'].value;
  const acceptSelectedEl = modal.querySelector('[data-cookie-consent-accept-selected]');
  const acceptAllEl = modal.querySelector('[data-cookie-consent-accept-all]');
  const declineAllEl = modal.querySelector('[data-cookie-consent-decline-all]');
  const inputs = Array.from(modal.querySelectorAll('input[name="cookie-consent"]'));

  // Avoid checkboxes being checked toggling the accordion
  for (const input of inputs) {
    input.addEventListener('click', (e) => e.stopPropagation());
  }

  const consentData = getConsentData();
  const consentHash = getCookie(`${COOKIE_NAME}-hash`);
  const consents = consentData.consents;
  let version = consentData.version;
  const hasConsented = Object.keys(consents).length;

  // Display the modal if there's no cookie
  if (!hasConsented || !consentHash) {
    console.debug('missing consent cookie', consents, consentHash);
    modal.visible = true;
  }

  // Pre-fill the inputs according to the cookie value
  for (const input of inputs) {
    input.checked = hasConsent(input.value);
  }

  // Display the modal if the cookie hash doesn't match the current hash
  if (consentHash !== hash) {
    console.debug('consent hash changed', consentHash, hash);
    modal.visible = true;
    version++;
  }

  // run event if cookie is set
  if (hasConsented || consentHash) {
    runEvent(modal);
  }

  function setupConsent() {
    const consentString = buildConsentString(
      getConsentsFromInputs(inputs),
      (version > 1) ? version : 1
    );
    setCookie(COOKIE_NAME, consentString);
    setCookie(`${COOKIE_NAME}-hash`, hash);
    runEvent(modal);
    updateConsentMode();
    requestAnimationFrame(() => modal.hide());
  }

  // Accept selected cookies and close modal
  acceptSelectedEl.addEventListener('click', () => {
    const previousConsents = getConsentData().consents;

    setupConsent();

    // If consent was revoked, remove all cookies except necessary ones.
    for (const [consent, value] of Object.entries(previousConsents)) {
      if (value && !hasConsent(consent)) {
        removeNonNecessaryCookies();
      }
    }
  }, {passive: true});

  // Accept all cookies and close modal
  acceptAllEl.addEventListener('click', () => {
    inputs.forEach((input) => input.checked = true)
    setupConsent();
  }, {passive: true});

  // Decline all cookies and close modal
  declineAllEl.addEventListener('click', () => {
    inputs.forEach((input) => input.checked = input.required)
    setupConsent();
    removeNonNecessaryCookies();
  }, {passive: true});

  return {
    modal,
    hasConsent,
    show() {
      modal.show();
    },
    hide() {
      modal.hide();
    },
    withdraw() {
      removeNonNecessaryCookies();
      removeCookie(COOKIE_NAME);
      removeCookie(`${COOKIE_NAME}-hash`);
      modal.show();
    },
  }
}
