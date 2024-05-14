import { getConsentData, updateConsentMode } from './api';
import { gtag } from './utils';

// Default consent
// https://support.google.com/tagmanager/answer/10718549?hl=en
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
  functionality_storage: 'denied',
  personalization_storage: 'denied',
  security_storage: 'granted',
});

const hasConsented = Object.keys(getConsentData().consents).length > 0;
if (hasConsented) {
  // We need to run this in the same thread or else Consent Initialization event
  // happens before and tags never fire.
  updateConsentMode(true);
}

