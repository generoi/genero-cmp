import { EVENT_CONSENT, NECESSARY_STORAGE_CONSENT } from '../api';
import './index.scss';

const DEFAULT_CONSENT = NECESSARY_STORAGE_CONSENT;
const DEFAULT_TAG_NAME = 'iframe';

export class CmpEmbed extends HTMLElement {
  #buttonEl;

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();

    if (window.generoCmp?.hasConsent && window.generoCmp.hasConsent(...this.consent)) {
      this.onConsentGiven();
    } else {
      window.addEventListener(EVENT_CONSENT, () => {
        if (window.generoCmp.hasConsent(...this.consent)) {
          this.onConsentGiven();
        }
      });
    }
  }

  static get observedAttributes() {
    return ['consent'];
  }

  get consent() {
    return this.getAttribute('consent') || DEFAULT_CONSENT;
  }

  set consent(value) {
    if (value) {
      this.setAttribute('consent', value);
    } else {
      this.removeAttribute('consent');
    }
  }

  get as() {
    return this.getAttribute('as') || DEFAULT_TAG_NAME;
  }

  get description() {
    return this.getAttribute('description');
  }

  get button() {
    return this.getAttribute('button');
  }

  onConsentGiven() {
    const newTag = document.createElement(this.as);
    for (const attribute of this.getAttributeNames()) {
      if (['consent', 'as'].includes(attribute)) {
        continue;
      }
      newTag.setAttribute(attribute, this.getAttribute(attribute));
    }
    newTag.innerHTML = this.innerHTML;
    this.replaceWith(newTag);
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }
        .container {
          position: absolute;
          inset: 0;
          border: 0;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 5%;
          box-sizing: border-box;
        }
        .inner-slot {
          display: none;
        }
      </style>

      <div class="container">
        <p>${this.description}</p>

        <button>${this.button}</button>
      </div>

      <div class="inner-slot">
        <slot></slot>
      </div>
    `;

    this.#buttonEl = this.shadowRoot.querySelector('.container button');
    this.#buttonEl.addEventListener('click', () => window.generoCmp?.show?.());
  }
}

customElements.define('gds-cmp-embed', CmpEmbed);

