// products-03.js - version 0.1 - Spry Pre-Release 1.6.1
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

// Create an HTML data set that can turn the static product markup in the
// page, into data that can be re-purposed.

var dsProducts = new Spry.Data.HTMLDataSet(null, "productListing", {firstRowAsHeaders:false, rowSelector:".product", dataSelector:".boximage, .category, h2, .productdescription, .featureslist", columnNames:["boximage","category","name","description","features"]});

// Add an observer to the dsProducts data set so we know when it is done
// loading its data. Once it is done loading, we want to *replace* the content
// inside the "productListing" container with an HTML fragment, which contains
// several region templates, that we will load dynamically.

dsProducts.addObserver({onPostLoad: function(notificationType, notifier, data)
{
	// Load the HTML fragment that contains our region templates.

	Spry.Utils.updateContent("productListing", "products_template.html", function()
	{
		// Tell Spry to process the regions.

		Spry.Data.initRegions();

		// If an HTML data set loads its data from markup embedded in the page,
		// it automatically hides the data source with display:none. Since we
		// are re-using the same container as the data source, we need to make
		// sure that it shows, so set its display to "block".

		Spry.$('productListing').style.display = "block";

		// The HTML fragment we loaded contains markup for an Accordion. Create
		// an Accordion widget to attach the appropriate behaviors to that markup.

		var acc = new Spry.Widget.Accordion("Acc1", {useFixedPanelHeights:false});
	});
}});

// Turn off the automatic region processing that occurs when a page includes
// SpryData.js. We will manually trigger the processing *after* the HTML fragment
// is loaded and inserted into the document.

Spry.Data.initRegionsOnLoad = false;

// Tell the HTML data set to load its data source as soon as the onload
// event fires. This kicks off the whole transformation of the document.

Spry.Utils.addLoadListener(function(){ dsProducts.loadData(); });