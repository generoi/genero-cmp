import { getConsentData, updateConsentMode } from './api';
import { gtag } from './utils';

// Default consent
gtag('consent', 'default', {
  'ad_storage': 'denied',
  'analytics_storage': 'denied',
});

const hasConsented = Object.keys(getConsentData().consents).length > 0;
if (hasConsented) {
  updateConsentMode();
}

