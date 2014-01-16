/**
* jquery.tabify
* Copyright (C) 2014  Oleksandr Knyga, oleksandrknyga@gmail.com
* 
* This program is free software: you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.
* 
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU General Public License for more details.
 */

(function($) {

	var settings;

	/**
	 * Tab constructor
	 * @param {string} name
	 * @param {array} names array with tab names
	 */
	var Tab = function(head, names) {
		var name = head.attr('href').substr(2);
		this.head = head;
		this.element = $('#' + name).eq(0);
		this.isExists = this.element.length > 0;
		this.hasParent = false;
		this.parent = null;
		this.name = name;

		//looks for parents
		//no more than one level deep
		for (var i = 0, length = names.length; i < length; i++) {
			var parent = this.element.parents('#' + names[i]);

			if (parent.length > 0) {
				this.parent = parent;
				this.hasParent = true;
				break;
			}
		}

		this.elements = {};
		this.initElements(this);
	};

	Tab.prototype = {
		toogle: function() {
			tabs.getActive().hide();
			this.show();
		},
		show: function() {
			if (this.hasParent) {
				this.parent.show();

				$('html, body').animate({
					scrollTop: this.element.offset().top
				}, settings.scrollTime);
			} else {
				this.element.show();
				tabs.active = this.name;
			}

			$('.'+settings.activeClass).removeClass(settings.activeClass);
			this.head.addClass(settings.activeClass);
		},
		hide: function() {
			if (this.hasParent) {
				this.parent.hide();
			} else {
				this.element.hide();
				tabs.active = "";
			}
		},
		/**
		 * Initialize collection's media files
		 */
		initElements: function() {
			var that = this,
				name = this.name;

			this.element.find('*[data-id]').each(function() {
				var id = $(this).data('id');
				
				$(this).click(function() {
					router.ignoreChange("#/" + name + "/" + id);
				});

				that.elements[id] = $(this);
			});
		},
		getElement: function(id) {
			return this.elements[id];
		}
	};


	var tabs = {
		/**
		 * deault tab name
		 * @type {String}
		 */
		_default: "",
		/**
		 * currently active tab name
		 * @type {String}
		 */
		active: "",
		/**
		 * tab list
		 * @type {Object}
		 */
		_list: {},
		_onReady: function() {},
		/**
		 * Scan tabs; this context - tab list
		 */
		scan: function() {

			var heads = {}
			names = [];

			$(this).find("a[href^='#'][data-tab='true']").each(function() {
				var $this = $(this);
				var name = $this.attr('href').substr(1),
					active = $this.data('active');

				heads[name] = $this;
				names.push(name);

				if ("undefined" !== typeof active && ("0" !== active || "false" !== active)) {
					tabs.active = name;
				}

				$this.attr('href', '#/' + $this.attr('href').substr(1));
			});

			for (var i = 0, length = names.length, tname = ""; i < length; i++) {
				tname = names[i];
				tabs._list[tname] = new Tab(heads[tname], names);
			}

			if (!tabs.active && 0 < names.length) {
				tabs.active = names[0];
			}

			tabs._default = tabs.active;

			for (var i = 0, length = names.length, tname = ""; i < length; i++) {
				tname = names[i];

				if(tname != tabs.active) {
					tabs.get(names[i]).hide();
				}
			}

			tabs.getActive().show();
;
			tabs.get(tabs._default).head.attr('href', '#');

			tabs._onReady.apply(tabs);
		},
		onReady: function(f) {
			if ("function" === typeof f) {
				tabs._onReady = f;
			}
		},
		getActive: function() {
			if (tabs._list.hasOwnProperty(tabs.active)) {
				return tabs._list[tabs.active];
			} else {
				return tabs._list[tabs._default];
			}
		},
		get: function(name) {
			if (tabs._list.hasOwnProperty(name)) {
				return tabs._list[name];
			} else {
				return tabs._list[tabs._default];
			}
		}
	};

	var router = {
		/**
		 * onChange will be skipped if true
		 * @type {Boolean}
		 */
		_ignoreOne: false,
		init: function() {
			$(window).on('hashchange', router.handle);
		},
		handle: function() {
			var hash = /#\/([^\/]*)(\/(.+))?\/?/.exec(location.hash);

			if('' === location.hash) {
				var href = String(document.location.href)
					.replace(/\#.*/, '')
					.replace(location.protocol + '//' + location.host, '');

				window.history.replaceState(null, $('title').text(), href);
			}

			if (null == hash) {
				router.onChange(tabs._default);
			} else {
				var name = hash[1],
					id = hash[3];

				router.onChange(name, id);
			}
		},

		/**
		 * when location is changed
		 */
		onChange: function(name, id) {
			if(router._ignoreOne) {
				router._ignoreOne = false;
				return;
			}

			var tab = tabs.get(name);
			var element = tab.getElement(id);
			tab.toogle();

			if(element) {
				element.click();
			}
		},
		/**
		 * changes hash, but doesnt calling onChange
		 * @return {[type]}
		 */
		ignoreChange: function(hash) {
			router._ignoreOne = true;
			location.hash = hash;

		}
	};


	$.fn.tabify = function(options) {

		settings = $.extend({}, $.fn.tabify.defaults, options);

		router.init();
		tabs.onReady(function() {
			$(document).ready(function() {
				router.handle();
			});
		});
		return this.each(function() {
			tabs.scan.apply(this);
		});
	};

	$.fn.tabify.defaults = {
		/**
		 * scroll animation time
		 * @type {Number}
		 */
		scrollTime: 500,
		/**
		 * active className
		 * @type {String}
		 */
		activeClass: 'active'
	};

}(jQuery));