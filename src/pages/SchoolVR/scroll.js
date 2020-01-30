const FrameImpulse = (function() {

  var vendors = ['webkit', 'moz'];

  var r = {};
  var listeners = [], numListeners = 0, toRemove = [], numToRemove;
  var lastTime = 0;

    for(var i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
        window.requestAnimationFrame = window[vendors[i] + 'RequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { 
              callback(currTime + timeToCall); 
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }

  var run = function(deltaTime) {
    requestAnimationFrame(run);

    if(numListeners == 0) return;
    
    for(var i = 0; i < numListeners; i++) {
      listeners[i].call(deltaTime);
    }

    if(numToRemove > 0) {
      var indexToRemove = [];
      for (var i = listeners.length - 1; i >= 0; i--) {
        for (var j = 0; j < toRemove.length; j++) {
          if (listeners[i] === toRemove[j])
            indexToRemove.push(i);
        };
      };

      for (var i = 0; i < indexToRemove.length; i++) {
        listeners.splice(indexToRemove[i], 1);
      };

      numListeners = listeners.length;
      toRemove = [];
      numToRemove = 0;
    }		
  }

  r.on = function(f) {
    document.body.scrollTo(0,0);
    if(listeners.indexOf(f) > -1) { return; }
    listeners.push(f);
    numListeners = listeners.length;
    // console.log("FrameImpulse > new listener > total :", numListeners);
  }

  r.off = function(f) {
    //toRemove.push(f);
    //numToRemove = toRemove.length;
    var i = listeners.indexOf(f);
    if(i == -1) return;
    listeners.splice(i, 1);
    numListeners = listeners.length;
    // console.log("FrameImpulse > scheduled removal > total :", numListeners);
  }

  r.getListeners = function() {
    return listeners;
  }

  run();
  return r;

})();











var VirtualScroll = (function(document) {

var vs = {};

var numListeners, listeners = [], initialized = false;

var touchStartX, touchStartY;

// [ These settings can be customized with the options() function below ]
// Mutiply the touch action by two making the scroll a bit faster than finger movement
var touchMult = 2;
// Firefox on Windows needs a boost, since scrolling is very slow
var firefoxMult = 15;
// How many pixels to move with each key press
var keyStep = 120;
// General multiplier for all mousehweel including FF
var mouseMult = 1;

var bodyTouchAction;

var hasWheelEvent = 'onwheel' in document;
var hasMouseWheelEvent = 'onmousewheel' in document;
var hasTouch = 'ontouchstart' in document;
var hasKeyDown = 'onkeydown' in document;

var hasTouchWin = navigator.msMaxTouchPoints && navigator.msMaxTouchPoints > 1;
var hasPointer = !!window.navigator.msPointerEnabled;

var isFirefox = navigator.userAgent.indexOf('Firefox') > -1;

var event = {
  y: 0,
  x: 0,
  deltaX: 0,
  deltaY: 0,
  originalEvent: null
};

var k = {
  left : 37,
  right : 39,
  up : 38,
  down : 40,
}

vs.on = function(f) {
  if(!initialized) initListeners(); 

  var i = listeners.indexOf(f);
  if(i != -1) return;

  listeners.push(f);
  numListeners = listeners.length;
}

/**
 *	@method options
 *	@memberof VirtualScroll
 *	@static
 *
 *	@param {Object} opt - object literal containing one or more options from the list above, specified as properties.
 *
 *	@description Sets custom parameters to the VirtualScroll (globally). The following options are supported:
 *
 *	<ul>
 *	<li>touchMult (default: 2) - mutiply the touch action to make the scroll a faster/slower than finger movement</li>
 *	<li>firefoxMult (defailt: 15)- Firefox on Windows needs a boost, since scrolling is very slow</li>
 *	<li>keyStep (default: 120) - specified how many pixels to move with each key press</li>
 *	<li>mouseMult (default: 1) - general multiplier for all mousehweel events including FF</li>
 *	</ul>
 */
vs.options = function(opt) {
  keyStep = opt.keyStep || 120;
  firefoxMult = opt.firefoxMult || 15;
  touchMult = opt.touchMult || 2;
  mouseMult = opt.mouseMult || 1;
}

vs.off = function(f) {
  var i = listeners.indexOf(f);
  if(i == -1) return;

  listeners.splice(i, 1);
  numListeners = listeners.length;
  if(numListeners <= 0) destroyListeners();
}

/**
 *	@method lockTouch
 *	@memberof VirtualScroll
 *	@static
 *
 *	@description For VirtualScroll to work on mobile, the default swipe-to-scroll behavior needs to be turned off. 
 *	This function will take care of that, however it's a failt simple mechanism - see in the source code, linked below.
 */
vs.lockTouch = function() {
  document.addEventListener('touchmove', function(e) {
    e.preventDefault();
  });
}

var notify = function(e) {
  event.x += event.deltaX;
  event.y += event.deltaY;
  event.originalEvent = e;

  for(var i = 0; i < numListeners; i++) {
    listeners[i](event);
  }
}

var onWheel = function(e) {
  // In Chrome and in Firefox (at least the new one)
  event.deltaX = e.wheelDeltaX || e.deltaX * -1;
  event.deltaY = e.wheelDeltaY || e.deltaY * -1;

  // for our purpose deltamode = 1 means user is on a wheel mouse, not touch pad 
  // real meaning: https://developer.mozilla.org/en-US/docs/Web/API/WheelEvent#Delta_modes
  if(isFirefox && e.deltaMode == 1) {
    event.deltaX *= firefoxMult;
    event.deltaY *= firefoxMult;
  } 

  event.deltaX *= mouseMult;
  event.deltaY *= mouseMult;

  notify(e);
}

var onMouseWheel = function(e) {
  // In Safari, IE and in Chrome if 'wheel' isn't defined
  event.deltaX = (e.wheelDeltaX) ? e.wheelDeltaX : 0;
  event.deltaY = (e.wheelDeltaY) ? e.wheelDeltaY : e.wheelDelta;

  notify(e);	
}

var onTouchStart = function(e) {
  var t = (e.targetTouches) ? e.targetTouches[0] : e;
  touchStartX = t.pageX;	
  touchStartY = t.pageY;
}

var onTouchMove = function(e) {
  // e.preventDefault(); // < This needs to be managed externally
  var t = (e.targetTouches) ? e.targetTouches[0] : e;

  event.deltaX = (t.pageX - touchStartX) * touchMult;
  event.deltaY = (t.pageY - touchStartY) * touchMult;
  
  touchStartX = t.pageX;
  touchStartY = t.pageY;

  notify(e);
}

var onKeyDown = function(e) {
  // 37 left arrow, 38 up arrow, 39 right arrow, 40 down arrow
  event.deltaX = event.deltaY = 0;
  switch(e.keyCode) {
    case k.left:
      event.deltaX = -keyStep;
      break;
    case k.right:
      event.deltaX = keyStep;
      break;
    case k.up:
      event.deltaY = keyStep;
      break;
    case k.down:
      event.deltaY = -keyStep;
      break;
  }

  notify(e);
}

var initListeners = function() {
  if(hasWheelEvent) document.addEventListener("wheel", onWheel);
  if(hasMouseWheelEvent) document.addEventListener("mousewheel", onMouseWheel);

  if(hasTouch) {
    document.addEventListener("touchstart", onTouchStart);
    document.addEventListener("touchmove", onTouchMove);
  }
  
  if(hasPointer && hasTouchWin) {
    bodyTouchAction = document.body.style.msTouchAction;
    document.body.style.msTouchAction = "none";
    document.addEventListener("MSPointerDown", onTouchStart, true);
    document.addEventListener("MSPointerMove", onTouchMove, true);
  }

  if(hasKeyDown) document.addEventListener("keydown", onKeyDown);

  initialized = true;
}

var destroyListeners = function() {
  if(hasWheelEvent) document.removeEventListener("wheel", onWheel);
  if(hasMouseWheelEvent) document.removeEventListener("mousewheel", onMouseWheel);

  if(hasTouch) {
    document.removeEventListener("touchstart", onTouchStart);
    document.removeEventListener("touchmove", onTouchMove);
  }
  
  if(hasPointer && hasTouchWin) {
    document.body.style.msTouchAction = bodyTouchAction;
    document.removeEventListener("MSPointerDown", onTouchStart, true);
    document.removeEventListener("MSPointerMove", onTouchMove, true);
  }

  if(hasKeyDown) document.removeEventListener("keydown", onKeyDown);

  initialized = false;
}

return vs;
})(document);


(function(w){
	//
	// animation frame
	//
	w.requestAnimationFrame = w.requestAnimationFrame
	|| w.mozRequestAnimationFrame
	|| w.webkitRequestAnimationFrame
	|| w.msRequestAnimationFrame
	|| function(f){return setTimeout(f, 1000/60)} // simulate calling code 60 

	w.cancelAnimationFrame = w.cancelAnimationFrame
	|| w.mozCancelAnimationFrame
	|| function(requestID){clearTimeout(requestID)} //fall back

	//
	// URLSearchParams polyfill
	//
	w.URLSearchParams = w.URLSearchParams || function (searchString) {
		var self = this;
		self.searchString = searchString;
		self.get = function (name) {
			var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(self.searchString);
			if (results == null) {
				return null;
			}
			else {
				return decodeURI(results[1]) || 0;
			}
		};
	}
})(window);



var isMobile = function(){
	return window.innerWidth <= 1024;
}
var isPhone = function(){
	return window.innerWidth < 768;
}


	
//
// Async loading
//
var loadScript = function(src, callback)
{
	var s,
		r,
		t;
		r = false;
	s = document.createElement('script');
	s.type = 'text/javascript';
	s.src = src;
	s.onload = s.onreadystatechange = function() {
		//console.log( this.readyState ); //uncomment this line to see which ready states are called.
		if ( !r && (!this.readyState || this.readyState == 'complete') )
		{
			r = true;
			callback();
		}
	};
	t = document.getElementsByTagName('script')[0];
	t.parentNode.insertBefore(s, t);
}



//
// Random
//
var random = function( min , max , isRound ){
	var ran = (Math.random() * (max - min)) + min;
	if(isRound)
		return Math.round(ran);
	else
		return ran;
}




//
// Add, Remove and Has Class
//
var hasClass = function(el, className){
	if(el.classList)
		return el.classList.contains(className)
	else
		return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
}

var  addClass = function(el, className){
	if(el.classList)
		el.classList.add(className)
	else if(!hasClass(el, className)) el.className += " " + className
}

var removeClass = function(el, className){
	var isNodelist = (typeof el.length != 'undefined' && typeof el.item != 'undefined')
	if(isNodelist){
		var els = el;

		for(var i=0; els[i]; i++){
			if(els[i].classList)
				els[i].classList.remove(className)
			else if(hasClass(els[i], className)){
				var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
				els[i].className=els[i].className.replace(reg, ' ')
			}
		}
	}
	else{
		if(el.classList)
			el.classList.remove(className)
		else if(hasClass(el, className)){
			var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
			el.className=el.className.replace(reg, ' ')
		}
	}
}



//
// Add and Remove Event
//
var addEvent = function( obj , type , callback ){
    if (obj == null || typeof(obj) == 'undefined') return;

    if (obj.addEventListener)
        obj.addEventListener(type, callback, false);
    else if (obj.attachEvent)
        obj.attachEvent("on" + type, callback);
    else 
        obj["on"+type] = callback;
}
var removeEvent = function( obj , type , func ){
    if(obj.removeEventListener)
		obj.removeEventListener( type , func , false );
}





var setTranslate = function(elem, x, y, z) {
    elem.style.webkitTransform = 'translate3d(' + x + ',' + y + ',' + z + ')';
    elem.style.msTransform = 'translate3d(' + x + ',' + y + ',' + z + ')';
	elem.style.transform = 'translate3d(' + x + ',' + y + ',' + z + ')';
}


//
//  Virtual Scroll
//
var SmoothScroll = function(elem, scrollFunc){
	
	var _this = this;

	// Grab both red boxes
    this.elem = document.querySelector(elem);

    // Check how much we can scroll. This value is the 
	// height of the scrollable element minus the height of the widow
	var fullElemHeight = this.elem.getBoundingClientRect().height;
    var elemHeight = this.elem.getBoundingClientRect().height - window.innerHeight;

    // Add easing to the scroll. Play with this value to find a setting that you like.
    var ease = .1;
    var mult = .7;
	
    // Store current scroll position
    var targetX = 0, targetY = 0;
	var currentX = 0, currentY = 0;
	
	// scroll bar padding
	var showScrollBar = false;
	var padding = 3;

	var disable = false;
	var isSelf = false;
    
    var onScroll = function(e) {
	    if(!disable && isSelf){
			// Accumulate delta value on each scroll event
			targetY += e.deltaY * mult;
			targetX += e.deltaX * mult;

			// Clamp the value so it doesn't go too far up or down
			// The value needs to be between 0 and -elemHeight
			targetY = Math.max(-elemHeight, targetY);
			targetY = Math.min(0, targetY);
		}
    }
    
    var onAnim = function() {
        // Make sure this works across different browsers (use the shim or something)

		// keep at bottom while resizing
		if(-targetY > elemHeight)
			targetY = -elemHeight+1;
			
        // Get closer to the target value at each frame, using ease. 
        // Other easing methods are also ok.
        currentY += (targetY - currentY) * ease;

        // Uncomment this line to scroll horizontally
        // currentX += (targetX - currentX) * ease;
        
        // Apply CSS style
        setTranslate( _this.elem , currentX.toFixed(4) +'px' , currentY.toFixed(4) +'px' , 0+'px' );
		
		refresh();

        if( scrollFunc )
			scrollFunc( currentY / elemHeight , currentY , elemHeight );
		
		if(showScrollBar)
			if(fullElemHeight > _this.elem.parentNode.offsetHeight)
				rePositionScrollBar(currentY);

		lazyLoad.checkAndShowImg();
	}

	// detect that if hovered scroll container
	addEvent(_this.elem, 'mouseenter', function(){
		isSelf = true;
	});
	addEvent(_this.elem, 'mouseleave', function(){
		isSelf = false;
	});
	
	var initScrollBar = function(){
		_this.oldMouseY = 0;
		_this.scrollBarWrap = document.createElement('div');
		_this.scrollBar = document.createElement('div');

		_this.scrollBarWrap.setAttribute('id','scrollBarWrap');
		_this.scrollBar.setAttribute('id','scrollBar');

		addEvent(_this.scrollBar, 'mousedown', onMouseDownScrollBar);
		addEvent(document, 'mousemove', onMoveScrollBar);
		addEvent(document, 'mouseup', onMouseUpScrollBar);

		_this.scrollBarWrap.appendChild(_this.scrollBar);
		_this.elem.parentNode.appendChild(_this.scrollBarWrap);
	}

	var rePositionScrollBar = function(y){
		var scrollBarHeight = (1-(elemHeight/fullElemHeight))*100;
		_this.scrollBar.style.height = scrollBarHeight + '%';
		_this.scrollBarY = (_this.elem.parentNode.offsetHeight - (padding * 2) - _this.scrollBar.offsetHeight) * (y/elemHeight) - padding;

		// setTranslate( _this.scrollBarWrap , 0+'px' , (-y.toFixed(4)) +'px' , 0+'px' );
		setTranslate( _this.scrollBar , 0+'px' , (-_this.scrollBarY.toFixed(4)) +'px' , 0+'px' );
	}

	var onMouseDownScrollBar = function(e){
		e.preventDefault();
		_this.oldMouseY = e.pageY;
		_this.clickedScrollBar = true;
		addClass(this, 'active');
	}

	var onMoveScrollBar = function(e){
		if(_this.clickedScrollBar){
			var y = _this.oldMouseY - e.pageY;
			targetY += y * (fullElemHeight / _this.elem.parentNode.offsetHeight);

			targetY = Math.max(-elemHeight, targetY);
			targetY = Math.min(0, targetY);

			_this.oldMouseY = e.pageY;
		}
	}

	var onMouseUpScrollBar = function(){
		_this.clickedScrollBar = false;
		removeClass(_this.scrollBar, 'active');
	}


    var reset = function(){
	    currentY = 0;
	    targetY = 0;
    }
    
    var refresh = function() {
		if(_this.elem.parentNode != null){
			fullElemHeight = _this.elem.getBoundingClientRect().height;
			elemHeight = _this.elem.getBoundingClientRect().height - _this.elem.parentNode.offsetHeight;

			if(showScrollBar){
				if(fullElemHeight > window.innerHeight){
					if(hasClass(_this.scrollBarWrap,'hide'))
						removeClass(_this.scrollBarWrap, 'hide');
				}
				else{
					if(!hasClass(_this.scrollBarWrap,'hide'))
						addClass(_this.scrollBarWrap, 'hide');
				}
			}
		}
	}

	var to = function(y){
		elemHeight = _this.elem.getBoundingClientRect().height - _this.elem.parentNode.offsetHeight;
		targetY = Math.max(-elemHeight, y);
	}
	var set = function(y){
		currentY = y;
		targetY = y;
	}

	var isOn = false;
	var on = function(){
		isOn = true;
		refresh();
		onResize();
		VirtualScroll.on(onScroll);
		FrameImpulse.on(onAnim);
	}
	
	var off = function(){
		isOn = false;
		VirtualScroll.off(onScroll);
		FrameImpulse.off(onAnim);
	}
	
	var onResize = function(){
		if( isMobile() ){ 
			if(isOn){
				off();
				setTranslate( _this.elem , 0+'px' , 0+'px' , 0+'px' );
			}
		}
		else{
			if(!isOn && !isMobile()){
				reset();
				on();
			}
			if(disable)
				onEnable();
		}
	}
	var onDisable = function(){
		disable = true;
	}
	var onEnable = function(){
		disable = false;
	}

	var onShowScrollBar = function(){
		showScrollBar = true;
		// initScrollBar();
	}

	var init = function(){
		initScrollBar();
		addEvent(window, 'resize', onResize);
	}
	
	init();
	
	return {
		reset: reset,
		refresh: refresh,
		onResize: onResize,
		set: set,
		to: to,
		on: on,
		off: off,
		disable: onDisable,
		enable: onEnable,
		showScrollBar: onShowScrollBar
	}
}



//
// LazyLoad img when image in viewport
//
var LazyLoad = function(){

	var _this = this;

	this.init = function(){
		_this.imgs = document.querySelectorAll('[data-src]');
		_this.checkAndShowImg();
	}

	this.checkAndShowImg = function(){
		for(var i=0; _this.imgs[i]; i++){
			var _img = _this.imgs[i];
			var offsetTop = _img.getBoundingClientRect().top - window.innerHeight - (window.innerHeight/2);
			if( offsetTop <= 0 && !hasClass(_img,'inited') && !hasClass(_img,'loaded')){
				(function(){
					var __img = _img;
					var src = __img.getAttribute('data-src');

					if(__img.tagName !== 'IMG')
						__img.style.backgroundImage = 'url('+src+')';
					else
						__img.setAttribute('src',src);

					addClass(__img,'loaded');
				})();
			}
		}
	}

	return{
		init: _this.init,
		checkAndShowImg: _this.checkAndShowImg
	}
}
var lazyLoad = new LazyLoad();
lazyLoad.init();



export default SmoothScroll;


//
//	styling console.log
//
// var print = function(state, color, text){
// 	var text = (typeof text == 'object')? JSON.stringify(text) : text || '';
// 	return console.log('%c'+state+'%c %s','color:white;background:'+color+';padding:3px 4px 2px 3px;border-radius:3px;','',text);
// }





//
// init Ajax
//
// var mainWrapId = '#mainWrap';
// var subDir = 'wpstarter';
// var getPageName = function(){
// 	var page = window.location.pathname.split('/').filter(function(a){return a.indexOf(subDir) < 0}).filter(Boolean);
//     var lvl1 = page[0] ? decodeURIComponent(page[0]) : 'home';
//     var lvl2 = page[1] ? decodeURIComponent(page[1]) : null;
// 	var lvl3 = page[2] ? decodeURIComponent(page[2]) : null;
//     return {
// 		lvl1: lvl1,
// 		lvl2: lvl2,
// 		lvl3: lvl3
// 	}
// }
// var Ajax = function(options){
// 	var _this = this;
//     var ignoreString = ['#','/wp-','.pdf','.zip','.rar'];
//     var main = document.querySelector('main');
// 	var ignorePage = options.ignorePage.split(',');
// 	this.done = true;
// 	this.init = null;

// 	// this.initEventToAtag = function(elem){
// 	// 	var _this = this;
//     //     var a = elem.querySelectorAll('a.page');
//     //     for(var i=0; a[i]; i++){
//     //         addEvent(a[i], 'click', function(event){
// 	// 			_this.onClick(event, this.href);
				
// 	// 			if(hasClass(this, 'menu_item')){
// 	// 				removeClass(document.querySelectorAll('.menu_item'), 'active');
// 	// 				addClass(this, 'active');
// 	// 			}
//     //         });
//     //     }
//     // }
// 	this.initEventToAtag(document);
    
//     this.onClick = function(event, $this){
//         event.preventDefault();

//         print('','','');
// 		print('Current Page','#999',_global.CurrentPage);
		
// 		_this.updateURL($this.href);

//         ToPage = getPageName().lvl1;
// 		print('Going to','#999',ToPage);
		
// 		if($this instanceof Element){
// 			var getFrom = $this.getAttribute('data-from') || null;
// 			var insertTo = $this.getAttribute('data-to') || null;
// 			_this.init = $this.getAttribute('data-init') || null;
// 		}
// 		_this.get($this, {}, getFrom, insertTo);
// 	}
	
// 	this.onAnimBeforeAjax = function(getFrom, func){
// 		var elem = getFrom? '#'+getFrom : mainWrapId;
// 		// if(!getFrom)
// 			TweenMax.to(elem,.3,{autoAlpha:0,overwrite:'all',
// 				onComplete:function(){
// 					func();
// 				}
// 			});
// 		// else
// 		// 	func();
// 	}

// 	this.onAnimAfterAjax = function(elem){
// 		var elem = elem? elem : mainWrapId;
//         TweenMax.to(elem,.3,{autoAlpha:1,overwrite:'all'});
// 	}

//     this.checkIfSamePage = function(ignore){
// 		if(!ignore){
// 			for(var i=0; ignorePage[i]; i++){
// 				if(_global.CurrentPage.lvl1 == ignorePage[i])
// 					return true;
// 			}
// 			if(_global.CurrentPage.lvl1 == ToPage ){
// 				print('Page Detection','red', 'Clicked a Same Page!');
// 				return false;
// 			}
// 		}

//         return true;
//     }

//     this.checkIgnoreString = function(url){
//         for(var i=0; ignoreString[i]; i++){
//             if (url.indexOf(ignoreString[i]) >= 0) {
//                 print('Ignore URL','red',url);
//                 return false;
//             }
// 		}
		
//         return true;
//     }

//     this.getPageContent = function(data, getFrom){
//         if(!getFrom)
//             data = data.split('<main>')[1].split('</main>')[0];
//         else{
//             var temp = document.createElement('div');
//             temp.innerHTML = data;
//             data = temp.querySelector('#'+getFrom).innerHTML;
//             temp = null;
//         }

//         return data;
//     }

//     this.getSiteTitle = function(data){
//         data = data.split('<title>')[1].split('</title>')[0];
//         return data;
//     }
//     this.updateSiteTitle = function(data){
//         document.title = _this.getSiteTitle(data);
//     }

//     this.updateURL = function(href){
//         var nohttp = href.replace("http://","").replace("https://","");
//         var firstsla = nohttp.indexOf("/");
//         var pathpos = href.indexOf(nohttp);
//         var path = href.substring(pathpos + firstsla);

//         if (typeof window.history.pushState == "function") {
//             var stateObj = { foo: 1000 + Math.random()*1001 };
//             history.pushState(stateObj,'ajax', path);
//         }
//     }

//     this.insertHTML = function(html, insertTo){
//         var elem,
//             to = document.querySelector('#'+insertTo);

//         if(to){
// 			elem = to;
// 			elem.innerHTML = html;
// 			_this.onAnimAfterAjax(elem);
//         	// elem.insertAdjacentHTML('beforeend', html);
// 			to = null;
// 		}else{
// 			elem = main;

// 			// add "hide" class after ajax
// 			var temp = document.createElement('div');
//             temp.innerHTML = html;
// 			addClass(temp.querySelector(mainWrapId),'hide');
// 			html = temp.innerHTML;
// 			elem.innerHTML = html;
// 		}

// 		_this.initEventToAtag(elem);
// 		lazyLoad.init();
// 	}
	
// 	window.onpopstate = function(event) {
// 		var url = {href:document.location.toString()};
// 		print('Back to','black',url.href);
// 		_this.onClick(event,url);
// 	}
// }
// Ajax.prototype = {
// 	get: function(elem, data, getFrom, insertTo, callback){
// 		var _this = this;
// 		var href = (elem instanceof Element) ? elem.href : elem;
// 		if(_this.checkIgnoreString(href)){
// 			var ignoreDetection = getFrom && insertTo;

// 			if(_this.checkIfSamePage(ignoreDetection)){
// 				if(_global.section){
// 					if(elem instanceof Element)
// 						if(!hasClass(elem,'disableTo'))
// 							_global.section.to(0);
// 				}
// 				if(!ignoreDetection || _this.init) _this.done = false;
// 				_this.init = null;

// 				print('Start Ajax','#999',href);
// 				_this.onAnimBeforeAjax(getFrom,function(){
// 					var params = new URLSearchParams(data);
// 					axios
// 						.post(href,params)
// 						.then(function(response){
// 							print('Ajax Success','green');
// 							_global.CurrentPage = getPageName();

// 							var data = response.data,
// 								html = _this.getPageContent(data,getFrom);

// 							if(!getFrom)
// 								_this.updateSiteTitle(data);
// 							_this.insertHTML(html,insertTo);
// 							_this.onAnimAfterAjax();

// 							if(callback) callback();
// 							if(!_this.done){
// 								_this.done = true;
// 								_global.initPage();
// 							}
// 						})
// 						.catch(function(error){
// 							print(error.message,'red',error.stack);
// 						});
// 				});
// 			}
// 		}
// 	},
// 	initEventToAtag: function(elem){
// 		var _this = this;
// 		var a = elem.querySelectorAll('a.page');
// 		for(var i=0; a[i]; i++){
// 			addEvent(a[i], 'click', function(event){
// 				_this.onClick(event, this);
				
// 				if(hasClass(this, 'menu_item')){
// 					removeClass(document.querySelectorAll('.menu_item'), 'active');
// 					addClass(this, 'active');
// 				}
// 			});
// 		}
// 	}
// }



// var initMagnetize = function(){
// 	var magnetize = document.querySelectorAll('.magnetize:not(.inited)');

// 	addEvent(document, 'mousemove', function(event) {
// 		if(!isMobile()){
// 			for(var i=0; magnetize[i]; i++){
// 				if(!hasClass(magnetize[i], 'inited'))
// 					addClass(magnetize[i], 'inited');

// 				(function(_this, e) {
// 					var n,
// 					mouseX = e.pageX, 
// 					mouseY = e.pageY, 
// 					a = _this,
// 					ratio = -.5,
// 					dist = 20 * (_this.getAttribute('data-dist') || 3) || 120, 
// 					c = a.getBoundingClientRect().left + a.offsetWidth / 2, 
// 					u = a.getBoundingClientRect().top + a.offsetHeight / 2, 
// 					f = ratio * Math.floor(c - mouseX),
// 					h = ratio * Math.floor(u - mouseY);
// 					n = a,
// 					Math.floor(Math.sqrt(Math.pow(mouseX - (n.getBoundingClientRect().left + n.offsetWidth / 2), 2) + Math.pow(mouseY - (n.getBoundingClientRect().top + n.offsetHeight / 2), 2))) < dist ? (TweenMax.to(a, 1, {
// 						force3D:true,
// 						y: h,
// 						x: f,
// 						ease:Power2.easeOut
// 					}),
// 					addClass(a,'magnet')) : (TweenMax.to(a, .6, {
// 						force3D:true,
// 						y: 0,
// 						x: 0,
// 						ease:Power2.easeOut
// 					}),
// 					removeClass(a,'magnet'))
// 				})(magnetize[i], event);
// 			};
// 		}
// 	});
// }