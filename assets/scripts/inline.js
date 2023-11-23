import { hasDefinedConsent, updateConsentMode } from './api';
import { gtag } from './utils';

// Default consent
gtag('consent', 'default', {
  'ad_storage': 'denied',
  'analytics_storage': 'denied',
});

if (hasDefinedConsent()) {
  updateConsentMode();
}

