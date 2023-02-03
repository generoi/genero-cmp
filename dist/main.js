/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/scripts/accordion-item/index.js":
/*!************************************************!*\
  !*** ./assets/scripts/accordion-item/index.js ***!
  \************************************************/
/*! exports provided: GdsAccordionItem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GdsAccordionItem", function() { return GdsAccordionItem; });
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }
function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct.bind(); } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
function _classStaticPrivateFieldSpecSet(receiver, classConstructor, descriptor, value) { _classCheckPrivateStaticAccess(receiver, classConstructor); _classCheckPrivateStaticFieldDescriptor(descriptor, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }
function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }
function _classStaticPrivateFieldSpecGet(receiver, classConstructor, descriptor) { _classCheckPrivateStaticAccess(receiver, classConstructor); _classCheckPrivateStaticFieldDescriptor(descriptor, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classCheckPrivateStaticFieldDescriptor(descriptor, action) { if (descriptor === undefined) { throw new TypeError("attempted to " + action + " private static field before its declaration"); } }
function _classCheckPrivateStaticAccess(receiver, classConstructor) { if (receiver !== classConstructor) { throw new TypeError("Private static access of wrong provenance"); } }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }
var EVENT_OPEN = 'open';
var EVENT_CLOSE = 'close';
var _headerEl = /*#__PURE__*/new WeakMap();
var GdsAccordionItem = /*#__PURE__*/function (_HTMLElement) {
  _inherits(GdsAccordionItem, _HTMLElement);
  var _super = _createSuper(GdsAccordionItem);
  function GdsAccordionItem() {
    var _this;
    _classCallCheck(this, GdsAccordionItem);
    _this = _super.call(this);
    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _headerEl, {
      writable: true,
      value: void 0
    });
    _this.attachShadow({
      mode: 'open'
    });
    _this.toggle = _this.toggle.bind(_assertThisInitialized(_this));
    return _this;
  }
  _createClass(GdsAccordionItem, [{
    key: "expanded",
    get: function get() {
      return this.hasAttribute('expanded');
    },
    set: function set(isExpanded) {
      this.dispatchEvent(new CustomEvent(isExpanded ? EVENT_OPEN : EVENT_CLOSE, {
        cancelable: true,
        bubbles: true
      }));
    }
  }, {
    key: "attributeChangedCallback",
    value: function attributeChangedCallback(attrName, oldValue, newValue) {
      if (newValue === oldValue) {
        return;
      }
      switch (attrName) {
        case 'expanded':
          this[attrName] = this.hasAttribute(attrName);
          break;
      }
    }
  }, {
    key: "toggle",
    value: function toggle() {
      this.expanded = !this.expanded;
    }
  }, {
    key: "connectedCallback",
    value: function connectedCallback() {
      var _this$constructor, _this$constructor$idC;
      _classStaticPrivateFieldSpecSet(_this$constructor = this.constructor, GdsAccordionItem, _idCounter, (_this$constructor$idC = _classStaticPrivateFieldSpecGet(_this$constructor, GdsAccordionItem, _idCounter), ++_this$constructor$idC));
      this.contentId = "accordion-content-".concat(_classStaticPrivateFieldSpecGet(this.constructor, GdsAccordionItem, _idCounter));
      this.titleId = "accordion-title-".concat(_classStaticPrivateFieldSpecGet(this.constructor, GdsAccordionItem, _idCounter));
      this.addEventListener('keydown', this.handleKeyDown.bind(this));
      this.addEventListener(EVENT_OPEN, this.open.bind(this));
      this.addEventListener(EVENT_CLOSE, this.close.bind(this));
      this.render();
    }
  }, {
    key: "disconnectedCallback",
    value: function disconnectedCallback() {
      this.removeEventListener('keydown', this.handleKeyDown);
      _classPrivateFieldGet(this, _headerEl).removeEventListener('click', this.toggle);
    }
  }, {
    key: "handleKeyDown",
    value: function handleKeyDown(event) {
      if (event.key === 'Escape') {
        this.expanded = false;
      }
    }
  }, {
    key: "open",
    value: function open() {
      this.setAttribute('expanded', '');
      _classPrivateFieldGet(this, _headerEl).setAttribute('aria-expanded', 'true');
    }
  }, {
    key: "close",
    value: function close() {
      this.removeAttribute('expanded');
      _classPrivateFieldGet(this, _headerEl).setAttribute('aria-expanded', 'false');
    }
  }, {
    key: "render",
    value: function render() {
      this.shadowRoot.innerHTML = "\n      <style>\n        :host {\n          display: block;\n        }\n\n        .item {\n          display: flex;\n          flex-direction: column;\n        }\n\n        .item__header {\n          all: unset;\n          cursor: pointer;\n          display: grid;\n          align-items: center;\n          grid-template-columns: 1fr auto;\n          grid-gap: 4px;\n        }\n\n        :host(:not([expanded])) .item__content {\n          display: none;\n        }\n      </style>\n      <div class=\"item\">\n        <button\n          class=\"item__header\"\n          aria-controls=\"".concat(this.contentId, "\"\n          aria-expanded=\"").concat(this.expanded ? 'true' : 'false', "\"\n          part=\"header\"\n        >\n          <div\n            id=\"").concat(this.titleId, "\"\n            part=\"label\"\n          >\n            <slot name=\"label\"></slot>\n          </div>\n          <slot name=\"icon\"></slot>\n        </button>\n        <div\n          id=\"").concat(this.contentId, "\"\n          class=\"item__content\"\n          aria-labelledby=\"").concat(this.titleId, "\"\n          role=\"region\"\n          part=\"content\"\n        >\n          <slot></slot>\n        </div>\n      </div>\n    ");
      _classPrivateFieldSet(this, _headerEl, this.shadowRoot.querySelector('.item__header'));
      _classPrivateFieldGet(this, _headerEl).addEventListener('click', this.toggle);
    }
  }], [{
    key: "observedAttributes",
    get: function get() {
      return ['expanded'];
    }
  }]);
  return GdsAccordionItem;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));
