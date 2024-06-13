!function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/",n(n.s=54)}({1:function(t,e,n){var r=n(12);t.exports=function(t,e,n){return(e=r(e))in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t},t.exports.__esModule=!0,t.exports.default=t.exports},12:function(t,e,n){var r=n(6).default,o=n(17);t.exports=function(t){var e=o(t,"string");return"symbol"===r(e)?e:String(e)},t.exports.__esModule=!0,t.exports.default=t.exports},17:function(t,e,n){var r=n(6).default;t.exports=function(t,e){if("object"!==r(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var o=n.call(t,e||"default");if("object"!==r(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===e?String:Number)(t)},t.exports.__esModule=!0,t.exports.default=t.exports},19:function(t,e){t.exports=window.wp.components},23:function(t,e){t.exports=window.wp.hooks},25:function(t,e){t.exports=window.wp.i18n},3:function(t,e){t.exports=window.wp.element},32:function(t,e){t.exports=window.wp.compose},34:function(t,e){function n(){return t.exports=n=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},t.exports.__esModule=!0,t.exports.default=t.exports,n.apply(this,arguments)}t.exports=n,t.exports.__esModule=!0,t.exports.default=t.exports},35:function(t,e){t.exports=window.wp.blocks},36:function(t,e){t.exports=window.wp.blockEditor},54:function(t,e,n){t.exports=n(56)},56:function(t,e,n){"use strict";n.r(e);var r=n(34),o=n.n(r),c=n(1),i=n.n(c),s=n(3),u=n(23),l=n(25),a=n(35),p=n(32),f=n(36),b=n(19);function d(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function m(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?d(Object(n),!0).forEach((function(e){i()(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):d(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function O(t){return Object(a.hasBlockSupport)(t,"customClassName",!0)}var j=Object(p.createHigherOrderComponent)((function(t){return function(e){var n,r=e.name,c=e.attributes;if(O(r)&&null!==(n=c.consents)&&void 0!==n&&n.length){var u=null!=c&&c.consentOptin?"optin":"optout",l=e.wrapperProps;return l=m(m({},l),{},i()({},"data-gds-cmp-consent-".concat(u),c.consents.join(" "))),Object(s.createElement)(t,o()({},e,{wrapperProps:l}))}return Object(s.createElement)(t,e)}})),y=Object(p.createHigherOrderComponent)((function(t){return function(e){if(O(e.name)&&e.isSelected){var n,r,o=window.gdsCmp.consents;return Object(s.createElement)(s.Fragment,null,Object(s.createElement)(t,e),Object(s.createElement)(f.InspectorAdvancedControls,null,Object(s.createElement)(b.BaseControl,{id:"consent-settings",label:Object(l.__)("Consent settings")},Object(s.createElement)("div",{style:{marginBottom:"1rem"}},Object(s.createElement)(b.ButtonGroup,null,Object(s.createElement)(b.Button,{isSmall:!0,isPressed:null===(n=e.attributes)||void 0===n?void 0:n.consentOptin,onClick:function(){return e.setAttributes({consentOptin:!0})}},Object(l.__)("Visible")),Object(s.createElement)(b.Button,{isSmall:!0,isPressed:!(null!==(r=e.attributes)&&void 0!==r&&r.consentOptin),onClick:function(){return e.setAttributes({consentOptin:!1})}},Object(l.__)("Hidden"))),Object(s.createElement)("p",null,"when user has given all consents below")),Object(s.createElement)("div",null,Object(s.createElement)(b.ButtonGroup,null,o.map((function(t){var n,r,o=t.id,c=t.label;return Object(s.createElement)(b.Button,{isSmall:!0,isPressed:null===(n=e.attributes.consents)||void 0===n||null===(r=n.includes)||void 0===r?void 0:r.call(n,o),onClick:function(){var t=e.attributes.consents||[];e.setAttributes({consents:t.includes(o)?t.filter((function(t){return t!==o})):t.concat([o])})}},c)})))))))}return Object(s.createElement)(t,e)}}),"withInspectorControl");Object(u.addFilter)("blocks.registerBlockType","genero-cmp-consent/attribute",(function(t){return O(t.name)&&(t.attributes=m(m({},t.attributes),{},{consentOptin:{type:"bool",default:!1},consents:{type:"array",items:{type:"string"},default:[]}})),t})),Object(u.addFilter)("editor.BlockListBlock","genero-cmp-consent/with-data-attributes",j),Object(u.addFilter)("editor.BlockEdit","genero-cmp-consent/with-inspector-control",y),Object(u.addFilter)("blocks.getSaveContent.extraProps","genero-cmp-consent/save-props",(function(t,e,n){if(O(e)&&n.consents.length){var r=null!=n&&n.consentOptin?"optin":"optout";t["data-gds-cmp-consent-".concat(r)]=n.consents.join(" ")}return t}))},6:function(t,e){function n(e){return t.exports=n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t.exports.__esModule=!0,t.exports.default=t.exports,n(e)}t.exports=n,t.exports.__esModule=!0,t.exports.default=t.exports}});