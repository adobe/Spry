// effects.js - version 0.2 - Spry Pre-Release 1.6.1
//
// Copyright (c) 2006. Adobe Systems Incorporated.
// All rights reserved.
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

///////////////////////////////////////////////////////////////////////////////////////
// 
//  This file is used in an advanced demo to examplify the Spry Effects functionalities 
//  and interoperability between them. To read more details about different Spry Effects
// 	and their detailed options please see our detailed samples:
//
// 	http://labs.adobe.com/technologies/spry/samples/#effects
//
// 	We had to write the following custom objects and functions to achieve our demo goal:
//  
//  Spry.Effect.FadeBlind 
//			- A custom cluster effect which group together a Fade and a Blind Effect
//
//  Spry.Effect.FadeSlide 
// 			- A custom cluster effect which group together a Fade and a Blind Effect
//
// 	Observer 
//      - A custom observer attached to every effect that will run in page. This observer 
// 			was designed to run any effect a second time in the opposite direction and 
// 			revert at the end any CSS changes that where changed by the effect on the target
// 			element
//
// 	runEffect()
// 			- A custom function that will prepare and run a given effect on a target element
//
//  ExampleHelpText()
// 			- A custom function designed to change the content text of an element.
//  
///////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////
//
// 	Global Variables
//
////////////////////////////////////////////////////

// list of effects already run to be reused
var effects = {};
// latest effect ran
var prevEffect = false;
// CSS initial properties for the elements on which we apply the effects
var initialElements = [];
// list of style properties to be monitored
var saveStyle = ['position', 'width', 'height', 'opacity', 'filter', 'top', 'left', 'backgroundColor', 'visibility', 'display'];

////////////////////////////////////////////////////
//
// 	Cluster Effects
//
////////////////////////////////////////////////////

/* 
 * FadeBlind 
 * 		Custom Cluster effect that fade in/out and blind in/out simultanous an element
 * 		by running in parallel the Fade() and Blind() predefined clusters
 */

Spry.Effect.FadeBlind = function(element, options)
{
	Spry.Effect.Cluster.call(this, options);
	
	this.name = 'FadeBlind';
	var duration = 1000;
	var doToggle = false;
	var from = 100;
	var to = 0;

	if (options)
	{
		if (options.duration) duration = options.duration;
		if (options.toggle) doToggle = options.toggle;
		if (options.from) from = options.from;
		if (options.to) to = options.to;
	}

	var options = {duration: duration, from: from, to: to, toggle: doToggle};
	var blind = new Spry.Effect.Blind(element, options); 
	this.addParallelEffect(blind);

	var options = {duration: duration, from: from, to: to, toggle: doToggle};
	var fade = new Spry.Effect.Fade(element, options); 
	this.addParallelEffect(fade);
};

Spry.Effect.FadeBlind.prototype = new Spry.Effect.Cluster();
Spry.Effect.FadeBlind.prototype.constructor = Spry.Effect.FadeBlind; 

/* 
 * FadeSlide 
 * 		Custom Cluster effect that fade in/out and slide simultaneous an element
 * 		by running in parallel the Fade() and Slide() predefined clusters
 */

Spry.Effect.FadeSlide = function(element, options)
{
	Spry.Effect.Cluster.call(this, options);
	
	this.name = 'FadeSlide';
	var duration = 1000;
	var doToggle = false;
	var from = 100;
	var to = 0;

	if (options)
	{
		if (options.duration) duration = options.duration;
		if (options.toggle) doToggle = options.toggle;
		if (options.from) from = options.from;
		if (options.to) to = options.to;
	}

	var options = {duration: duration, from: from, to: to, toggle: doToggle};
	var slide = new Spry.Effect.Slide(element, options);
	this.addParallelEffect(slide);

	var options = {duration: duration, from: from, to: to, toggle: doToggle};
	var fade = new Spry.Effect.Fade(element, options);
	this.addParallelEffect(fade);
};

Spry.Effect.FadeSlide.prototype = new Spry.Effect.Cluster();
Spry.Effect.FadeSlide.prototype.constructor = Spry.Effect.FadeSlide;

///////////////////////////////////////////////////////////////
//
// Generic Observer
//
// 		The observer will save the initial element state, 
// 		restore the effect and the element to their original 
// 		states when the effect finished or canceled.
//
///////////////////////////////////////////////////////////////

var Observer = {};

/*
 * 	Observer.onPreEffect(obj)
 * 		Before running an effect forward the initial CSS values are saved.
 *    We will use later these when the animation will finish or is canceled 
 * 		to restore the animated element to be ready for the next effect.
 *    This function is automatically called by the effect.
 *  Parameters:
 * 		obj - the running effect that calls this function
 */
