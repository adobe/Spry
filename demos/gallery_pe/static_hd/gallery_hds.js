// DynamicGallery.js - version 0.1 - Spry Pre-Release 1.6.1
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

// Set up an HTML data set that can extract the thumbnail and image links.
// A destructive filter (PhotosFilter) is registered so that any time data is
// loaded by the HTML data set, we have a chance to extract the URLs from the
// markup the HTML data set extracts. We stuff these urls into "path" and "thumbpath"
// columns.

var dsPhotos = new Spry.Data.HTMLDataSet(null, "gallery", { firstRowAsHeaders:false, rowSelector:".thumbnail", columnNames:["thumbimg"], filterDataFunc: PhotosFilter });

// Create a data filter that will add some custom columns that
// we expect in our region template. This allows our template to
// be agnostic to the format of the data the data set loads. Of
// course this function will need to be modified if the developer
// uses one of their own custom data formats.
//
// In this particular implemenation we need to extract the paths
// to our thumbnails and images from markup that is inside the
// thumbimg column.

function PhotosFilter(ds, row, rowIndex)
{
	var tnStr = row.thumbimg;
	if (tnStr)
	{
		row.path = tnStr.replace(/.*<a[^>]*href="?([^"]*)"?.*/i, "$1");
		row.thumbpath = tnStr.replace(/.*<img[^>]*src="?([^"]*)"?.*/i, "$1");
	}
	return row;
}

// Register an observer on the dsPhotos data set. After we load
// the data from the markup on the page, we want to replace it
// with the region template from an external file and tell Spry
// to process that template so that it gets populated with the
// data we extracted from the page.

dsPhotos.addObserver({ onPostLoad: function(notifier, data)
{
	// We're done extracting data from the page, now replace the content
	// underneath the "gallery" container with our region template. After
	// the template is in place, call initRegions() so Spry can process
	// the region template and generate markup.

	Spry.Utils.updateContent("gallery", "static_hd_gallery_template.html", function()
	{
		Spry.Data.initRegions();
		Spry.$('gallery').style.display = "block";
	});
}});

// Since we're dynamically loading in a region template, we need to
// turn off the automatic region processing that happens when you include
// SpryData.js. We will manually trigger region processing *after* we've
// loaded the region template into the page.

Spry.Data.initRegionsOnLoad = false;

// Register an observer on the "thumbnails" region of the page. Anytime its
// markup gets regenerated, we want to re-initialize the gallery so that the
// widgets stay functional.

Spry.Data.Region.addObserver("thumbnails", { onPostUpdate: function(){ InitializeGallery(); }});

// Add an onload handler that tells the dsPhotos data set to extract
// its data from the page. Also, remove the "staticVersion" class off
// of the <body> tag so that things get styled differently.

Spry.Utils.addLoadListener(function()
{
	Spry.$$("body.staticVersion").removeClassName("staticVersion");
	dsPhotos.loadData();
});
