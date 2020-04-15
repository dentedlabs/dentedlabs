/*
* Selectpicker wrapper
* @version: 2.0.0 (Mon, 25 Nov 2019)
* @requires: jQuery v3.0 or later, Bootstrap Select v1.13.10
* @author: HtmlStream
* @event-namespace: .HSCore.components.HSSelectPicker
* @license: Htmlstream Libraries (https://htmlstream.com/licenses)
* Copyright 2020 Htmlstream
*/

;(function ($) {
	'use strict';

	$.HSCore.components.HSSelectPicker = {
		defaults: {
			liveSearchFieldStyle: null
		},

		init: function (el, options) {
			if (!el.length) return;

			var context = this,
				defaults = Object.assign({}, context.defaults),
				dataSettings = el.attr('data-hs-selectpicker-options') ? JSON.parse(el.attr('data-hs-selectpicker-options')) : {},
				settings = {};
			settings = $.extend(defaults, settings, dataSettings, options);

			/* Start : Init */

			var newSelectpicker = el.selectpicker(settings);

			/* End : Init */

			/* Start : custom functionality implementation */

			newSelectpicker.on('loaded.bs.select', function () {
				var $searchbox = el.siblings('.dropdown-menu ').find('.bs-searchbox');

				if (!settings.liveSearchFieldStyle) return;

				$searchbox.addClass(settings.liveSearchFieldStyle);
			});

			/* End : custom functionality implementation */

			return newSelectpicker;
		}
	};

})(jQuery);