Observer.onPreEffect = function(obj){
	if (obj.direction && obj.direction == Spry.forwards){
		saveElement(obj.element);
		if (obj.name == 'Slide' || obj.name == 'FadeSlide'){
			saveElement(document.getElementById('content_box'));
		}
	}
};

/*
 * 	Observer.onCancel(obj)
 * 		When an effect is canceled this function will restore the element CSS.
 * 		Also we toggle the effect so the next time will run to go forward again.
 *    This function is automatically called by the effect.
 *  Parameters:
 * 		obj - the running effect that calls this function
 */
Observer.onCancel = function(obj){
	if (obj.direction == Spry.forwards){
		obj.doToggle();
	}
	
	restoreElement(obj.element);

	if (obj.name == 'Slide' || obj.name == 'FadeSlide'){
		var el = document.getElementById('content_box')
		restoreElement(el);
	}
};

/*
 * 	Observer.onPostEffect(obj)
 * 		When a forward effect finish the effect is restarted to toggle the effect. 
 * 		We will use a small timeout to make sure the effect properly finish the 
 * 		animation in forward direction.
 * 		After the second run will restore the element CSS
 *    This function is automatically called by the effect.
 *  Parameters:
 * 		obj - the running effect that calls this function
 */
Observer.onPostEffect = function(obj){
	if (obj.direction == Spry.forwards)
		setTimeout(function(){obj.start()}, 150);
	else
		restoreElement(obj.element);
};

/////////////////////////////////////////////////
//
// Utilities functions
//
/////////////////////////////////////////////////

/* 
 * ExampleHelpText
 * 		change the content text of the text_pane div with the new one received
 * Parameters:
 * 		helpText - the new text to be displayed into the text_pane element
 * 
 */
function ExampleHelpText(helpText)
{
	document.getElementById("text_pane").innerHTML='<p>'+helpText+'</p>';
};

/* 
 * ReloadDocument()
 * 		reload the current page from the server
 * 
 */
function ReloadDocument()
{
	window.location.reload(true);
};

/* 
 * saveElement(el)
 * 		Save into the global array of 'initialElements' some CSS properties 
 * 		of the given element that where altered by the animation running.
 * Parameters:
 *		el - the DOM element for which to save the CSS properties
 */
var saveElement = function(el){
	if (!initialElements[el.id])
	{
		initialElements[el.id] = {};
		for (var i = 0; i < saveStyle.length; i++)
		{
			initialElements[el.id][saveStyle[i]] = Spry.Effect.getStyleProp(el, saveStyle[i]);
		}
	}
};

/* 
 * restoreElement(el)
 * 		Restore from the global array 'initialElements' some CSS properties 
 * 		of the given element to prepare it for the next effect to run.
 * Parameters:
 *		el - the DOM element for which to restore the CSS properties
 */
var restoreElement = function(el){
	for (var i = 0; i < saveStyle.length; i++)
		el.style[saveStyle[i]] = initialElements[el.id][saveStyle[i]];
};

/*
 * runEffect()
 *    This is the dispatcher that will instantiate, if not already done, 
 * 		the given 'effect' with a list of 'options' to run on a given target 'element'.
 *
 *  	The observer defined above will also be attached to the effect to 
 * 		initially save the unaltered 'element' properties, automatically restart 
 *    the animation in backward direction and restore the saved properties at the end.
 *
 * 		The 'effect' is than started and the text from the text_pane is changed
 * 		with the 'helpText'
 *
 * 		The "new Spry.Effect[effect]" is a generic way of initializing a given 'effect'.
 * 		The Spry samples are describing for each effect what is the specific code
 * 		to be included in page and the complete list of supported options. An online version
 * 		of the Spry Effects samples could be accessed here:
 *
 *    http://labs.adobe.com/technologies/spry/samples/#effects
 *
 * 		The function will return false to prevent the href of <a> tag to be followed by the browser.
 *
 * Parameters:
 * 		effect - the name of the effect to run
 * 		element - the element id from page to run this effect on
 * 		options - the options necessary for the effect to run
 * 		helptext - the new status page to be displayed
 */
var runEffect = function(effect, element, options, helptext){
	if (prevEffect && effects[prevEffect].isRunning){
		effects[prevEffect].cancel();
		setTimeout(function(){runEffect(effect, element, options, helptext)}, 150);
		return false;
	}

	if (!effects[effect]){
		effects[effect] = new Spry.Effect[effect](element, options);
		if (effect != 'Highlight' && effect != 'Shake' && effect != 'Pulsate')
			effects[effect].addObserver(Observer);
	}

	effects[effect].start();

	if (helptext)
		ExampleHelpText(helptext);

	prevEffect = effect;
	return false;
};
