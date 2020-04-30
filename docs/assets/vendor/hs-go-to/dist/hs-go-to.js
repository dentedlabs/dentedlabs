(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["HSGoTo"] = factory();
	else
		root["HSGoTo"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/hs-go-to.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/hs-go-to.js":
/*!****************************!*\
  !*** ./src/js/hs-go-to.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar HSGoTo = function () {\n\tfunction HSGoTo(elem, settings) {\n\t\t_classCallCheck(this, HSGoTo);\n\n\t\tthis.elem = elem;\n\t\tthis.defaults = {\n\t\t\tpageContainerSelector: 'html, body',\n\t\t\ttargetSelector: null,\n\t\t\tcompensationSelector: null,\n\n\t\t\tanimationInit: 'animated',\n\t\t\tanimationIn: 'fadeInUp',\n\t\t\tanimationOut: 'fadeOutDown',\n\t\t\tduration: 800,\n\n\t\t\toffsetTop: 0,\n\t\t\tposition: {\n\t\t\t\tinit: null,\n\t\t\t\thide: null,\n\t\t\t\tshow: null\n\t\t\t},\n\n\t\t\tisReferencedToOtherPage: null,\n\t\t\tpreventEventClass: 'hs-go-to-prevent-event'\n\t\t};\n\t\tthis.settings = settings;\n\t}\n\n\t_createClass(HSGoTo, [{\n\t\tkey: 'init',\n\t\tvalue: function init() {\n\t\t\tvar context = this,\n\t\t\t    $el = context.elem,\n\t\t\t    dataSettings = $el.attr('data-hs-go-to-options') ? JSON.parse($el.attr('data-hs-go-to-options')) : {},\n\t\t\t    options = $.extend(true, context.defaults, dataSettings, context.settings);\n\n\t\t\toptions.targetOffsetTop = function () {\n\t\t\t\tif ($(options.compensationSelector).length) {\n\t\t\t\t\treturn $(options.targetSelector) ? $(options.targetSelector).offset().top - $(options.compensationSelector).outerHeight() : 0;\n\t\t\t\t} else {\n\t\t\t\t\treturn $(options.targetSelector) ? $(options.targetSelector).offset().top : 0;\n\t\t\t\t}\n\t\t\t};\n\n\t\t\tcontext._prepareObject($el, options);\n\n\t\t\t// Set Position\n\t\t\tif (options.position) {\n\t\t\t\tcontext._setPosition($el, options.position.init);\n\t\t\t}\n\n\t\t\t// Click Events\n\t\t\t$el.on('click', function (e) {\n\t\t\t\tcontext._clickEvents($el, options, e);\n\t\t\t});\n\n\t\t\t// Scroll Events\n\t\t\tif (options.animationIn && options.animationOut) {\n\t\t\t\t$(window).on('scroll', function () {\n\t\t\t\t\tcontext._scrollEvents($el, options);\n\t\t\t\t});\n\t\t\t}\n\t\t}\n\t}, {\n\t\tkey: '_prepareObject',\n\t\tvalue: function _prepareObject(el, params) {\n\t\t\tvar options = params;\n\n\t\t\tif (params.animationIn && params.animationOut) {\n\t\t\t\tif (navigator.userAgent.match('MSIE 10.0;')) {\n\t\t\t\t\t$('html').addClass('ie10');\n\t\t\t\t}\n\n\t\t\t\tel.addClass(options.animationInit + ' ' + options.animationOut + ' ' + options.preventEventClass);\n\t\t\t}\n\t\t}\n\t}, {\n\t\tkey: '_setPosition',\n\t\tvalue: function _setPosition(el, params) {\n\t\t\tvar options = params;\n\n\t\t\tel.css(options);\n\t\t}\n\t}, {\n\t\tkey: '_clickEvents',\n\t\tvalue: function _clickEvents(el, params, event) {\n\t\t\tvar options = params;\n\n\t\t\tif (!options.isReferencedToOtherPage) {\n\t\t\t\tif (event) {\n\t\t\t\t\tevent.preventDefault();\n\t\t\t\t}\n\n\t\t\t\t$(options.pageContainerSelector).stop().animate({\n\t\t\t\t\tscrollTop: options.targetOffsetTop()\n\t\t\t\t}, options.duration);\n\t\t\t}\n\t\t}\n\t}, {\n\t\tkey: '_scrollEvents',\n\t\tvalue: function _scrollEvents(el, params) {\n\t\t\tvar options = params;\n\n\t\t\tel.css('visibility', '');\n\n\t\t\tif ($(window).scrollTop() >= options.offsetTop) {\n\t\t\t\tif (options.position.show) {\n\t\t\t\t\tel.css(options.position.show);\n\t\t\t\t}\n\n\t\t\t\tel.removeClass(options.animationOut).addClass(options.animationIn);\n\t\t\t} else {\n\t\t\t\tif (options.position.hide) {\n\t\t\t\t\tel.css(options.position.hide);\n\t\t\t\t}\n\n\t\t\t\tel.removeClass(options.animationIn).addClass(options.animationOut);\n\t\t\t}\n\t\t}\n\t}]);\n\n\treturn HSGoTo;\n}();\n\nexports.default = HSGoTo;\n\n//# sourceURL=webpack://HSGoTo/./src/js/hs-go-to.js?");

/***/ })

/******/ })["default"];
});