// SpryRating.js - version 0.2 - Spry Pre-Release 1.6.1
//
// Copyright (c) 2007. Adobe Systems Incorporated.
// All rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//
//   * Redistributions of source code must retain the above copyright notice,
//     this list of conditions and the following disclaimer.
//   * Redistributions in binary form must reproduce the above copyright notice,
//     this list of conditions and the following disclaimer in the documentation
//     and/or other materials provided with the distribution.
//   * Neither the name of Adobe Systems Incorporated nor the names of its
//     contributors may be used to endorse or promote products derived from this
//     software without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
// AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
// IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
// ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
// LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
// CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
// SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
// INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
// CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
// ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
// POSSIBILITY OF SUCH DAMAGE.

//fix IE6 flicker bug - only once per browser session
try 
{
		document.execCommand("BackgroundImageCache", false, true);
} 
catch(err){}
  
var Spry;
if (!Spry) Spry = {};
if (!Spry.Widget) Spry.Widget = {};

// Rating widget

Spry.Widget.Rating = function(element, opts)
{
	Spry.Widget.Rating.Notifier.call(this);

	//initialize object
	this.init(element, opts);
};

Spry.Widget.Rating.KEY_ENTER = 13;
Spry.Widget.Rating.KEY_LEFT = 37;
Spry.Widget.Rating.KEY_RIGHT = 39;

//Notifier mechanism 

Spry.Widget.Rating.Notifier = function()
{
	this.observers = [];
	this.suppressNotifications = 0;
};

Spry.Widget.Rating.Notifier.prototype.addObserver = function(observer)
{
	if (!observer)
		return;

	// Make sure the observer isn't already on the list.
	var len = this.observers.length;
	for (var i = 0; i < len; i++)
		if (this.observers[i] == observer) return;

	this.observers[len] = observer;
};

Spry.Widget.Rating.Notifier.prototype.removeObserver = function(observer)
{
	if (!observer)
		return;

	for (var i = 0; i < this.observers.length; i++)
	{
		if (this.observers[i] == observer)
		{
			this.observers.splice(i, 1);
			break;
		}
	}
};

Spry.Widget.Rating.Notifier.prototype.notifyObservers = function(methodName, data)
{
	if (!methodName)
		return;

	if (!this.suppressNotifications)
	{
		var len = this.observers.length;
		for (var i = 0; i < len; i++)
		{
			var obs = this.observers[i];
			if (obs)
			{
				if (typeof obs == "function")
				{
					obs(methodName, this, data);
				}
				else if (obs[methodName])
				{
					obs[methodName](this, data);
				}
			}
		}
	}
};

Spry.Widget.Rating.Notifier.prototype.enableNotifications = function()
{
	if (--this.suppressNotifications < 0)
	{
		this.suppressNotifications = 0;
		Spry.Effect.Rating.showError("Unbalanced enableNotifications() call!\n");
	}
};

Spry.Widget.Rating.Notifier.prototype.disableNotifications = function()
{
	++this.suppressNotifications;
};

Spry.Widget.Rating.prototype = new Spry.Widget.Rating.Notifier();
Spry.Widget.Rating.prototype.constructor = Spry.Widget.Rating;