var _idCounter = {
  writable: true,
  value: 0
};
customElements.define('gds-accordion-item', GdsAccordionItem);

/***/ }),

/***/ "./assets/scripts/accordion/index.js":
/*!*******************************************!*\
  !*** ./assets/scripts/accordion/index.js ***!
  \*******************************************/
/*! exports provided: GdsAccordion */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GdsAccordion", function() { return GdsAccordion; });
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }
function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct.bind(); } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var EVENT_OPEN = 'open';
var GdsAccordion = /*#__PURE__*/function (_HTMLElement) {
  _inherits(GdsAccordion, _HTMLElement);
  var _super = _createSuper(GdsAccordion);
  function GdsAccordion() {
    var _this;
    _classCallCheck(this, GdsAccordion);
    _this = _super.call(this);
    _this.attachShadow({
      mode: 'open'
    });
    return _this;
  }
  _createClass(GdsAccordion, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      this.render();
      this.addEventListener(EVENT_OPEN, this.maybeCloseOtherAccordions.bind(this));
    }
  }, {
    key: "allowMultiple",
    get: function get() {
      return this.hasAttribute('allow-multiple');
    },
    set: function set(value) {
      if (value) {
        this.setAttribute('allow-multiple', '');
      } else {
        this.removeAttribute('allow-multiple');
      }
    }
  }, {
    key: "maybeCloseOtherAccordions",
    value: function maybeCloseOtherAccordions(event) {
      if (this.allowMultiple) {
        return;
      }
      Array.from(this.querySelectorAll('gds-accordion-item')).filter(function (item) {
        return item !== event.target;
      }).forEach(function (item) {
        return item.close();
      });
    }
  }, {
    key: "render",
    value: function render() {
      this.shadowRoot.innerHTML = "\n      <style>\n        :host {\n          display: block;\n        }\n      </style>\n      <slot></slot>\n    ";
    }
  }], [{
    key: "observedAttributes",
    get: function get() {
      return ['allow-multiple'];
    }
  }]);
  return GdsAccordion;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));
