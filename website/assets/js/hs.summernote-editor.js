/*
* Summernote Editor wrapper
* @version: 2.0.0 (Mon, 25 Nov 2019)
* @requires: jQuery v3.0 or later, Summernote v0.8.10
* @author: HtmlStream
* @event-namespace: .HSCore.components.HSSummernoteEditor
* @license: Htmlstream Libraries (https://htmlstream.com/licenses)
* Copyright 2020 Htmlstream
*/

;(function ($) {
	'use strict';

	$.HSCore.components.HSSummernoteEditor = {
		defaults: {
			fontNames: ["Arial", "Arial Black", "Comic Sans MS", "Courier New", "Helvetica Neue", "Helvetica", "Impact", "Lucida Grande", "Tahoma", "Times New Roman", "Verdana"],
			height: 100
		},

		init: function (el, options) {
			if (!el.length) return;

			var context = this,
				defaults = Object.assign({}, context.defaults),
				dataSettings = el.attr('data-hs-summernote-editor-options') ? JSON.parse(el.attr('data-hs-summernote-editor-options')) : {},
				settings = {};
			settings = $.extend(defaults, settings, dataSettings);
			settings = $.extend(settings, {
				hint: settings.mentions ? {
					match: /\B@(\w*)$/,
					search: function (keyword, callback) {
						callback($.grep(settings.mentions, function (item) {
							return item.indexOf(keyword) === 0;
						}));
					},
					content: function (item) {
						return '@' + item;
					}
				} : false
			}, options);

			/* Start : Init */

			var newSummernoteEditor = el.summernote(settings);

			/* End : Init */

			return newSummernoteEditor;
		},

		methods: function (el) {
			var args = Array.prototype.slice.call(arguments, 1);

			$.fn.summernote.apply(el, args);
		}
	};

})(jQuery);
