!function(t){var e={};function n(o){if(e[o])return e[o].exports;var r=e[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(o,r,function(e){return t[e]}.bind(null,r));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/",n(n.s=28)}([function(t,e,n){"use strict";n.d(e,"a",(function(){return r})),n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return s})),n.d(e,"d",(function(){return a})),n.d(e,"e",(function(){return c}));var o=n(1),r="gds-consent",i="genero-cmp-accept";function s(){return t=Object(o.b)(r),(e=(null==t?void 0:t.split(","))||[]).shift(),e;var t,e}function a(){var t=s(),e=Object(o.b)(r+"-hash");return t.length&&e}function c(){setTimeout(u,0),setTimeout(l,0),setTimeout(d,0)}function u(){var t=s(),e={analytics_storage:t.length&&"1"===t[1]?"granted":"denied",ad_storage:t.length&&"1"===t[2]?"granted":"denied"};Object(o.c)("consent","update",e),Object(o.c)("set",{consents:e})}function l(){if(window.fbq){var t=s();t.length&&"1"===t[1]&&"1"===t[2]?window.fbq("consent","grant"):window.fbq("consent","revoke")}}function d(){if(window.ttq){var t=s();t.length&&"1"===t[1]&&"1"===t[2]?window.ttq.enableCookie():window.ttq.disableCookie()}}},function(t,e,n){"use strict";function o(t,e){var n=new Date;n.setMonth(n.getMonth()+13),document.cookie="".concat(t,"=").concat(e,"; path=/; expires=").concat(n.toUTCString())}function r(t){var e="; ".concat(document.cookie).split("; ".concat(t,"="));return 2===e.length?e.pop().split(";").shift():null}function i(t){var e=location.hostname.split(".").splice(-2).join(".");document.cookie="".concat(t,"=; path=/; domain=").concat(e,"; expires=")+new Date(0).toUTCString()}function s(){var t;window.dataLayer=window.dataLayer||[],window.dataLayer.push(arguments),(t=console).debug.apply(t,["gtag"].concat(Array.prototype.slice.call(arguments)))}n.d(e,"d",(function(){return o})),n.d(e,"b",(function(){return r})),n.d(e,"a",(function(){return i})),n.d(e,"c",(function(){return s}))},,function(t,e){function n(e){return t.exports=n=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},t.exports.__esModule=!0,t.exports.default=t.exports,n(e)}t.exports=n,t.exports.__esModule=!0,t.exports.default=t.exports},function(t,e){t.exports=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},t.exports.__esModule=!0,t.exports.default=t.exports},function(t,e,n){var o=n(15);function r(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,o(r.key),r)}}t.exports=function(t,e,n){return e&&r(t.prototype,e),n&&r(t,n),Object.defineProperty(t,"prototype",{writable:!1}),t},t.exports.__esModule=!0,t.exports.default=t.exports},function(t,e,n){var o=n(18);t.exports=function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&o(t,e)},t.exports.__esModule=!0,t.exports.default=t.exports},function(t,e,n){var o=n(10).default,r=n(11);t.exports=function(t,e){if(e&&("object"===o(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return r(t)},t.exports.__esModule=!0,t.exports.default=t.exports},function(t,e,n){var o=n(3),r=n(18),i=n(34),s=n(35);function a(e){var n="function"==typeof Map?new Map:void 0;return t.exports=a=function(t){if(null===t||!i(t))return t;if("function"!=typeof t)throw new TypeError("Super expression must either be null or a function");if(void 0!==n){if(n.has(t))return n.get(t);n.set(t,e)}function e(){return s(t,arguments,o(this).constructor)}return e.prototype=Object.create(t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),r(e,t)},t.exports.__esModule=!0,t.exports.default=t.exports,a(e)}t.exports=a,t.exports.__esModule=!0,t.exports.default=t.exports},,function(t,e){function n(e){return t.exports=n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t.exports.__esModule=!0,t.exports.default=t.exports,n(e)}t.exports=n,t.exports.__esModule=!0,t.exports.default=t.exports},function(t,e){t.exports=function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t},t.exports.__esModule=!0,t.exports.default=t.exports},function(t,e,n){var o=n(15);t.exports=function(t,e,n){return(e=o(e))in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t},t.exports.__esModule=!0,t.exports.default=t.exports},function(t,e,n){var o=n(41),r=n(22);t.exports=function(t,e){var n=r(t,e,"get");return o(t,n)},t.exports.__esModule=!0,t.exports.default=t.exports},,function(t,e,n){var o=n(10).default,r=n(17);t.exports=function(t){var e=r(t,"string");return"symbol"===o(e)?e:String(e)},t.exports.__esModule=!0,t.exports.default=t.exports},,function(t,e,n){var o=n(10).default;t.exports=function(t,e){if("object"!==o(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,e||"default");if("object"!==o(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===e?String:Number)(t)},t.exports.__esModule=!0,t.exports.default=t.exports},function(t,e){function n(e,o){return t.exports=n=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},t.exports.__esModule=!0,t.exports.default=t.exports,n(e,o)}t.exports=n,t.exports.__esModule=!0,t.exports.default=t.exports},,function(t,e){t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var n=function(t,e){var n=t[1]||"",o=t[3];if(!o)return n;if(e&&"function"==typeof btoa){var r=(s=o,"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(s))))+" */"),i=o.sources.map((function(t){return"/*# sourceURL="+o.sourceRoot+t+" */"}));return[n].concat(i).concat([r]).join("\n")}var s;return[n].join("\n")}(e,t);return e[2]?"@media "+e[2]+"{"+n+"}":n})).join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var o={},r=0;r<this.length;r++){var i=this[r][0];"number"==typeof i&&(o[i]=!0)}for(r=0;r<t.length;r++){var s=t[r];"number"==typeof s[0]&&o[s[0]]||(n&&!s[2]?s[2]=n:n&&(s[2]="("+s[2]+") and ("+n+")"),e.push(s))}},e}},function(t,e,n){var o,r,i={},s=(o=function(){return window&&document&&document.all&&!window.atob},function(){return void 0===r&&(r=o.apply(this,arguments)),r}),a=function(t,e){return e?e.querySelector(t):document.querySelector(t)},c=function(t){var e={};return function(t,n){if("function"==typeof t)return t();if(void 0===e[t]){var o=a.call(this,t,n);if(window.HTMLIFrameElement&&o instanceof window.HTMLIFrameElement)try{o=o.contentDocument.head}catch(t){o=null}e[t]=o}return e[t]}}(),u=null,l=0,d=[],f=n(39);function p(t,e){for(var n=0;n<t.length;n++){var o=t[n],r=i[o.id];if(r){r.refs++;for(var s=0;s<r.parts.length;s++)r.parts[s](o.parts[s]);for(;s<o.parts.length;s++)r.parts.push(x(o.parts[s],e))}else{var a=[];for(s=0;s<o.parts.length;s++)a.push(x(o.parts[s],e));i[o.id]={id:o.id,refs:1,parts:a}}}}function h(t,e){for(var n=[],o={},r=0;r<t.length;r++){var i=t[r],s=e.base?i[0]+e.base:i[0],a={css:i[1],media:i[2],sourceMap:i[3]};o[s]?o[s].parts.push(a):n.push(o[s]={id:s,parts:[a]})}return n}function v(t,e){var n=c(t.insertInto);if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var o=d[d.length-1];if("top"===t.insertAt)o?o.nextSibling?n.insertBefore(e,o.nextSibling):n.appendChild(e):n.insertBefore(e,n.firstChild),d.push(e);else if("bottom"===t.insertAt)n.appendChild(e);else{if("object"!=typeof t.insertAt||!t.insertAt.before)throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");var r=c(t.insertAt.before,n);n.insertBefore(e,r)}}function b(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t);var e=d.indexOf(t);e>=0&&d.splice(e,1)}function y(t){var e=document.createElement("style");if(void 0===t.attrs.type&&(t.attrs.type="text/css"),void 0===t.attrs.nonce){var o=function(){0;return n.nc}();o&&(t.attrs.nonce=o)}return m(e,t.attrs),v(t,e),e}function m(t,e){Object.keys(e).forEach((function(n){t.setAttribute(n,e[n])}))}function x(t,e){var n,o,r,i;if(e.transform&&t.css){if(!(i="function"==typeof e.transform?e.transform(t.css):e.transform.default(t.css)))return function(){};t.css=i}if(e.singleton){var s=l++;n=u||(u=y(e)),o=k.bind(null,n,s,!1),r=k.bind(null,n,s,!0)}else t.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=function(t){var e=document.createElement("link");return void 0===t.attrs.type&&(t.attrs.type="text/css"),t.attrs.rel="stylesheet",m(e,t.attrs),v(t,e),e}(e),o=E.bind(null,n,e),r=function(){b(n),n.href&&URL.revokeObjectURL(n.href)}):(n=y(e),o=_.bind(null,n),r=function(){b(n)});return o(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;o(t=e)}else r()}}t.exports=function(t,e){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(e=e||{}).attrs="object"==typeof e.attrs?e.attrs:{},e.singleton||"boolean"==typeof e.singleton||(e.singleton=s()),e.insertInto||(e.insertInto="head"),e.insertAt||(e.insertAt="bottom");var n=h(t,e);return p(n,e),function(t){for(var o=[],r=0;r<n.length;r++){var s=n[r];(a=i[s.id]).refs--,o.push(a)}t&&p(h(t,e),e);for(r=0;r<o.length;r++){var a;if(0===(a=o[r]).refs){for(var c=0;c<a.parts.length;c++)a.parts[c]();delete i[a.id]}}}};var g,w=(g=[],function(t,e){return g[t]=e,g.filter(Boolean).join("\n")});function k(t,e,n,o){var r=n?"":o.css;if(t.styleSheet)t.styleSheet.cssText=w(e,r);else{var i=document.createTextNode(r),s=t.childNodes;s[e]&&t.removeChild(s[e]),s.length?t.insertBefore(i,s[e]):t.appendChild(i)}}function _(t,e){var n=e.css,o=e.media;if(o&&t.setAttribute("media",o),t.styleSheet)t.styleSheet.cssText=n;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}function E(t,e,n){var o=n.css,r=n.sourceMap,i=void 0===e.convertToAbsoluteUrls&&r;(e.convertToAbsoluteUrls||i)&&(o=f(o)),r&&(o+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(r))))+" */");var s=new Blob([o],{type:"text/css"}),a=t.href;t.href=URL.createObjectURL(s),a&&URL.revokeObjectURL(a)}},function(t,e){t.exports=function(t,e,n){if(!e.has(t))throw new TypeError("attempted to "+n+" private field on non-instance");return e.get(t)},t.exports.__esModule=!0,t.exports.default=t.exports},function(t,e,n){var o=n(29),r=n(30),i=n(31),s=n(33);t.exports=function(t,e){return o(t)||r(t,e)||i(t,e)||s()},t.exports.__esModule=!0,t.exports.default=t.exports},function(t,e,n){var o=n(40),r=n(22);t.exports=function(t,e,n){var i=r(t,e,"set");return o(t,i,n),n},t.exports.__esModule=!0,t.exports.default=t.exports},,,,function(t,e,n){n(47),t.exports=n(49)},function(t,e){t.exports=function(t){if(Array.isArray(t))return t},t.exports.__esModule=!0,t.exports.default=t.exports},function(t,e){t.exports=function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var o,r,i,s,a=[],c=!0,u=!1;try{if(i=(n=n.call(t)).next,0===e){if(Object(n)!==n)return;c=!1}else for(;!(c=(o=i.call(n)).done)&&(a.push(o.value),a.length!==e);c=!0);}catch(t){u=!0,r=t}finally{try{if(!c&&null!=n.return&&(s=n.return(),Object(s)!==s))return}finally{if(u)throw r}}return a}},t.exports.__esModule=!0,t.exports.default=t.exports},function(t,e,n){var o=n(32);t.exports=function(t,e){if(t){if("string"==typeof t)return o(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?o(t,e):void 0}},t.exports.__esModule=!0,t.exports.default=t.exports},function(t,e){t.exports=function(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,o=new Array(e);n<e;n++)o[n]=t[n];return o},t.exports.__esModule=!0,t.exports.default=t.exports},function(t,e){t.exports=function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")},t.exports.__esModule=!0,t.exports.default=t.exports},function(t,e){t.exports=function(t){return-1!==Function.toString.call(t).indexOf("[native code]")},t.exports.__esModule=!0,t.exports.default=t.exports},function(t,e,n){var o=n(18),r=n(36);function i(e,n,s){return r()?(t.exports=i=Reflect.construct.bind(),t.exports.__esModule=!0,t.exports.default=t.exports):(t.exports=i=function(t,e,n){var r=[null];r.push.apply(r,e);var i=new(Function.bind.apply(t,r));return n&&o(i,n.prototype),i},t.exports.__esModule=!0,t.exports.default=t.exports),i.apply(null,arguments)}t.exports=i,t.exports.__esModule=!0,t.exports.default=t.exports},function(t,e){t.exports=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}},t.exports.__esModule=!0,t.exports.default=t.exports},function(t,e,n){var o=n(38);"string"==typeof o&&(o=[[t.i,o,""]]);var r={hmr:!0,transform:void 0,insertInto:void 0};n(21)(o,r);o.locals&&(t.exports=o.locals)},function(t,e,n){(t.exports=n(20)(!1)).push([t.i,"gds-cmp-modal-dialog{display:flex;z-index:100}gds-cmp-modal-dialog::part(dialog){box-sizing:border-box;max-width:680px;padding:clamp(24px,(24px + 36 * (100vw - 375px)/1025),60px) clamp(12px,(12px + 48 * (100vw - 375px)/1025),60px);border-radius:10px;box-shadow:1px 1px 4px rgba(0,0,0,.1019607843);max-height:90vh;max-height:90dvh;overflow:auto;margin:0 16px}gds-cmp-modal-dialog::part(overlay){animation:fade-in .2s both;background:rgba(0,0,0,.1);-webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px)}gds-cmp-modal-dialog[aria-hidden]{display:none}gds-cmp-modal-dialog>*{margin-block-start:var(--block-gutter-start,var(--block-gutter));margin-block-end:var(--block-gutter-end,var(--block-gutter))}@keyframes fade-in{0%{opacity:0}}",""])},function(t,e){t.exports=function(t){var e="undefined"!=typeof window&&window.location;if(!e)throw new Error("fixUrls requires window.location");if(!t||"string"!=typeof t)return t;var n=e.protocol+"//"+e.host,o=n+e.pathname.replace(/\/[^\/]*$/,"/");return t.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,(function(t,e){var r,i=e.trim().replace(/^"(.*)"$/,(function(t,e){return e})).replace(/^'(.*)'$/,(function(t,e){return e}));return/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(i)?t:(r=0===i.indexOf("//")?i:0===i.indexOf("/")?n+i:o+i.replace(/^\.\//,""),"url("+JSON.stringify(r)+")")}))}},function(t,e){t.exports=function(t,e,n){if(e.set)e.set.call(t,n);else{if(!e.writable)throw new TypeError("attempted to set read only private field");e.value=n}},t.exports.__esModule=!0,t.exports.default=t.exports},function(t,e){t.exports=function(t,e){return e.get?e.get.call(t):e.value},t.exports.__esModule=!0,t.exports.default=t.exports},function(t,e,n){var o=n(43);"string"==typeof o&&(o=[[t.i,o,""]]);var r={hmr:!0,transform:void 0,insertInto:void 0};n(21)(o,r);o.locals&&(t.exports=o.locals)},function(t,e,n){(t.exports=n(20)(!1)).push([t.i,".cookie-consent{--block-gutter:24px}.cookie-consent__cookies{display:none}.cookie-consent__cookies.is-active{display:block}.cookie-consent gds-cmp-accordion{margin-block-start:0;display:flex;flex-direction:column}.cookie-consent gds-cmp-accordion-item+gds-cmp-accordion-item{margin-top:12px}.cookie-consent gds-cmp-accordion-item p{margin:0}.cookie-consent gds-cmp-accordion-item [slot=label]{display:flex;gap:12px;margin-bottom:0}.cookie-consent gds-cmp-accordion-item::part(header):focus-visible{outline:solid 2px var(--gds-color-black)}.cookie-consent gds-cmp-accordion-item [slot=icon]{transition:transform .2s ease-out}.cookie-consent gds-cmp-accordion-item[expanded] [slot=icon]{transform:rotate(180deg)}.cookie-consent gds-cmp-accordion-item::part(content){margin:12px 0}.cookie-consent #accept-selected-button.is-active+div,.cookie-consent #accept-selected-button:not(.is-active){display:none}",""])},,,,function(t,e,n){"use strict";n.r(e);var o=n(23),r=n.n(o),i=n(4),s=n.n(i),a=n(5),c=n.n(a),u=n(11),l=n.n(u),d=n(6),f=n.n(d),p=n(7),h=n.n(p),v=n(3),b=n.n(v),y=n(8),m=n.n(y),x=n(12),g=n.n(x);n(37);function w(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,o=b()(t);if(e){var r=b()(this).constructor;n=Reflect.construct(o,arguments,r)}else n=o.apply(this,arguments);return h()(this,n)}}var k=['a[href]:not([tabindex^="-"])','area[href]:not([tabindex^="-"])','input:not([type="hidden"]):not([type="radio"]):not([disabled]):not([tabindex^="-"])','input[type="radio"]:not([disabled]):not([tabindex^="-"])','select:not([disabled]):not([tabindex^="-"])','textarea:not([disabled]):not([tabindex^="-"])','button:not([disabled]):not([tabindex^="-"])','iframe:not([tabindex^="-"])','audio[controls]:not([tabindex^="-"])','video[controls]:not([tabindex^="-"])','[contenteditable]:not([tabindex^="-"])','[tabindex]:not([tabindex^="-"])'],_=function(t){f()(n,t);var e=w(n);function n(){var t;return s()(this,n),t=e.call(this),g()(l()(t),"overlayEl",void 0),t.attachShadow({mode:"open"}),t}return c()(n,[{key:"connectedCallback",value:function(){this.addEventListener("show",this.show.bind(this)),this.addEventListener("hide",this.hide.bind(this)),this.render(),this.addEventListener("keydown",this.focusTrap.bind(this)),this.persistent||(this.addEventListener("keydown",this.closeOnEsc.bind(this)),this.overlayEl.addEventListener("click",this.closeWhenClickOutside.bind(this)))}},{key:"closeOnEsc",value:function(t){"Escape"===t.key&&(this.visible=!1)}},{key:"focusTrap",value:function(t){if("Tab"===t.key){var e=Array.from(this.querySelectorAll(k.join(","))).filter((function(t){return t.offsetWidth&&t.offsetHeight&&t.getClientRects().length})),n=e.at(0),o=e.at(-1);t.shiftKey?document.activeElement===n&&(o.focus(),t.preventDefault()):document.activeElement===o&&(n.focus(),t.preventDefault())}}},{key:"closeWhenClickOutside",value:function(){this.visible=!1}},{key:"visible",get:function(){return this.hasAttribute("visible")},set:function(t){this.dispatchEvent(new CustomEvent(t?"show":"hide",{cancelable:!0,bubbles:!0}))}},{key:"persistent",get:function(){return this.hasAttribute("persistent")}},{key:"scrollLock",get:function(){return this.hasAttribute("scroll-lock")}},{key:"isElHidden",value:function(){return"none"===window.getComputedStyle(this).display}},{key:"lockScrolling",value:function(){this.isElHidden()||(document.body.style.overflowY="hidden")}},{key:"unlockScrolling",value:function(){document.body.style.overflowY=""}},{key:"show",value:function(){this.removeAttribute("aria-hidden"),this.scrollLock&&this.lockScrolling(),this.focus(),document.body.addEventListener("focus",this.maintainDialogFocus.bind(this),!0)}},{key:"hide",value:function(){this.setAttribute("aria-hidden","true"),this.scrollLock&&this.unlockScrolling(),document.body.removeEventListener("focus",this.maintainDialogFocus.bind(this),!0)}},{key:"maintainDialogFocus",value:function(t){t.target.closest('[aria-modal="true"]')||this.focus()}},{key:"render",value:function(){this.shadowRoot.innerHTML='\n      <style>\n        :host {\n          position: fixed;\n          inset: 0;\n          z-index: 2;\n          display: flex;\n          align-items: center;\n          justify-content: center;\n        }\n\n        :host([aria-hidden="true"]) {\n          display: none;\n        }\n\n        .overlay {\n          position: fixed;\n          inset: 0;\n        }\n\n        [role="document"] {\n          background-color: white;\n          padding: 1em;\n          z-index: 2;\n        }\n      </style>\n      <div class="overlay" part="overlay"></div>\n      <div\n        role="document"\n        part="dialog"\n      >\n        <slot></slot>\n      </div>\n    ',this.overlayEl=this.shadowRoot.querySelector(".overlay"),this.hasAttribute("role")||this.setAttribute("role","dialog"),this.hasAttribute("aria-modal")||this.setAttribute("aria-modal","true"),this.hasAttribute("tabindex")||this.setAttribute("tabindex","-1"),this.visible?this.show():this.hide()}}],[{key:"observedAttributes",get:function(){return["visible","persistent","scroll-lock"]}}]),n}(m()(HTMLElement));function E(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,o=b()(t);if(e){var r=b()(this).constructor;n=Reflect.construct(o,arguments,r)}else n=o.apply(this,arguments);return h()(this,n)}}customElements.define("gds-cmp-modal-dialog",_);var O=function(t){f()(n,t);var e=E(n);function n(){var t;return s()(this,n),(t=e.call(this)).attachShadow({mode:"open"}),t}return c()(n,[{key:"connectedCallback",value:function(){this.render(),this.addEventListener("open",this.maybeCloseOtherAccordions.bind(this))}},{key:"allowMultiple",get:function(){return this.hasAttribute("allow-multiple")},set:function(t){t?this.setAttribute("allow-multiple",""):this.removeAttribute("allow-multiple")}},{key:"maybeCloseOtherAccordions",value:function(t){this.allowMultiple||Array.from(this.querySelectorAll("gds-accordion-item")).filter((function(e){return e!==t.target})).forEach((function(t){return t.close()}))}},{key:"render",value:function(){this.shadowRoot.innerHTML="\n      <style>\n        :host {\n          display: block;\n        }\n      </style>\n      <slot></slot>\n    "}}],[{key:"observedAttributes",get:function(){return["allow-multiple"]}}]),n}(m()(HTMLElement));customElements.define("gds-cmp-accordion",O);var j=n(24),A=n.n(j),M=n(13),S=n.n(M);function L(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,o=b()(t);if(e){var r=b()(this).constructor;n=Reflect.construct(o,arguments,r)}else n=o.apply(this,arguments);return h()(this,n)}}function R(t,e,n){!function(t,e){if(e.has(t))throw new TypeError("Cannot initialize the same private elements twice on an object")}(t,e),e.set(t,n)}function C(t,e,n,o){return U(t,e),I(n,"set"),function(t,e,n){if(e.set)e.set.call(t,n);else{if(!e.writable)throw new TypeError("attempted to set read only private field");e.value=n}}(t,n,o),o}function T(t,e,n){return U(t,e),I(n,"get"),function(t,e){if(e.get)return e.get.call(t);return e.value}(t,n)}function I(t,e){if(void 0===t)throw new TypeError("attempted to "+e+" private static field before its declaration")}function U(t,e){if(t!==e)throw new TypeError("Private static access of wrong provenance")}var P=new WeakMap,B=function(t){f()(n,t);var e=L(n);function n(){var t;return s()(this,n),t=e.call(this),R(l()(t),P,{writable:!0,value:void 0}),t.attachShadow({mode:"open"}),t.toggle=t.toggle.bind(l()(t)),t}return c()(n,[{key:"expanded",get:function(){return this.hasAttribute("expanded")},set:function(t){this.dispatchEvent(new CustomEvent(t?"open":"close",{cancelable:!0,bubbles:!0}))}},{key:"attributeChangedCallback",value:function(t,e,n){if(n!==e)switch(t){case"expanded":this[t]=this.hasAttribute(t)}}},{key:"toggle",value:function(){this.expanded=!this.expanded}},{key:"connectedCallback",value:function(){var t,e;C(t=this.constructor,n,D,(e=T(t,n,D),++e)),this.contentId="accordion-content-".concat(T(this.constructor,n,D)),this.titleId="accordion-title-".concat(T(this.constructor,n,D)),this.addEventListener("keydown",this.handleKeyDown.bind(this)),this.addEventListener("open",this.open.bind(this)),this.addEventListener("close",this.close.bind(this)),this.render()}},{key:"disconnectedCallback",value:function(){this.removeEventListener("keydown",this.handleKeyDown),S()(this,P).removeEventListener("click",this.toggle)}},{key:"handleKeyDown",value:function(t){"Escape"===t.key&&(this.expanded=!1)}},{key:"open",value:function(){this.setAttribute("expanded",""),S()(this,P).setAttribute("aria-expanded","true")}},{key:"close",value:function(){this.removeAttribute("expanded"),S()(this,P).setAttribute("aria-expanded","false")}},{key:"render",value:function(){this.shadowRoot.innerHTML='\n      <style>\n        :host {\n          display: block;\n        }\n\n        .item {\n          display: flex;\n          flex-direction: column;\n        }\n\n        .item__header {\n          all: unset;\n          cursor: pointer;\n          display: grid;\n          align-items: center;\n          grid-template-columns: 1fr auto;\n          grid-gap: 4px;\n        }\n\n        :host(:not([expanded])) .item__content {\n          display: none;\n        }\n      </style>\n      <div class="item">\n        <button\n          class="item__header"\n          aria-controls="'.concat(this.contentId,'"\n          aria-expanded="').concat(this.expanded?"true":"false",'"\n          part="header"\n        >\n          <div\n            id="').concat(this.titleId,'"\n            part="label"\n          >\n            <slot name="label"></slot>\n          </div>\n          <slot name="icon"></slot>\n        </button>\n        <div\n          id="').concat(this.contentId,'"\n          class="item__content"\n          aria-labelledby="').concat(this.titleId,'"\n          role="region"\n          part="content"\n        >\n          <slot></slot>\n        </div>\n      </div>\n    '),A()(this,P,this.shadowRoot.querySelector(".item__header")),S()(this,P).addEventListener("click",this.toggle)}}],[{key:"observedAttributes",get:function(){return["expanded"]}}]),n}(m()(HTMLElement)),D={writable:!0,value:0};function q(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,o=b()(t);if(e){var r=b()(this).constructor;n=Reflect.construct(o,arguments,r)}else n=o.apply(this,arguments);return h()(this,n)}}customElements.define("gds-cmp-accordion-item",B);var H=function(t){f()(n,t);var e=q(n);function n(){var t;return s()(this,n),(t=e.call(this)).attachShadow({mode:"open"}),t}return c()(n,[{key:"connectedCallback",value:function(){var t=this;this.addEventListener("open",this.open.bind(this)),this.addEventListener("close",this.close.bind(this)),this.addEventListener("keydown",this.handleKeyDown.bind(this)),this.addEventListener("click",this.toggle.bind(this)),this.persistent||this.controls.forEach((function(e){e.addEventListener("focusout",t.handleTargetContainerBlur.bind(t,e)),e.addEventListener("keydown",t.handleTargetContainerKeyDown.bind(t))})),this.render()}},{key:"controls",get:function(){var t=this.getAttribute("aria-controls");return t?t=t.split(" ").map((function(t){return document.getElementById(t)})):[]}},{key:"persistent",get:function(){return this.hasAttribute("persistent")}},{key:"expanded",get:function(){return"true"===this.getAttribute("aria-expanded")},set:function(t){this.dispatchEvent(new CustomEvent(t?"open":"close",{cancelable:!0,bubbles:!0}))}},{key:"toggle",value:function(){this.expanded=!this.expanded}},{key:"open",value:function(){this.setAttribute("aria-expanded",!0),this.controls.forEach((function(t){return t.classList.add("is-active")}))}},{key:"close",value:function(){this.setAttribute("aria-expanded",!1),this.controls.forEach((function(t){return t.classList.remove("is-active")}))}},{key:"handleKeyDown",value:function(t){"Enter"!==t.key&&" "!==t.key||(t.preventDefault(),this.toggle())}},{key:"handleTargetContainerKeyDown",value:function(t){"Escape"===t.key&&(this.expanded=!1)}},{key:"handleTargetContainerBlur",value:function(t,e){var n=e.relatedTarget;n&&!t.contains(n)&&this.close()}},{key:"render",value:function(){this.shadowRoot.innerHTML="\n      <style>\n        :host {\n          cursor: pointer;\n          display: inline-flex;\n          align-items: center;\n          justify-content: center;\n        }\n      </style>\n      <slot/>\n    ",this.hasAttribute("role")||this.setAttribute("role","button"),this.hasAttribute("aria-expanded")||this.setAttribute("aria-expanded","false"),this.hasAttribute("tabindex")||this.setAttribute("tabindex","0")}}],[{key:"observedAttributes",get:function(){return["aria-expanded","aria-controls","persistent"]}}]),n}(m()(HTMLElement));customElements.define("gds-cmp-toggle-button",H);var N=n(0),F=n(1);n(42);function K(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;return t.unshift(e),t.join(",")}function $(t){var e=JSON.parse(t.attributes["data-configs"].value),n=Object(N.c)(),o={};e.consents.forEach((function(t,e){o[t.id]=n[e]}));var r=new CustomEvent(N.b,{detail:{message:"Cookies have been accepted",settings:e,consents:o}});window.dispatchEvent(r)}function z(t,e){var n="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!n){if(Array.isArray(t)||(n=function(t,e){if(!t)return;if("string"==typeof t)return W(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return W(t,e)}(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var o=0,r=function(){};return{s:r,n:function(){return o>=t.length?{done:!0}:{done:!1,value:t[o++]}},e:function(t){throw t},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,s=!0,a=!1;return{s:function(){n=n.call(t)},n:function(){var t=n.next();return s=t.done,t},e:function(t){a=!0,i=t},f:function(){try{s||null==n.return||n.return()}finally{if(a)throw i}}}}function W(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,o=new Array(e);n<e;n++)o[n]=t[n];return o}function J(){var t,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:document,n=Object(N.c)(),o=[!(!n.length||"1"!==n[1])&&"statistics",!(!n.length||"1"!==n[2])&&"marketing"].filter(Boolean).sort(),r=z(e.querySelectorAll("[data-cmp-consent]"));try{for(r.s();!(t=r.n()).done;){var i=t.value,s=i.dataset.cmpConsent.split(" ").sort(),a=s.length===o.length&&s.every((function(t,e){return t===o[e]}));if(a)switch(i.tagName){case"SCRIPT":var c=i.cloneNode(!0);c.type="text/javascript",delete c.dataset.cmpConsent,i.replaceWith(c);break;case"IMG":case"VIDEO":case"IFRAME":i.dataset.cmpSrc&&(i.src=i.dataset.cmpSrc,delete i.dataset.cmpSrc,delete i.dataset.cmpConsent)}}}catch(t){r.e(t)}finally{r.f()}}!function(t){if("loading"!==document.readyState)return setTimeout(t,0);document.addEventListener("DOMContentLoaded",t)}((function(){var t=document.querySelector(".cookie-consent");t&&(window.generoCmp={getConsentData:N.c,evaluateTags:J},function(t){for(var e=t.attributes["data-cookie-consent-hash"].value,n=t.querySelector("[data-cookie-consent-accept-selected]"),o=t.querySelector("[data-cookie-consent-accept-all]"),r=Array.from(t.querySelectorAll('input[name="cookie-consent"]')),i=0,s=r;i<s.length;i++){s[i].addEventListener("click",(function(t){return t.stopPropagation()}))}var a,c=Object(N.c)(),u=Object(F.b)(N.a+"-hash"),l=((null==(a=Object(F.b)(N.a))?void 0:a.split(","))||[])[0];Object(N.d)()||(t.visible=!0),c.forEach((function(t,e){void 0!==r.at(e)&&(r.at(e).checked=!!parseInt(t))})),u!==e&&(t.visible=!0,l++),(c.length||u)&&$(t),n.addEventListener("click",(function(){var n=K(r.map((function(t){return t.checked?1:0})),l>1?l:1);Object(F.a)(N.a),Object(F.a)(N.a+"-hash"),Object(F.d)(N.a,n),Object(F.d)(N.a+"-hash",e),$(t),Object(N.e)(),requestAnimationFrame((function(){return t.hide()}))}),{passive:!0}),o.addEventListener("click",(function(){var n=K(r.map((function(t){return 1})),l>1?l:1);Object(F.a)(N.a),Object(F.a)(N.a+"-hash"),Object(F.d)(N.a,n),Object(F.d)(N.a+"-hash",e),$(t),Object(N.e)(),requestAnimationFrame((function(){return t.hide()}))}),{passive:!0})}(t));var e,n=z(document.querySelectorAll(".js-show-cookieconsent"));try{for(n.s();!(e=n.n()).done;){e.value.addEventListener("click",(function(e){e.preventDefault(),t.show()}))}}catch(t){n.e(t)}finally{n.f()}})),window.addEventListener(N.b,(function(){return J()})),window.addEventListener(N.b,(function(){for(var t=Object(N.c)(),e={statistics:!!t.length&&"1"===t[1],marketing:!!t.length&&"1"===t[2]},n=0,o=Object.entries(e);n<o.length;n++){var i=r()(o[n],2),s=i[0],a=i[1];document.body.classList.toggle("has-genero-cmp-consent--".concat(s),a)}}))},,function(t,e){}]);