customElements.define('gds-accordion', GdsAccordion);

/***/ }),

/***/ "./assets/scripts/component.js":
/*!*************************************!*\
  !*** ./assets/scripts/component.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
/**
 * @file
 * ES6 version of plugin scripts, importable without polyfills.
 */
var PluginComponent = /*#__PURE__*/_createClass(function PluginComponent() {
  _classCallCheck(this, PluginComponent);
});
/* harmony default export */ __webpack_exports__["default"] = (PluginComponent);

/***/ }),

/***/ "./assets/scripts/cookie-consent/index.js":
/*!************************************************!*\
  !*** ./assets/scripts/cookie-consent/index.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return init; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "./assets/scripts/utils.js");
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.scss */ "./assets/scripts/cookie-consent/index.scss");
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_index_scss__WEBPACK_IMPORTED_MODULE_1__);



/**
 * Cookie format: (version,consent1,consent2,consent3,consent4)  Example(String): "1,1,1,0,1"
 */
var COOKIE_NAME = 'gds-consent';
function parseVersion(consentString) {
  var values = (consentString === null || consentString === void 0 ? void 0 : consentString.split(',')) || [];
  return values[0];
}
function parseConsentString(consentString) {
  var values = (consentString === null || consentString === void 0 ? void 0 : consentString.split(',')) || [];
  values.shift(); // remove version number;
  return values;
}
function buildConsentString(values) {
  var revisedVersion = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  values.unshift(revisedVersion);
  return values.join(',');
}
function runEvent(modal) {
  var event = new CustomEvent('accept', {
    detail: {
      message: 'Cookies have been accepted',
      settings: JSON.parse(modal.attributes['data-configs'].value)
    }
  });
  modal.dispatchEvent(event);
}
function init(modal) {
  var hash = modal.attributes['data-cookie-consent-hash'].value;
  var acceptSelectedEl = modal.querySelector('[data-cookie-consent-accept-selected]');
  var acceptAllEl = modal.querySelector('[data-cookie-consent-accept-all]');
  var inputs = Array.from(modal.querySelectorAll('input[name="cookie-consent"]'));

  // Avoid checkboxes being checked toggling the accordion
  for (var _i = 0, _inputs = inputs; _i < _inputs.length; _i++) {
    var input = _inputs[_i];
    input.addEventListener('click', function (e) {
      return e.stopPropagation();
    });
  }
  var consents = parseConsentString(Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getCookie"])(COOKIE_NAME));
  var consentHash = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getCookie"])(COOKIE_NAME + '-hash');
  var version = parseVersion(Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getCookie"])(COOKIE_NAME));

  // Display the modal if there's no cookie
  if (!consents.length || !consentHash) {
    modal.visible = true;
  }

  // Pre-fill the inputs according to the cookie value
  consents.forEach(function (consent, idx) {
    if (!(typeof inputs.at(idx) === 'undefined')) {
      inputs.at(idx).checked = !!parseInt(consent);
    }
  });

  // Display the modal if the cookie hash doesn't match the current hash
  if (consentHash !== hash) {
    modal.visible = true;
    version++;
  }

  // run event if cookie is set
  if (consents.length || consentHash) {
    runEvent(modal);
  }

  // Accept selected cookies and close modal
  acceptSelectedEl.addEventListener('click', function () {
    var consentString = buildConsentString(inputs.map(function (input) {
      return input.checked ? 1 : 0;
    }), version > 1 ? version : 1);
    Object(_utils__WEBPACK_IMPORTED_MODULE_0__["setCookie"])(COOKIE_NAME, consentString);
    Object(_utils__WEBPACK_IMPORTED_MODULE_0__["setCookie"])(COOKIE_NAME + '-hash', hash);
    runEvent(modal);
    modal.hide();
  });

  // Accept all cookies and close modal
  acceptAllEl.addEventListener('click', function () {
    var consentString = buildConsentString(inputs.map(function (input) {
      return 1;
    }), version > 1 ? version : 1);
    Object(_utils__WEBPACK_IMPORTED_MODULE_0__["setCookie"])(COOKIE_NAME, consentString);
    Object(_utils__WEBPACK_IMPORTED_MODULE_0__["setCookie"])(COOKIE_NAME + '-hash', hash);
    runEvent(modal);
    modal.hide();
  });
}

/***/ }),

