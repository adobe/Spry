// product.js - version 0.2 - Spry Pre-Release 1.6.1
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

var mainPanel = null;

// Our initialization function which unobtrusively attaches
// click handlers on the product links within the page.

function InitProductPage()
{
	// Create an HTMLPanel for the element with the
	// id of "mainContent".

	mainPanel = new Spry.Widget.HTMLPanel("mainContent");

	// For every link on the page which points to a product page,
	// attach an onclick handler that will intercept clicks and
	// and fire off a request to load the URL via the HTMLPanel.
	//
	// For these links, we want to load the static product page
	// and extract out the content underneath the "mainContent"
	// node.

	Spry.$$("#productPageLinks a").addEventListener("click", function(e)
	{
		mainPanel.loadContent(this.href, { id: "mainContent" });
		return false;
	}, false);

	// For every link on the page which points to a product HTML
	// fragment, attach an onclick handler that will intercept clicks and
	// and fire off a request to load the URL via the HTMLPanel.
	//
	// For these links, we are loading HTML fragments, so there is no
	// need to specify an ID to extract out. The HTMLPanel will insert
	// all of the content recieved.

	Spry.$$("#productFragmentLinks a").addEventListener("click", function(e)
	{
		mainPanel.loadContent(this.href);
		return false;
	}, false);
}



// Add our InitProductPage() function as a load listener
// so that it gets executed once the page has fully loaded.

Spry.Utils.addLoadListener(InitProductPage);
