import { getConsentData, updateConsentMode } from './api';
import { gtag } from './utils';

// Default consent
// https://support.google.com/tagmanager/answer/10718549?hl=en
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
  functionality_storagea: 'denied',
  personalization_storage: 'denied',
  security_storage: 'granted',
});

const hasConsented = Object.keys(getConsentData().consents).length > 0;
if (hasConsented) {
  updateConsentMode(true);
}