/***/ "./assets/scripts/cookie-consent/index.scss":
/*!**************************************************!*\
  !*** ./assets/scripts/cookie-consent/index.scss ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/postcss-loader/src??ref--7-2!../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!./index.scss */ "./node_modules/css-loader/index.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./assets/scripts/cookie-consent/index.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./assets/scripts/main.js":
/*!********************************!*\
  !*** ./assets/scripts/main.js ***!
  \********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./component */ "./assets/scripts/component.js");
/* harmony import */ var _modal_dialog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modal-dialog */ "./assets/scripts/modal-dialog/index.js");
/* harmony import */ var _accordion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./accordion */ "./assets/scripts/accordion/index.js");
/* harmony import */ var _accordion_item__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./accordion-item */ "./assets/scripts/accordion-item/index.js");
/* harmony import */ var _toggle_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./toggle-button */ "./assets/scripts/toggle-button/index.js");
/* harmony import */ var _cookie_consent__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./cookie-consent */ "./assets/scripts/cookie-consent/index.js");
/**
 * @file
 * Browser version of plugin scripts, includign polyfills and external
 * libraries.
 */







window.PluginComponent = new _component__WEBPACK_IMPORTED_MODULE_0__["default"]();
Object(_cookie_consent__WEBPACK_IMPORTED_MODULE_5__["default"])(document.querySelector('.cookie-consent'));

/***/ }),

/***/ "./assets/scripts/modal-dialog/index.js":
/*!**********************************************!*\
  !*** ./assets/scripts/modal-dialog/index.js ***!
  \**********************************************/
/*! exports provided: ModelDialog */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModelDialog", function() { return ModelDialog; });
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.scss */ "./assets/scripts/modal-dialog/index.scss");
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_index_scss__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }
function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct.bind(); } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

var EVENT_SHOW = 'show';
var EVENT_HIDE = 'hide';

// @see https://github.com/KittyGiraudel/focusable-selectors/blob/main/index.js
var FOCUSABLE_SELECTORS = ['a[href]:not([tabindex^="-"])', 'area[href]:not([tabindex^="-"])', 'input:not([type="hidden"]):not([type="radio"]):not([disabled]):not([tabindex^="-"])', 'input[type="radio"]:not([disabled]):not([tabindex^="-"])', 'select:not([disabled]):not([tabindex^="-"])', 'textarea:not([disabled]):not([tabindex^="-"])', 'button:not([disabled]):not([tabindex^="-"])', 'iframe:not([tabindex^="-"])', 'audio[controls]:not([tabindex^="-"])', 'video[controls]:not([tabindex^="-"])', '[contenteditable]:not([tabindex^="-"])', '[tabindex]:not([tabindex^="-"])'];

/**
 * @see https://www.w3.org/WAI/ARIA/apg/patterns/dialogmodal/
 */