Spry.Widget.Rating.prototype.init = function(element, opts)
{
	this.element = this.getElement(element);

	//CSS states
	this.containerInitialClass = 'ratingInitialState';
	this.containerReadOnlyClass = 'ratingReadOnlyState';
	this.containerRatedClass = 'ratingRatedState';
	this.readOnlyErrClass = 'ratingReadOnlyErrState';
	this.starDefaultClass = 'ratingButton';
	this.starFullClass = 'ratingFull';
	this.starHalfClass = 'ratingHalf';
	this.starEmptyClass = 'ratingEmpty';
	this.starHoverClass = 'ratingHover';
	this.counterClass = 'ratingCounter';

	//key codes
	this.movePrevKeyCode = Spry.Widget.Rating.KEY_LEFT;
	this.moveNextKeyCode = Spry.Widget.Rating.KEY_RIGHT;
	this.doRatingKeyCode = Spry.Widget.Rating.KEY_ENTER;

	//provide some sensible defaults
	this.afterRating = 'currentValue';
	this.enableKeyboardNavigation = true;
	this.allowMultipleRating = true;
	this.method = 'GET';
	this.postData = null;
	this.ratingValueElement = null;
	this.ratingValue = 0;
	this.saveUrl = null;
	this.hasFocus = null;
	this.rateHandler = null;

	//set all opts as properties on this object, overriding defaults
	Spry.Widget.Rating.setOptions(this, opts, true);

	this.stars = Spry.Widget.Rating.getElementsByClassName(this.element,this.starDefaultClass);
	
	if (this.stars.length == 0)
	{
		this.showError('No star elements in the container ' + (typeof element == 'string' ? element : ''));
		return;
	}

	//store rating value on each star
	for (var i=0; i < this.stars.length; i++)
		this.stars[i].starValue = i+1;
		
	if (this.saveUrl && this.postData)
		this.method = 'POST';

	//no element provided for initial value
	if(this.ratingValueElement)
	{
		this.ratingValueElement = this.getElement(this.ratingValueElement);
		this.ratingValue = parseFloat(this.ratingValueElement.getAttribute('value'));

		if (isNaN(this.ratingValue))
			this.ratingValue = 0;
	}

	//throw error if the number of stars is not at least 2
	if(this.stars.length < 2)
	{
		this.showError("The rating widget must have at least two stars!");
		return;
	}
	
	//throw error if ratingValue is greater than the number of stars
	if(this.ratingValue > this.stars.length)
	{
		this.showError("Rating initial value must not exceed the number of stars!");
		return;
	}

	//setup counter if requested
	if(this.counter)
	{
		this.updateCounter(this.ratingValue);
	}

	//color stars accordingly
	this.setValue(this.ratingValue); //don't try to update the linked input value
	
	//set default CSS class
	if(this.readOnly)
		this.setState('readonly');
	else
		this.setState('initial');

	//attach behaviors
	this.attachBehaviors();
};

//get current widget state
Spry.Widget.Rating.prototype.getState = function()
{
	return this.currentState;
};

//set container state: {initial|readonly|rated}
Spry.Widget.Rating.prototype.setState = function(state)
{
	var className;
	this.currentState = state;
		
	//ensure only the requested state is set		
	this.removeClassName(this.element,this.containerInitialClass);
	this.removeClassName(this.element,this.containerReadOnlyClass);
	this.removeClassName(this.element,this.containerRatedClass);
	
	switch(state)
	{
		case 'readonly': 
			className = this.containerReadOnlyClass; 
			break;
		case 'rated': 
			className = this.containerRatedClass;
			if (!this.allowMultipleRating)
			{
				this.addClassName(this.element,this.containerReadOnlyClass);
				state = 'readonly';
			}
			break;
		default:
			state = 'initial'; 
			className = this.containerInitialClass; 
			break;
	}

	this.addClassName(this.element,className);
};

Spry.Widget.Rating.prototype.removeMessage = function(className, when)
{
	switch(className)
	{
		case this.readOnlyErrClass:
		case this.containerRatedClass:
			if (!when)
				this.removeClassName(this.element,className);
			else
			{
				var self = this;
				setTimeout(function(){self.removeClassName(self.element, className);
					if (className == self.containerRatedClass && self.containerRatedClass != 'readonly'){
						//the container must have a state
						self.addClassName(self.element,self.containerInitialClass);
					}
				}, when);
			}		  
			break;
	}
};

Spry.Widget.Rating.prototype.attachBehaviors = function()
{
	//store event handlers here so we can detach them later
	this.event_handlers = [];

	// create event listeners for each star
	for(var j = 0; j < this.stars.length; j++)
	{
		var self = this;
		var star = this.stars[j];

		this.event_handlers.push([star, "click", function(e){self.onRate(e || event); }]);
		if(!this.readOnly)
		{
			this.event_handlers.push([star, "mouseover", function(e){self.onFocus(e || event); }]);
			this.event_handlers.push([star, "mouseout", function(e){self.onBlur(e || event); }]);
		}
		this.enableKeyboardNavigation = (this.enableKeyboardNavigation && star.attributes.getNamedItem("tabindex"));
		if (this.enableKeyboardNavigation && !this.readOnly){
			this.event_handlers.push([star, "focus", function(e){self.onFocus(e || event); }]);
			this.event_handlers.push([star, "blur", function(e){self.onBlur(e || event); }]);
			this.event_handlers.push([star, "keydown", function(e){self.keyDown(e || event); }]);			
		}
	}

	//actually register handlers
	for (var i=0; i<this.event_handlers.length; i++)
		Spry.Widget.Rating.addEventListener(this.event_handlers[i][0], this.event_handlers[i][1], this.event_handlers[i][2], false);

	//onunload handler
	Spry.Widget.Rating.addEventListener(window, "unload", this.destroy, false);
};

