/**
 * @file
 * Browser version of plugin scripts, includign polyfills and external
 * libraries.
 */

import PluginComponent from './component';
import './modal-dialog';
import './accordion';
import './accordion-item';
import './toggle-button';
import cookieConsent from './cookie-consent';

window.PluginComponent = new PluginComponent();
cookieConsent(document.querySelector('.cookie-consent'));
