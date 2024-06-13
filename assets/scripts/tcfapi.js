import {
  AD_STORAGE_CONSENT,
  ANALYTICS_STORAGE_CONSENT,
  EVENT_CONSENT,
  NECESSARY_STORAGE_CONSENT,
  PREFERENCES_STORAGE_CONSENT
 } from './api';

/**
 * @param {TCData} tcData
 * @returns {ConsentData}
 */
function getTcfMappedConsentData({purpose}) {
  const {consents} = purpose;

  const hasStorageConsent = consents[1];
  const hasRegularAdsConsent = consents[2];
  const hasPersonalizedAdProfileConsent = consents[3];
  const hasPersonalizedAdsConsent = consents[4];
  const hasPersonalizedContentProfileConsent = consents[5];
  const hasPersonalizedSelectionConsent = consents[6];
  const hasAdMeasurementConsent = consents[7];
  const hasContentMeasurementConsent = consents[8];
  const hasMarketResearchConsent = consents[9];
  const hasProductDevelopmentConsent = consents[10];

  const hasNecessaryConsent = (
    true
  );

  const hasPreferencesConsent = (
    hasStorageConsent
  );

  const hasStatisticsConsent = (
    hasStorageConsent &&
    hasAdMeasurementConsent &&
    // hasContentMeasurementConsent &&
    hasMarketResearchConsent
  );

  const hasMarketingConsent = (
    hasStorageConsent &&
    hasRegularAdsConsent &&
    hasPersonalizedAdProfileConsent &&
    hasPersonalizedAdsConsent
  )

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
  return window.gdsCmp?.tcfMappedConsents;
}

function tcfapi() {
  if (!window.__tcfapi) {
    return setTimeout(() => tcfapi(...arguments), 100);
  }
  window.__tcfapi(...arguments);
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
  tcfMappedConsents: {
    version: undefined,
    consents: {},
  },
  getConsentData,
  show() {
    tcfapi('displayConsentUi', 2, () => {});
  },
  hide() {
    tcfapi('displayConsentUi', 2, () => {});
  },
  withdraw() {
    // @TODO
  }
}

tcfapi('addEventListener', 2, (tcData, success) => {
  if (success && ['tcloaded', 'useractioncomplete'].includes(tcData.eventStatus)) {
    window.gdsCmp.tcfMappedConsents = getTcfMappedConsentData(tcData);
    runEvent();
  }
});
