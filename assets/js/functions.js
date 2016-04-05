/*
---
name: classie 1.0.1
description: makes number formatting not awful
//github.com/ded/bonzo
MIT license
...
*/

!function(s){"use strict";function e(s){return new RegExp("(^|\\s+)"+s+"(\\s+|$)")}function n(s,e){var n=t(s,e)?c:a;n(s,e)}var t,a,c;"classList"in document.documentElement?(t=function(s,e){return s.classList.contains(e)},a=function(s,e){s.classList.add(e)},c=function(s,e){s.classList.remove(e)}):(t=function(s,n){return e(n).test(s.className)},a=function(s,e){t(s,e)||(s.className=s.className+" "+e)},c=function(s,n){s.className=s.className.replace(e(n)," ")});var o={hasClass:t,addClass:a,removeClass:c,toggleClass:n,has:t,add:a,remove:c,toggle:n};"function"==typeof define&&define.amd?define(o):"object"==typeof exports?module.exports=o:s.classie=o}(window);

/*
---
name: Selectors
description: Deals with selecting of things
details: inspired by //product.voxmedia.com/til/2015/2/16/8047537/easy-selector-engine-with-vanilla-javascript
provides: $, $$
...
*/

var $ = document.getElementById.bind(document);
var $$ = document.querySelectorAll.bind(document);

/*
---
name: onReady
description: Checks for the dom being ready and loaded
http://javascript.info/tutorial/onload-ondomcontentloaded
provides: onReady
...
*/

function bindReady(handler){

	var called = false

	function ready() {
		if (called) return
		called = true
		handler()
	}

	if ( document.addEventListener ) { // native event
		document.addEventListener( "DOMContentLoaded", ready, false )
	}
	else if ( document.attachEvent ) {	// IE
		try {
			var isFrame = window.frameElement != null
		} catch(e) {}

		// IE, the document is not inside a frame
		if ( document.documentElement.doScroll && !isFrame ) {
			function tryScroll(){
				if (called) return
				try {
					document.documentElement.doScroll("left")
					ready()
				} catch(e) {
					setTimeout(tryScroll, 10)
				}
			}
			tryScroll()
		}

		// IE, the document is inside a frame
		document.attachEvent("onreadystatechange", function(){
			if ( document.readyState === "complete" ) {
				ready()
			}
		})
	}

	// Old browsers
	if (window.addEventListener)
			window.addEventListener('load', ready, false)
	else if (window.attachEvent)
			window.attachEvent('onload', ready)
	else {
		var fn = window.onload // very old browser, copy old onload
		window.onload = function() { // replace by new onload and call the old one
			fn && fn()
			ready()
		}
	}
}

var readyList = []

function onReady(handler) {
	
	function executeHandlers() {
		for(var i=0; i<readyList.length; i++) {
			readyList[i]()
		}
	}

	if (!readyList.length) { // set handler on first run
		bindReady(executeHandlers)
	}

	readyList.push(handler)
}

/*
---
name: mobileCheck
description: Checks if we're on a mobile device
details: inspired by //stackoverflow.com/a/11381730/989439
provides: mobileCheck
...
*/

function mobileCheck () {
	var check = false;
	(function(a){if(/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
	return check;
}

/*
---
name: smallScreenCheck
description: Checks if we're on a mobile device
details: inspired by //stackoverflow.com/a/11381730/989439
provides: smallScreenCheck
...
*/

function smallScreenCheck () {
	if (self.innerHeight)
		return self.innerWidth < 1024;
	else if (document.documentElement && document.documentElement.clientHeight)
		return document.documentElement.clientWidth < 1024;
	else if (document.body)
		return document.body.clientWidth < 1024;
}

/*
---
name: toggleMode
description: simple class toggle for a trigger and target using Classie
Inspired by //tympanus.net/codrops/2013/07/30/google-nexus-website-menu/
provides: toggleMode
...
*/

;(function(window) {
	'use strict';

	function toggleMode (trigger, target, options) {
		if (typeof options === 'undefined')
			this.options = {};
		else
			this.options = options;

		this.activeTriggerClass = (typeof this.options.activeTriggerClass !== 'undefined')
			? this.options.activeTriggerClass
			: 'active_trigger';

		this.activeTargetClass = (typeof this.options.activeTargetClass !== 'undefined')
			? this.options.activeTargetClass
			: 'active_target';

		this.autoTrigger = (typeof this.options.autoTrigger === 'undefined' || this.options.autoTrigger)
			? true
			: false;

		this.passThrough = (typeof this.options.passThrough === 'undefined' || this.options.passThrough)
			? true
			: false;

		this.isMenuOpen = (typeof this.options.autoTrigger === 'undefined' || !this.options.startOpen)
			? false
			: true;

		this.trigger = trigger;
		this.target = target;
		this._init();
	}

	toggleMode.prototype = {
		_init : function() {
			this.mobile = mobileCheck();
			this.smallScreen = smallScreenCheck();
			this.eventType = mobileCheck() ? 'touchstart' : 'click';
			this._initEvents();

			var self = this;

			this.bodyClickFn = function() {
				self._close();
				this.removeEventListener(self.eventType, self.bodyClickFn);
			};
		},

		_initEvents : function() {
			var self = this;

			this.trigger.addEventListener(this.eventType, function(e) {
				e.stopPropagation();
				e.preventDefault();

				if (self.isMenuOpen) {
					self._close();

					if (self.autoTrigger)
						document.removeEventListener(self.eventType, self.bodyClickFn);
				}
				else {
					self._open();

					if (self.autoTrigger)
						document.addEventListener(self.eventType, self.bodyClickFn);
				}
			});

			if (self.autoTrigger && self.passThrough)
				this.target.addEventListener(this.eventType, function(e) { e.stopPropagation(); });
		},

		_open : function() {
			if (this.isMenuOpen)
				return;

			this.isMenuOpen = true;

			classie.add(this.trigger, this.activeTriggerClass);
			classie.add(this.target, this.activeTargetClass);
		},

		_close : function() {
			if (!this.isMenuOpen)
				return;

			this.isMenuOpen = false;

			classie.remove(this.trigger, this.options.activeTriggerClass);
			classie.remove(this.target, this.options.activeTargetClass);
		}
	}

	// add to global namespace
	window.toggleMode = toggleMode;

})(window);