//get current widget value
Spry.Widget.Rating.prototype.getValue = function()
{
	return this.ratingValue;
};

// set value for all stars in the widget and update the linked input if requested
Spry.Widget.Rating.prototype.setValue = function(rating)
{
	if(this.ratingValueElement)
		this.ratingValueElement.value = rating;

	this.ratingValue = rating;

	this.updateCounter(this.ratingValue);

	for (var j = 0; j < this.stars.length; j++)
	{
		this.resetClasses(this.stars[j]);

		if (rating >= 1)
		{
			this.addClassName(this.stars[j], this.starFullClass);
			rating--;
		}
		else if(rating >= 0.5 && rating < 1)
		{
			this.addClassName(this.stars[j], this.starHalfClass);
			rating = 0;
		}
		else
		{
			this.addClassName(this.stars[j], this.starEmptyClass);
		}
	}
};

//onmouseover event handler
Spry.Widget.Rating.prototype.onFocus = function(e)
{
	this.hasFocus = true;	
	if( this.currentState === 'readonly' || (this.currentState === 'rated' && !this.allowMultipleRating))
		return;

	var target = (e.target) ? e.target : e.srcElement;

	for (var k = 0; k <= target.starValue; k++)
		this.addClassName(this.stars[k-1], this.starHoverClass);

	this.updateCounter(k-1);
};

//onblur event handler
Spry.Widget.Rating.prototype.onBlur = function(e)
{
	this.hasFocus = false;
	if(this.currentState === 'readonly' || (this.currentState === 'rated' && !this.allowMultipleRating))
		return;

	var target = (e.target) ? e.target : e.srcElement;

	for(var k = 0; k <= target.starValue; k++)
		this.removeClassName(this.stars[k-1], this.starHoverClass);

	this.updateCounter(this.ratingValue);
};

// rating event handler
Spry.Widget.Rating.prototype.onRate = function(e)
{
	this.notifyObservers("onPreRate");
	
	if(this.currentState == 'rated' && !this.allowMultipleRating)
		return;
	
	// if in readonly print an error
	// this message can be deleted later via an observer
	if(this.currentState == 'readonly')
	{
		this.removeClassName(this.element,this.containerRatedClass);
		this.addClassName(this.element,this.readOnlyErrClass);
		return;
	}
	
	this.setState('rated');

	var target = (e.target) ? e.target : e.srcElement;

	//set the rated value as the new widget value
	this.setValue(target.starValue);
	
	// call the callback functions in order (Spry, then user provided) 
	try{
		if(this.saveUrl)
			this.saveUrlHandler(target.starValue);
		if(typeof this.rateHandler=='function')
			this.rateHandler();
	}	
	catch(err){	
		this.showError(err);
	};

	this.notifyObservers("onPostRate");
};

//keydown event handler
Spry.Widget.Rating.prototype.keyDown = function(e)
{
	if(this.currentState == 'rated' && !this.allowMultipleRating)
		return;

	var key = e.keyCode;
	if (!this.hasFocus || (key != this.movePrevKeyCode && key != this.moveNextKeyCode && key != this.doRatingKeyCode))
		return true;
	
	var target = (e.target) ? e.target : e.srcElement;
	var j = target.starValue - 1;	//star position, 0-based

	switch(key)
	{
		case this.movePrevKeyCode:
			if(j > 0)
				this.stars[j-1].focus();
			break;
		case this.moveNextKeyCode:
			if(j < this.stars.length-1)
				this.stars[j+1].focus();
			break;
		case this.doRatingKeyCode:
			this.onRate(e);
			break;
		default: 
			break;
	}
	
	//stop further event handling by the browser
	return Spry.Widget.Rating.stopEvent(e);
};

