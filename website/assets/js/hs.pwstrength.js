/*
* PWStrength wrapper
* @version: 2.0.0 (Mon, 25 Nov 2019)
* @requires: jQuery v3.0 or later, pwstrength-bootstrap v3.0.1
* @author: HtmlStream
* @event-namespace: .HSCore.components.HSPWStrength
* @license: Htmlstream Libraries (https://htmlstream.com/licenses)
* Copyright 2020 Htmlstream
*/

;(function ($) {
	'use strict';

	$.HSCore.components.HSPWStrength = {
		defaults: {
			ui: {
				verdicts: [
					"Very Weak",
					"Weak",
					"Normal",
					"Medium",
					"Strong",
					"Very Strong"
				],
				container: false,
				viewports: {
					progress: false,
					verdict: false
				},
				progressExtraCssClasses: false
			}
		},

		init: function (el, options) {
			if (!el.length) return;

			var context = this,
				defaults = Object.assign({}, context.defaults),
				dataSettings = el.attr('data-hs-pwstrength-options') ? JSON.parse(el.attr('data-hs-pwstrength-options')) : {},
				settings = {};
			settings = $.extend(true, defaults, settings, dataSettings, options);

			/* Start : Init */

			var newPWStrength = el.pwstrength(settings);

			/* End : Init */

			return newPWStrength;
		},

		methods: function (el) {
			var args = Array.prototype.slice.call(arguments, 1);

			$.fn.pwstrength.apply(el, args);
		}
	};

})(jQuery);
