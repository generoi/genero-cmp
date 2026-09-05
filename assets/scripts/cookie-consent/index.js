import { COOKIE_NAME, EVENT_CONSENT, NECESSARY_COOKIES, buildConsentString, getConsentData, hasConsent, updateConsentMode } from '../api';
import { getCookie, setCookie, removeCookie, getAllCookies, gtag } from '../utils';
import { Consents } from '../api';
import './index.scss';

/**
 * @returns {void}
 */
function runEvent() {
  window.dispatchEvent(new CustomEvent(EVENT_CONSENT));
  for (const [consent, value] of Object.entries(getConsentData().consents)) {
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
  const necessaryCookies = NECESSARY_COOKIES.concat(window.gdsCmp?.necessary_cookies || []);
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

/**
 * Whether the dialog has to be shown at all: either nothing has been stored yet,
 * or what was stored was agreed against a different set of categories than the
 * one this page ships.
 *
 * Everything this reads — the two cookies and the hash attribute — is available
 * the moment the element is parsed, which is what lets the decision happen
 * before DOMContentLoaded.
 *
 * @param {HTMLElement} modal Reference to the <gds-cmp-modal-dialog> element
 * @returns {boolean}
 */
export function needsConsent(modal) {
  const consents = getConsentData().consents;
  const consentHash = getCookie(`${COOKIE_NAME}-hash`);

  if (!Object.keys(consents).length || !consentHash) {
    return true;
  }

  return consentHash !== modal.attributes['data-cookie-consent-hash']?.value;
}

/**
 * Show the dialog at most once.
 *
 * The early upgrade-time pass and the later init pass can both conclude that the
 * dialog is needed; without this guard the second one dispatches another show,
 * and show() moves focus — which would yank it back out of whatever the visitor
 * had already tabbed to inside the dialog.
 *
 * @param {HTMLElement} modal Reference to the <gds-cmp-modal-dialog> element
 * @returns {void}
 */
export function showOnce(modal) {
  if (modal.dataset.gdsCmpShown === '1') {
    return;
  }

  modal.dataset.gdsCmpShown = '1';
  modal.visible = true;
}

/**
 * @param {HTMLElement} modal Reference to the <gds-cmp-modal-dialog> element
 * @returns {void}
 */
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
    showOnce(modal);
  }

  // Pre-fill the inputs according to the cookie value
  for (const input of inputs) {
    input.checked = input.required ? true : hasConsent(input.value);
  }

  // Display the modal if the cookie hash doesn't match the current hash
  if (consentHash !== hash) {
    console.debug('consent hash changed', consentHash, hash);
    showOnce(modal);
    version++;
  }

  // run event if cookie is set
  if (hasConsented || consentHash) {
    runEvent();
  }

  function setupConsent() {
    const consentString = buildConsentString(
      getConsentsFromInputs(inputs),
      (version > 1) ? version : 1
    );
    setCookie(COOKIE_NAME, consentString);
    setCookie(`${COOKIE_NAME}-hash`, hash);
    runEvent();
    updateConsentMode();
    requestAnimationFrame(() => modal.visible = false);
    setTimeout(() => sendGtagEvents(), 1);
  }

  function sendGtagEvents() {
    gtag('event', 'gds-cmp.update');
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
    show() {
      modal.visible = true;
    },
    hide() {
      modal.visible = false;
    },
    withdraw() {
      removeNonNecessaryCookies();
      removeCookie(COOKIE_NAME);
      removeCookie(`${COOKIE_NAME}-hash`);
      modal.visible = true;
    },
  }
}