//update rating counter innerHTML
Spry.Widget.Rating.prototype.updateCounter = function(val)
{
  if(this.counter)
  {    
	this.ratingCounter =  Spry.Widget.Rating.getElementsByClassName(this.element,this.counterClass)[0];
	this.ratingCounter.innerHTML = '[' + val + '/' + this.stars.length + ']';
  }
};

//save data - Spry provided
Spry.Widget.Rating.prototype.saveUrlHandler = function(val)
{
	//replace value into url / postdata, keep initial values for reuse
	this.newSaveUrl = this.saveUrl.replace(/@@ratingValue@@/,val);

	var opts = {};
	
	if(this.postData){
		this.newPostData = this.postData.replace(/@@ratingValue@@/,val);
		opts.headers = {"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"};
		opts.postData = this.newPostData;	
	}

	var self = this;
	opts.errorCallback = function(req){self.onLoadError(req);};
	this.pendingRequest = Spry.Widget.Rating.loadURL(this.method, this.newSaveUrl, true, function(req){self.onLoadSuccess(req, val); }, opts);
};

//callback for success server operation
Spry.Widget.Rating.prototype.onLoadSuccess = function(req, val)
{
	this.notifyObservers("onServerUpdate", req);
		
	 //update myself with server value	
	if(this.afterRating == 'serverValue'){
		var returnVal = parseFloat(req.xhRequest.responseText);
		if (!isNaN(returnVal))
			this.setValue(returnVal);
	}
};

//callback for error server operation
Spry.Widget.Rating.prototype.onLoadError = function(req)
{
	this.notifyObservers("onServerError", req);
};

Spry.Widget.Rating.prototype.getElement = function(ele)
{
	if (ele && typeof ele == "string")
		return document.getElementById(ele);
	return ele;
};

Spry.Widget.Rating.prototype.destroy = function()
{
	if (this.event_handlers)
		for (var i=0; i<this.event_handlers.length; i++)
		{
			Spry.Widget.Rating.removeEventListener(this.event_handlers[i][0], this.event_handlers[i][1], this.event_handlers[i][2], false);
		}
	try { delete this.element; } catch(err) {}
	try { delete this.stars; } catch(err) {}
	try { delete this.counter; } catch(err) {}
	try { delete this.ratingValueElement; } catch(err) {}
	try { delete this.event_handlers; } catch(err) {}
};

/** CSS class manipulation
 *
 */
Spry.Widget.Rating.prototype.addClassName = function(ele, className)
{
	if (!ele || !className || (ele.className && ele.className.search(new RegExp("\\b" + className + "\\b")) != -1))
		return;
	ele.className += (ele.className ? " " : "") + className;
};

Spry.Widget.Rating.prototype.removeClassName = function(ele, className)
{
	if (!ele || !className || (ele.className && ele.className.search(new RegExp("\\b" + className + "\\b")) == -1))
		return;
	ele.className = ele.className.replace(new RegExp("\\s*\\b" + className + "\\b", "g"), "");
};

Spry.Widget.Rating.prototype.resetClasses = function(el)
{
	var cls = [ this.starFullClass, this.starHalfClass, this.starEmptyClass, this.starHoverClass ];
	for (var i=0; i < cls.length; i++)
		this.removeClassName(el, cls[i]);
};

Spry.Widget.Rating.prototype.showError = function(msg)
{
	alert('Spry.Widget.Rating ERROR: ' + msg);
};

/**
 *  Common utility functions
*/

//add event listener
Spry.Widget.Rating.addEventListener = function(element, eventType, handler, capture)
{
	try
	{
		if (element.addEventListener)
			element.addEventListener(eventType, handler, capture);
		else if (element.attachEvent)
			element.attachEvent("on" + eventType, handler, capture);
	}
	catch (e){}
};

//remove event listener
Spry.Widget.Rating.removeEventListener = function(element, eventType, handler, capture)
{
	try
	{
		if (element.removeEventListener)
			element.removeEventListener(eventType, handler, capture);
		else if (element.detachEvent)
			element.detachEvent("on" + eventType, handler, capture);
	}
	catch (e){}
};

Spry.Widget.Rating.hasClassName = function(ele, className)
{
	if (typeof element == 'string')
		element = document.getElementById(element);
	if (!ele || !className || !ele.className || ele.className.search(new RegExp("\\b" + className + "\\b")) == -1){
		return false;
			}
	return true;
};