var ModelDialog = /*#__PURE__*/function (_HTMLElement) {
  _inherits(ModelDialog, _HTMLElement);
  var _super = _createSuper(ModelDialog);
  function ModelDialog() {
    var _this;
    _classCallCheck(this, ModelDialog);
    _this = _super.call(this);
    _defineProperty(_assertThisInitialized(_this), "overlayEl", void 0);
    _this.attachShadow({
      mode: 'open'
    });
    return _this;
  }
  _createClass(ModelDialog, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      this.addEventListener(EVENT_SHOW, this.show.bind(this));
      this.addEventListener(EVENT_HIDE, this.hide.bind(this));
      this.render();
      this.addEventListener('keydown', this.focusTrap.bind(this));
      if (!this.persistent) {
        this.addEventListener('keydown', this.closeOnEsc.bind(this));
        this.overlayEl.addEventListener('click', this.closeWhenClickOutside.bind(this));
      }
    }
  }, {
    key: "closeOnEsc",
    value: function closeOnEsc(event) {
      if (event.key === 'Escape') {
        this.visible = false;
      }
    }
  }, {
    key: "focusTrap",
    value: function focusTrap(event) {
      if (event.key !== 'Tab') {
        return;
      }
      var focusableElements = Array.from(this.querySelectorAll(FOCUSABLE_SELECTORS.join(','))).filter(function (child) {
        return child.offsetWidth && child.offsetHeight && child.getClientRects().length;
      });
      var firstFocusableElement = focusableElements.at(0);
      var lastFocusableElement = focusableElements.at(-1);
      if (!event.shiftKey) {
        if (document.activeElement === lastFocusableElement) {
          firstFocusableElement.focus();
          event.preventDefault();
        }
      } else {
        if (document.activeElement === firstFocusableElement) {
          lastFocusableElement.focus();
          event.preventDefault();
        }
      }
    }
  }, {
    key: "closeWhenClickOutside",
    value: function closeWhenClickOutside() {
      this.visible = false;
    }
  }, {
    key: "visible",
    get: function get() {
      return this.hasAttribute('visible');
    },
    set: function set(value) {
      this.dispatchEvent(new CustomEvent(value ? EVENT_SHOW : EVENT_HIDE, {
        cancelable: true,
        bubbles: true
      }));
    }
  }, {
    key: "persistent",
    get: function get() {
      return this.hasAttribute('persistent');
    }
  }, {
    key: "scrollLock",
    get: function get() {
      return this.hasAttribute('scroll-lock');
    }
  }, {
    key: "lockScrolling",
    value: function lockScrolling() {
      document.body.style.overflowY = 'hidden';
    }
  }, {
    key: "unlockScrolling",
    value: function unlockScrolling() {
      document.body.style.overflowY = '';
    }
  }, {
    key: "show",
    value: function show() {
      this.removeAttribute('aria-hidden');
      if (this.scrollLock) {
        this.lockScrolling();
      }
      // Move focus
      this.focus();
      document.body.addEventListener('focus', this.maintainDialogFocus.bind(this), true);
    }
  }, {
    key: "hide",
    value: function hide() {
      this.setAttribute('aria-hidden', 'true');
      if (this.scrollLock) {
        this.unlockScrolling();
      }
      document.body.removeEventListener('focus', this.maintainDialogFocus.bind(this), true);
    }
  }, {
    key: "maintainDialogFocus",
    value: function maintainDialogFocus(event) {
      if (!event.target.closest('[aria-modal="true"]')) {
        this.focus();
      }
    }
  }, {
    key: "render",
    value: function render() {
      this.shadowRoot.innerHTML = "\n      <style>\n        :host {\n          position: fixed;\n          inset: 0;\n          z-index: 2;\n          display: flex;\n          align-items: center;\n          justify-content: center;\n        }\n\n        :host([aria-hidden=\"true\"]) {\n          display: none;\n        }\n\n        .overlay {\n          position: fixed;\n          inset: 0;\n        }\n\n        [role=\"document\"] {\n          background-color: white;\n          padding: 1em;\n          z-index: 2;\n        }\n      </style>\n      <div class=\"overlay\" part=\"overlay\"></div>\n      <div\n        role=\"document\"\n        part=\"dialog\"\n      >\n        <slot></slot>\n      </div>\n    ";
      this.overlayEl = this.shadowRoot.querySelector('.overlay');
      if (!this.hasAttribute('role')) {
        this.setAttribute('role', 'dialog');
      }
      if (!this.hasAttribute('aria-modal')) {
        this.setAttribute('aria-modal', 'true');
      }
      if (!this.hasAttribute('tabindex')) {
        this.setAttribute('tabindex', '-1');
      }
      if (!this.visible) {
        this.hide();
      } else {
        this.show();
      }
    }
  }], [{
    key: "observedAttributes",
    get: function get() {
      return ['visible', 'persistent', 'scroll-lock'];
    }
  }]);
  return ModelDialog;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));
