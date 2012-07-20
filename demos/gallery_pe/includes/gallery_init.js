// gallery_init.js - version 0.1 - Spry Pre-Release 1.6.1
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

// The values of these globals must correspond to the ids of markup
// that exist on the page.

var gThumbnailsContainerID = "thumbnails";
var gMainImageContainerID = "mainImageOutline";
var gSlideShowControlsContainerID = "transport";

// These globals will store references to the widgets that
// make up the gallery.

var gThumbViewer = null;
var gImageViewer = null;
var gSlideShowControl = null;

// The InitializeGallery() function attaches the widget behaviors
// to the markup on the page. It should be called when all of the
// markup is ready, after the onload event for the page has fired.

function InitializeGallery()
{
	// Create the thumbnail viewer. This widget attaches the
	// thumbnail growing/shrinking behavior you see when the
	// cursor enters a thumbnail. It is also responsible for
	// tracking what the "current" thumbnail is and fires off
	// notfications whenever a user clicks on a thumbnail or
	// it is told to select the previous or next thumbnails.

	gThumbViewer = new Spry.Widget.ThumbViewer(gThumbnailsContainerID);

	// Create the image viewer widget. This widget is responsible
	// for attaching the fade in/out and grow/shrink behavior you
	// see whenever the main image on the page changes.

	gImageViewer = new Spry.Widget.ImageViewer(gMainImageContainerID);

	// Create the slide show control widget. This widget is responsible
	// for starting/stopping the slide show timer and the state of the
	// play/pause button. This widget fires off notifications whenever
	// the user clicks on a button and whenever the slide show is
	// started or stopped.

	gSlideShowControl = new Spry.Widget.SlideShowControl(gSlideShowControlsContainerID);

	// Add an observer on the thumb viewer so that anytime the user
	// clicks on a thumbnail, it tells the image viewer what image
	// to show.

	gThumbViewer.addObserver(function(notificationType, notifier, data)
	{
		if (notificationType == "onSelect")
			gImageViewer.setImage(data);
	});

	// The image viewer may be told to load an image that could take
	// a while. We want to prevent the slide show control from firing
	// off a notfication that says "go to the next image" unless we've
	// completed loading the current image we were told to load.
	// Add an observer on the image viewer which will manually stop and
	// start the slide show control's timer.

	gImageViewer.addObserver(function(notificationType, notifier, data)
	{
		if (notificationType == "onPreUpdate")
			gSlideShowControl.killTimer();
		else if (notificationType == "onPostUpdate")
		{
			if (gSlideShowControl.isActive())
				gSlideShowControl.startTimer();
		}
	});

	// Add an observer on the slide show control so that any time the
	// user clicks on a button, it tells the thumbnail viewer what to do.

	gSlideShowControl.addObserver(function(notificationType, notifier, data)
	{
		if (notificationType == "onNextSlide")
			gThumbViewer.next();
		else if (notificationType == "onPreviousSlide")
			gThumbViewer.previous(true);
		else if (notificationType == "onFirstSlide")
			gThumbViewer.first(true);
		else if (notificationType == "onLastSlide")
			gThumbViewer.last(true);
	});

	// Add a click handler on the thumbnails and on the slide show
	// next and previous buttons that will stop the slide show if
	// it is in progress.

	Spry.$$("#thumbnails a, #transport .previousBtn, #transport .nextBtn").addEventListener("click", function(e) { gSlideShowControl.stop(); }, "false");

	// Now that all of our widgets are setup, tell the image viewer
	// to load whatever is currently selected in the thumbnail viewer.

	var currentLink = gThumbViewer.getCurrentThumbLink();
	if (currentLink)
		gImageViewer.setImage(currentLink.href);
}