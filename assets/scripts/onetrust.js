/* eslint no-unused-vars:"off" */
import {
  AD_STORAGE_CONSENT,
  ANALYTICS_STORAGE_CONSENT,
  EVENT_CONSENT,
  NECESSARY_STORAGE_CONSENT,
  PREFERENCES_STORAGE_CONSENT,
 } from './api';

/**
 * @param {TCData} tcData
 * @returns {ConsentData}
 */
function getOneTrustMappedConsentData(activeGroups) {
  const hasNecessaryConsent = activeGroups.includes('C0001');
  const hasStatisticsConsent = activeGroups.includes('C0002'); // performance
  const hasPreferencesConsent = activeGroups.includes('C0003'); // functional
  const hasMarketingConsent = activeGroups.includes('C0004'); // targeting

  return {
    consents: {
      [NECESSARY_STORAGE_CONSENT]: hasNecessaryConsent,
      [PREFERENCES_STORAGE_CONSENT]: hasPreferencesConsent,
      [AD_STORAGE_CONSENT]: hasMarketingConsent,
      [ANALYTICS_STORAGE_CONSENT]: hasStatisticsConsent,
    },
    version: undefined,
  }
}

function getConsentData() {
  return window.gdsCmp?.onetrustMappedConsents;
}

function runEvent() {
  window.dispatchEvent(new CustomEvent(EVENT_CONSENT));
  for (const [consent, value] of Object.entries(getConsentData().consents)) {
    if (value) {
      window.dispatchEvent(new CustomEvent(`${EVENT_CONSENT}.${consent}`));
    }
  }
}

window.gdsCmp = {
  ...(window.gdsCmp || {}),
  onetrustMappedConsents: {
    version: undefined,
    consents: {},
  },
  getConsentData,
  show() {
    window.Optanon?.ToggleInfoDisplay?.();
  },
  hide() {
    window.Optanon?.Close?.();
  },
  withdraw() {
    window.Optanon?.RejectAll?.();
  },
}

const originalOptanonWrapper = window.OptanonWrapper;
window.OptanonWrapper = function() {
  if (typeof originalOptanonWrapper === 'function') {
    originalOptanonWrapper();
  }

  if (typeof OptanonActiveGroups !== 'undefined') {
    const activeGroups = OnetrustActiveGroups.split(',').filter(Boolean);
    window.gdsCmp.onetrustMappedConsents = getOneTrustMappedConsentData(activeGroups);
    runEvent();
  }
}