customElements.define('modal-dialog', ModelDialog);

/***/ }),

/***/ "./assets/scripts/modal-dialog/index.scss":
/*!************************************************!*\
  !*** ./assets/scripts/modal-dialog/index.scss ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/postcss-loader/src??ref--7-2!../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!./index.scss */ "./node_modules/css-loader/index.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./assets/scripts/modal-dialog/index.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./assets/scripts/toggle-button/index.js":
/*!***********************************************!*\
  !*** ./assets/scripts/toggle-button/index.js ***!
  \***********************************************/
/*! exports provided: ToggleButton */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ToggleButton", function() { return ToggleButton; });
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }
function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct.bind(); } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var EVENT_OPEN = 'open';
var EVENT_CLOSE = 'close';

/**
 * @example
 * <toggle-button class="toggler" aria-controls="submenu">
 *   Open
 * </toggle-button>
 * <div class="submenu" id="submenu">
 *   Content
 * </div>
 */
var ToggleButton = /*#__PURE__*/function (_HTMLElement) {
  _inherits(ToggleButton, _HTMLElement);
  var _super = _createSuper(ToggleButton);
  function ToggleButton() {
    var _this;
    _classCallCheck(this, ToggleButton);
    _this = _super.call(this);
    _this.attachShadow({
      mode: 'open'
    });
    return _this;
  }
  _createClass(ToggleButton, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      var _this2 = this;
      this.addEventListener(EVENT_OPEN, this.open.bind(this));
      this.addEventListener(EVENT_CLOSE, this.close.bind(this));
      this.addEventListener('keydown', this.handleKeyDown.bind(this));
      this.addEventListener('click', this.toggle.bind(this));
      if (!this.persistent) {
        this.controls.forEach(function (target) {
          target.addEventListener('focusout', _this2.handleTargetContainerBlur.bind(_this2, target));
          target.addEventListener('keydown', _this2.handleTargetContainerKeyDown.bind(_this2));
        });
      }
      this.render();
    }
  }, {
    key: "controls",
    get: function get() {
      var controls = this.getAttribute('aria-controls');
      if (!controls) {
        return [];
      }
      controls = controls.split(' ').map(function (target) {
        return document.getElementById(target);
      });
      return controls;
    }
  }, {
    key: "persistent",
    get: function get() {
      return this.hasAttribute('persistent');
    }
  }, {
    key: "expanded",
    get: function get() {
      return this.getAttribute('aria-expanded') === 'true';
    },
    set: function set(value) {
      this.dispatchEvent(new CustomEvent(value ? EVENT_OPEN : EVENT_CLOSE, {
        cancelable: true,
        bubbles: true
      }));
    }
  }, {
    key: "toggle",
    value: function toggle() {
      this.expanded = !this.expanded;
    }
  }, {
    key: "open",
    value: function open() {
      this.setAttribute('aria-expanded', true);
      this.controls.forEach(function (target) {
        return target.classList.add('is-active');
      });
    }
  }, {
    key: "close",
    value: function close() {
      this.setAttribute('aria-expanded', false);
      this.controls.forEach(function (target) {
        return target.classList.remove('is-active');
      });
    }
  }, {
    key: "handleKeyDown",
    value: function handleKeyDown(event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        this.toggle();
      }
    }
  }, {
    key: "handleTargetContainerKeyDown",
    value: function handleTargetContainerKeyDown(event) {
      if (event.key === 'Escape') {
        this.expanded = false;
      }
    }
  }, {
    key: "handleTargetContainerBlur",
    value: function handleTargetContainerBlur(container, event) {
      var newFocusElement = event.relatedTarget;
      if (newFocusElement && !container.contains(newFocusElement)) {
        this.close();
      }
    }
  }, {
    key: "render",
    value: function render() {
      this.shadowRoot.innerHTML = "\n      <style>\n        :host {\n          cursor: pointer;\n          display: inline-flex;\n          align-items: center;\n          justify-content: center;\n        }\n      </style>\n      <slot/>\n    ";
      if (!this.hasAttribute('role')) {
        this.setAttribute('role', 'button');
      }
      if (!this.hasAttribute('aria-expanded')) {
        this.setAttribute('aria-expanded', 'false');
      }
      if (!this.hasAttribute('tabindex')) {
        this.setAttribute('tabindex', '0');
      }
    }
  }], [{
    key: "observedAttributes",
    get: function get() {
      return ['aria-expanded', 'aria-controls', 'persistent'];
    }
  }]);
  return ToggleButton;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));
