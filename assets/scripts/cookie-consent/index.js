import { COOKIE_NAME, EVENT_CONSENT, getConsentData, hasDefinedConsent, updateConsentMode } from '../api';
import { getCookie, setCookie, deleteWrongCookie } from '../utils';
import './index.scss';

function parseVersion(consentString) {
  const values = consentString?.split(',') || [];
  return values[0];
}

function buildConsentString(values, revisedVersion = 1) {
  values.unshift(revisedVersion);
  return values.join(',');
}

function runEvent(modal) {
  const settings = JSON.parse(modal.attributes['data-configs'].value);
  const cookieConsents = getConsentData();

  let consents = {};

  settings.consents.forEach((item, index) => {
    consents[item.id] = cookieConsents[index];
  });

  let event = new CustomEvent(EVENT_CONSENT, {
    detail: {
      message: 'Cookies have been accepted',
      settings: settings,
      consents: consents,
    }
  });
  window.dispatchEvent(event);
}

export default function init(modal) {
  const hash = modal.attributes['data-cookie-consent-hash'].value;
  const acceptSelectedEl = modal.querySelector('[data-cookie-consent-accept-selected]');
  const acceptAllEl = modal.querySelector('[data-cookie-consent-accept-all]');
  const inputs = Array.from(modal.querySelectorAll('input[name="cookie-consent"]'));

  // Avoid checkboxes being checked toggling the accordion
  for (const input of inputs) {
    input.addEventListener('click', (e) => e.stopPropagation());
  }

  const consents = getConsentData();
  const consentHash = getCookie(COOKIE_NAME + '-hash');

  let version = parseVersion(
    getCookie(COOKIE_NAME)
  )

  // Display the modal if there's no cookie
  if (!hasDefinedConsent()) {
    modal.visible = true;
  }

  // Pre-fill the inputs according to the cookie value
  consents.forEach((consent, idx) => {
    if(!(typeof inputs.at(idx) === 'undefined'))  {
      inputs.at(idx).checked = !!parseInt(consent)
    }
  });

  // Display the modal if the cookie hash doesn't match the current hash
  if(consentHash !== hash) {
    modal.visible = true;
    version++;
  }

  // run event if cookie is set
  if (consents.length || consentHash) {
    runEvent(modal);
  }

  // Accept selected cookies and close modal
  acceptSelectedEl.addEventListener('click', () => {
    const consentString = buildConsentString(
      inputs.map(input => input.checked ? 1 : 0),
      (version > 1) ? version : 1
    );
    deleteWrongCookie(COOKIE_NAME);
    deleteWrongCookie(COOKIE_NAME + '-hash');
    setCookie(COOKIE_NAME, consentString);
    setCookie(COOKIE_NAME + '-hash', hash);
    runEvent(modal);
    updateConsentMode();
    modal.hide();
  });

  // Accept all cookies and close modal
  acceptAllEl.addEventListener('click', () => {
    const consentString = buildConsentString(
      inputs.map(input => 1),
      (version > 1) ? version : 1
    );
    deleteWrongCookie(COOKIE_NAME);
    deleteWrongCookie(COOKIE_NAME + '-hash');
    setCookie(COOKIE_NAME, consentString);
    setCookie(COOKIE_NAME + '-hash', hash);
    runEvent(modal);
    updateConsentMode();
    modal.hide();
  });
}