Spry.Widget.Rating.getElementsByClassName = function(root, className)
{
  var results = [];
  var elements = root.getElementsByTagName("*");
  for (var i = 0; i < elements.length; i++){
	if (Spry.Widget.Rating.hasClassName(elements[i], className))    
	  results.push(elements[i]);
		}
  return results;
};

Spry.Widget.Rating.stopEvent = function(e)
{
	if (e.preventDefault) e.preventDefault();
	else e.returnValue = false;
	if (e.stopPropagation) e.stopPropagation();
	else e.cancelBubble = true;

	return false;
};

Spry.Widget.Rating.setOptions = function(obj, optionsObj, ignoreUndefinedProps)
{
	if (!optionsObj)
		return;

	for (var optionName in optionsObj)
	{
		if (ignoreUndefinedProps && optionsObj[optionName] == undefined)
			continue;
		obj[optionName] = optionsObj[optionName];
	}
};

//loadURL utility functions

Spry.Widget.Rating.msProgIDs = ["MSXML2.XMLHTTP.6.0", "MSXML2.XMLHTTP.3.0"];

Spry.Widget.Rating.createXMLHttpRequest = function()
{
	var req = null;
	try
	{
		// Try to use the ActiveX version of XMLHttpRequest. This will
		// allow developers to load file URLs in IE7 when running in the
		// local zone.
		if (window.ActiveXObject)
		{
			while (!req && Spry.Widget.Rating.msProgIDs.length)
			{
				try { req = new ActiveXObject(Spry.Widget.Rating.msProgIDs[0]); } catch (e){ req = null; }
				if (!req)
					Spry.Widget.Rating.msProgIDs.splice(0, 1);
			}
		}
		// We're either running in a non-IE browser, or we failed to
		// create the ActiveX version of the XMLHttpRequest object.
		// Try to use the native version of XMLHttpRequest if it exists.

		if (!req && window.XMLHttpRequest)
			req = new XMLHttpRequest();
	}
	catch (e){ req = null; }

	if (!req)
		Spry.Widget.Rating.prototype.showError("Failed to create an XMLHttpRequest object!" );		

	return req;
};

Spry.Widget.Rating.loadURL = function(method, url, async, callback, opts)
{
	var req = new Spry.Widget.Rating.loadURL.Request();
	req.method = method;
	req.url = url;
	req.async = async;
	req.successCallback = callback;
	Spry.Widget.Rating.setOptions(req, opts);

	try
	{
		req.xhRequest = Spry.Widget.Rating.createXMLHttpRequest();
		if (!req.xhRequest)
			return null;

		if (req.async)
			req.xhRequest.onreadystatechange = function(){ Spry.Widget.Rating.loadURL.callback(req); };

		req.xhRequest.open(req.method, req.url, req.async, req.username, req.password);

		if (req.headers)
		{
			for (var name in req.headers)
				req.xhRequest.setRequestHeader(name, req.headers[name]);
		}

		req.xhRequest.send(req.postData);

		if (!req.async)
			Spry.Widget.Rating.loadURL.callback(req);
	}
	catch(e)
	{
		if (req.errorCallback)
			req.errorCallback(req);
		else
			Spry.Widget.Rating.prototype.showError("Exception caught while loading " + url + ": " + e);
		req = null;
	}

	return req;
};

Spry.Widget.Rating.loadURL.callback = function(req)
{
	if (!req || req.xhRequest.readyState != 4)
		return;
	if (req.successCallback && (req.xhRequest.status == 200 || req.xhRequest.status == 0))
		req.successCallback(req);
	else if (req.errorCallback)
		req.errorCallback(req);
};

Spry.Widget.Rating.loadURL.Request = function()
{
	var props = Spry.Widget.Rating.loadURL.Request.props;
	var numProps = props.length;

	for (var i = 0; i < numProps; i++)
		this[props[i]] = null;

	this.method = "GET";
	this.async = true;
	this.headers = {};
};

Spry.Widget.Rating.loadURL.Request.props = [ "method", "url", "async", "username", "password", "postData", "successCallback", "errorCallback", "headers", "userData", "xhRequest" ];