customElements.define('toggle-button', ToggleButton);

/***/ }),

/***/ "./assets/scripts/utils.js":
/*!*********************************!*\
  !*** ./assets/scripts/utils.js ***!
  \*********************************/
/*! exports provided: setCookie, getCookie */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setCookie", function() { return setCookie; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCookie", function() { return getCookie; });
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function setCookie(name, value) {
  var domain = location.hostname.split('.').splice(-2).join('.');
  var expires = new Date();
  expires.setMonth(expires.getMonth() + 13);
  document.cookie = "".concat(name, "=").concat(value, "; domain=").concat(domain, "; path=/; SameSite=None; Secure; expires=").concat(expires.toUTCString());
}
function getCookie(cookie) {
  var _iterator = _createForOfIteratorHelper(document.cookie.split(';')),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var item = _step.value;
      var _item$split = item.split('='),
        _item$split2 = _slicedToArray(_item$split, 2),
        name = _item$split2[0],
        value = _item$split2[1];
      if ((name === null || name === void 0 ? void 0 : name.trim()) === cookie) {
        return value;
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return null;
}

/***/ }),

/***/ "./assets/styles/main.scss":
/*!*********************************!*\
  !*** ./assets/styles/main.scss ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./assets/scripts/cookie-consent/index.scss":
/*!*************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./assets/scripts/cookie-consent/index.scss ***!
  \*************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/**\n * Breakpoints & Media Queries\n */\n:root {\n  --gds-heading-font-family: \"Open sans\", sans-serif;\n  --gds-heading-xl-font-size: clamp(\n    32px,\n    (\n      32px +\n      24 *\n      (100vw - 375px) /\n      1025\n    ),\n    56px\n  );\n  --gds-heading-l-font-size: clamp(\n    30px,\n    (\n      30px +\n      6 *\n      (100vw - 375px) /\n      1025\n    ),\n    36px\n  );\n  --gds-heading-m-font-size: clamp(\n    22px,\n    (\n      22px +\n      4 *\n      (100vw - 375px) /\n      1025\n    ),\n    26px\n  );\n  --gds-heading-s-font-size: clamp(\n    18px,\n    (\n      18px +\n      2 *\n      (100vw - 375px) /\n      1025\n    ),\n    20px\n  );\n  --gds-heading-margin-start: var(--block-gutter);\n  --gds-heading-margin-end: var(--block-gutter-s);\n  --gds-body-font-family: \"Open sans\", sans-serif;\n  --gds-body-l-font-size: 18px;\n  --gds-body-m-font-size: 16px;\n  --gds-body-s-font-size: 15px;\n  --gds-link-hover-color: var(--gds-color-primary);\n  --gds-focus-outline: solid 2px currentColor;\n}\n\n:root {\n  --gds-button-color: var(--gds-color-white);\n  --gds-button-background-color: var(--gds-color-primary);\n  --gds-button-s-font-size: 14px;\n  --gds-button-m-font-size: 16px;\n  --gds-button-l-font-size: 18px;\n}\n\n.cookie-consent {\n  --block-gutter: 24px;\n}\n.cookie-consent__cookies {\n  display: none;\n}\n.cookie-consent__cookies.is-active {\n  display: block;\n}\n.cookie-consent gds-accordion {\n  margin-block-start: 0;\n  display: flex;\n  flex-direction: column;\n}\n.cookie-consent gds-accordion-item p {\n  margin: 0;\n}\n.cookie-consent gds-accordion-item [slot=label] {\n  display: flex;\n  gap: 12px;\n  margin-bottom: 0;\n}\n.cookie-consent gds-accordion-item::part(header):focus-visible {\n  outline: solid 2px var(--gds-color-black);\n}\n.cookie-consent gds-accordion-item [slot=icon] {\n  transition: transform 0.2s ease-out;\n}\n.cookie-consent gds-accordion-item[expanded] [slot=icon] {\n  transform: rotate(180deg);\n}\n.cookie-consent gds-accordion-item::part(content) {\n  margin-bottom: 16px;\n  font-size: var(--gds-body-s-font-size);\n}\n@media (max-width: 41.865em) {\n  .cookie-consent .cookie-consent__buttons .wp-block-button__link.wp-block-button__link {\n    font-size: var(--gds-button-s-font-size);\n    padding: 0.9em 2.5em;\n  }\n}\n.cookie-consent #accept-selected-button:not(.is-active) {\n  display: none;\n}\n.cookie-consent #accept-selected-button.is-active + div {\n  display: none;\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./assets/scripts/modal-dialog/index.scss":
/*!***********************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./assets/scripts/modal-dialog/index.scss ***!
  \***********************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "modal-dialog {\n  display: flex;\n  z-index: 100;\n}\nmodal-dialog::part(dialog) {\n  box-sizing: border-box;\n  max-width: 680px;\n  padding: clamp( 24px, ( 24px + 36 * (100vw - 375px) / 1025 ), 60px ) clamp( 12px, ( 12px + 48 * (100vw - 375px) / 1025 ), 60px );\n  border-radius: 10px;\n  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.1019607843);\n  max-height: 90vh;\n  max-height: 90dvh;\n  overflow: auto;\n}\nmodal-dialog::part(overlay) {\n  animation: fade-in 0.2s both;\n  background: rgba(0, 0, 0, 0.1);\n  -webkit-backdrop-filter: blur(2px);\n          backdrop-filter: blur(2px);\n}\nmodal-dialog[aria-hidden] {\n  display: none;\n}\nmodal-dialog > * {\n  margin-block-start: var(--block-gutter-start, var(--block-gutter));\n  margin-block-end: var(--block-gutter-end, var(--block-gutter));\n}\n\n@keyframes fade-in {\n  from {\n    opacity: 0;\n  }\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/lib/css-base.js":
/*!*************************************************!*\
  !*** ./node_modules/css-loader/lib/css-base.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ "./node_modules/style-loader/lib/addStyles.js":
/*!****************************************************!*\
  !*** ./node_modules/style-loader/lib/addStyles.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target, parent) {
  if (parent){
    return parent.querySelector(target);
  }
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target, parent) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target, parent);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(/*! ./urls */ "./node_modules/style-loader/lib/urls.js");

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertAt.before, target);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	if(options.attrs.nonce === undefined) {
		var nonce = getNonce();
		if (nonce) {
			options.attrs.nonce = nonce;
		}
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function getNonce() {
	if (false) {}

	return __webpack_require__.nc;
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = typeof options.transform === 'function'
		 ? options.transform(obj.css) 
		 : options.transform.default(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ "./node_modules/style-loader/lib/urls.js":
/*!***********************************************!*\
  !*** ./node_modules/style-loader/lib/urls.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),

/***/ 0:
/*!****************************************************************!*\
  !*** multi ./assets/scripts/main.js ./assets/styles/main.scss ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /Users/shayanabbas/Work/vmsport/web/app/mu-plugins/genero-cmp/assets/scripts/main.js */"./assets/scripts/main.js");
module.exports = __webpack_require__(/*! /Users/shayanabbas/Work/vmsport/web/app/mu-plugins/genero-cmp/assets/styles/main.scss */"./assets/styles/main.scss");


/***/ })

/******/ });