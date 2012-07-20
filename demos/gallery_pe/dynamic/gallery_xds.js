// gallery_xds.js - version 0.1 - Spry Pre-Release 1.6.1
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

// Create a data filter that will add some custom columns to
// our data set that the region template will make use of. Using
// our own custom column allows our template to be agnostic to the
// format of the data loaded by the data set. Of course this function
// will need to be modified if the developer uses one of their own custom
// data formats.

function PhotosFilter(ds, row, rowIndex)
{
	// The regions that use our data set expect 2 columns to exist. They
	// are the "path" and "thumbpath" columns which must contain complete
	// paths which are relative to the HTML page, or site relative, to the
	// images to load.
	// 
	// Since the XML file that Photoshop outputs splits the the directory path
	// and the image filename across different nodes in the XML tree. We need
	// to merge them into a single column value so things are easier to deal
	// with. We need to do the same for the thumbnail image.

	row.path = row["large/@base"] + row["photos/photo/@path"];
	row.thumbpath = row["thumbnail/@base"] + row["photos/photo/@thumbpath"];
	return row;
}

// Create a data set that will load the XML that describes all of
// the photos in our initial gallery. Make sure that the data set uses
// our PhotosFilter() function so that anytime data is loaded, our
// custom columns are created.

var dsPhotos = new Spry.Data.XMLDataSet("china.xml", "/gallery", { subPaths: "photos/photo", filterDataFunc: PhotosFilter });

// Register an onPostUpdate observer on the "thumbnails" region of the page.
// Anytime the markup for the region gets regenerated, we need to re-attach
// the thumbnail behaviors and reset the current thumbnail to the first one
// in the viewer.

Spry.Data.Region.addObserver("thumbnails", { onPostUpdate: function()
{
	if (gThumbViewer)
	{
		// The thumbnails region has been updated with
		// new content. If gThumbViewer is not null, we
		// know that we already created our widgets, so
		// all we really have to do, is make sure that the
		// thumb viewer adds the grow, shrink, and click
		// behaviors to the new thumbnails.

		gThumbViewer.attachBehaviors();
		gThumbViewer.select(0);
		return;
	}

	// The thumbnails region has updated for the very first
	// time, so lets create the gallery widgets. After this
	// call, gThumbViewer should be non-null, so we should
	// never hit this code again.

	InitializeGallery();

	// Now that we've created our widgets, override the default
	// link behavior for each link in the galleryLinks section
	// so that they load new XML into our dsPhotos data set instead
	// of taking us to new pages.

	Spry.$$("#galleryLinks a").addEventListener("click", function(e)
	{
		gSlideShowControl.stop();
		dsPhotos.setURL(this.href);
		dsPhotos.loadData();
		return false;
	}, false);
}});
