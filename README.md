Spry
====

The Spry framework for Ajax is a JavaScript library for  web designers that provides functionality that allows designers to  build pages that provide a richer experience for their users. It is  designed to bring Ajax to the web design community who can benefit from  Ajax, but are not well served by other frameworks. The first release of  the Spry framework was a preview of the data capabilities that enable  designers to incorporate XML data into their HTML documents using HTML,  CSS, and a minimal amount of JavaScript, without the need for  refreshing the entire page. The Spry framework is HTML-centric, and  easy to implement for users with basic knowledge of HTML, CSS and  JavaScript. The framework was designed such that the markup is simple  and the JavaScript is minimal. The Spry framework can be used by anyone  who is authoring for the web in their tool of choice.

Spry 1.6.1 is a small update that ensures Spry is compatible with Adobe AIR.

Before you get started, please take a moment to review the following important information.

#### Disclaimer

We want to remind you that this is PRE-RELEASE code. We are making it available to get your feedback and help us figure out where to take it. We expect to make changes to the framework as we go forward. We want you to build on this and let us know what you think, but please understand that we will make changes. We can't guarantee that something you build today will work in the next release.

### What is included in Prerelease 1.6.1

<p><strong><a href="articles/">Articles</a></strong> - <a href="docs.html">Documentation</a> that describe the Spry framework. <strong>Bold</strong> means new to this release.</p>
<p>Some PDFs are also available in the <a href="http://labs.adobe.com/technologies/spry/samples/">online samples</a> directory. </p>
<p><strong><a href="data/">Data</a></strong> - The XML data files used in all our sample files. </p>
<p><strong><a href="demos/">Demos</a></strong> - More <a href="demos/index.html">complex samples</a> that show the Spry framework in action.</p>
<ul>
<li><a href="demos/effects/index.html">Effects</a> - A demo of all our Spry Effects. Rewritten in 1.5.</li>
<li><a href="demos/formsvalidation/index.html">Form Validation</a> - A demo of the Form Validation widgets. </li>
<li><a href="demos/gallery/index.html" target="_blank">Photo Gallery</a>&#8212;An XML-based photo gallery.</li>
<li><a href="demos/products/index.html" target="_blank">Product Table</a>&#8212;An interactive data grid displaying XML-based data. </li>
<li><a href="demos/rssreader/index.html" target="_blank">RSS Reader</a>&#8212;An RSS reader showing how multiple XML files can be used to build a rich interface.</li>
<li><a href="demos/periodic_table/periodic_table.htm">Periodic Table</a> - A demo of the HTML data set and advanced CSS techniques.</li>
</ul>
<blockquote>
<p>Please note: These demos are a proof of concept for  the data capabilities of the Spry framework. They are not keyboard or  screen reader accessible. Please review the <a href="http://www.adobe.com/go/labs_spry_pr1_faq">FAQ</a> for more information.</p>
</blockquote>
<p><strong><a href="includes/">Includes</a></strong> - Core JavaScript files that implement the data framework. </p>
<ul>
<li><a href="includes/SpryCSVDataSet.js">SpryCSVDataSet.js</a> - Enables CSV files as a data source.</li>
<li><a href="includes/SpryData.js">SpryData.js</a> - Contains the code that defines XML data sets and dynamic regions.</li>
<li><a href="includes/SpryDataExtensions.js">SpryDataExtensions.js</a> - Contains helper functions such as advanced filtering.</li>
<li><a href="includes/SpryDataShell.js">SpryDataShell.js</a> - A placeholder data set that regions can bind to, which allows data sets of same/different formats to be swapped in and out.</li>
<li><a href="includes/SpryDebug.js">SpryDebug.js</a> - A file that provides advanced debugging information for Spry pages.</li>
<li><a href="includes/SpryDOMUtils.js">SpryDOMUtils.js</a> - Our Element Selector. Manipulate the page using CSS Selectors.</li>
<li><a href="includes/SpryEffects.js">SpryEffects.js</a> - The Spry Effects framework file. </li>
<li><a href="includes/SpryHTMLDataSet.js">SpryHTMLDataSet.js</a> - Enables the HTML data set functionality.</li>
<li><a href="includes/SpryJSONDataSet.js">SpryJSONDataSet.js</a> - Enables JSON as a data source.</li>
<li><a href="includes/SpryNestedJSONDataSet.js">SpryNestedJSONDataSet.js</a> - Allows the use of complex JSON as a data source.</li>
<li><a href="includes/SpryNestedXMLDataSet.js">SpryNestedXMLDataSet.js</a> - Allows the use of complex XML as a data source.</li>
<li><a href="includes/SpryPagedView.js">SpryPagedView.js</a> - Enabled users to easily set up paging in data sets.</li>
<li><a href="includes/SpryTSVDataSet.js">SpryTSVDataSet.js</a> - Enables TSV files as a data source. Users can also specify a different field delimiter other than tab.</li>
<li><a href="includes/SpryURLUtils.js">Spry URLUtils.js</a> - Get URL parameters and hashes to be used with Spry pages.</li>
<li><a href="includes/SpryUtils.js">SpryUtils.js</a> - Contains helper functions, mostly form submission code.</li>
<li><a href="includes/SpryXML.js">SpryXML.js</a> - Function file for handling XML formatting. Only required for certain sample files. </li>
<li><a href="includes/xpath.js">xpath.js</a> - Google's JavaScript implementation of the <a href="http://www.w3.org/TR/xpath" target="_blank">XPath 1.0</a> standard. You can get more information about it by   visiting their open source <a href="http://goog-ajaxslt.sourceforge.net/" target="_blank">google-ajaxslt project page</a>.</li>
</ul>
<p><strong>includes_minified</strong> - <a href="http://javascript.crockford.com/jsmin.html">Minified</a> copies of all our javascript files..</p>
<p><strong>includes_packed</strong> - <a href="http://dean.edwards.name/packer/">Packed</a> copies of all our javascript files.<br />
</p>
<p><strong><a href="samples/">Samples</a></strong> - A series of <a href="samples/index.html">simple files</a> (located within the /samples/ directory in the ZIP) that show basic functionality of Spry . These  provide working code samples of specific features of spry or common  techniques used on Spry pages. One of the more useful samples is the <a href="samples/data_region/DataSetExplorer.html">Data Set Explorer</a> page. </p>
<p><strong><a href="widgets/">Widgets</a></strong> - Contains our released widget js, css and reference  files. <a href="widgets/widgets.html">Widget Map</a>.</p>
<p><a href="License.html">License</a>&#8212;Spry is licensed under a BSD license. <br />
<a href="ChangeLog.html">Spry change log</a>&#8212;Log of what changed between Prerelease 1 and Prerelease 1.6.1.</p>
<div class="nav-up"><a href="#tabtop">back to top</a></div>
<h3>Where can I get more information? </h3>
<blockquote>
<p><a href="http://www.adobe.com/go/labs_spry_pr1_faq">FAQ</a> - Frequently asked questions (and answers!) about the Spry framework.</p>
<p><a href="http://www.adobe.com/devnet/spry/">Spry Dev Center</a> - Articles and tutorials about Spry.</p>
<p><a href="http://www.adobe.com/devnet/dreamweaver/articles/spry_photo_album.html">Creating a  Web Photo Album with Spry</a> -Walk through the steps to create a dynamic and flexible page using the Spry framework with remarkably few lines of code.</p>
<p><a href="http://www.adobe.com/cfusion/webforums/forum/categories.cfm?forumid=72&amp;catid=602" target="_blank">Adobe Labs Spry Forum</a> - Post any questions or feedback on the Spry framework to the forums available on the Adobe Labs site.</p>
<p><a href="http://www.adobe.com/go/labs_spry_pr1_wiki">Adobe Labs Wiki</a> - The Adobe Labs wiki allows editing of pages and content  by the community, but only within specific sections of the site. For  resources that provide group edit access, you will be required to log  in with your Adobe Labs/Adobe.com username. </p>
<p><a href="http://blogs.adobe.com/spryteam/">Spry Blog</a>- The Spry Team posts to the blog periodically, with Spry news and information.</p>
<p>We  do ask that you only contribute to a page or resource if you feel you  can improve it. Please do not add comments or feedback to the author to  the pages directly; there is a 'Discussion' tab available for most all  areas of the site that you can use to submit your feedback within, if you so  desire. Use this tab to comment on or discuss a particular page or  resource, so we can keep the content focused and on-topic.</p>
<p><a href="http://www.adobe.com/go/labs_spry_pr1_rss">Adobe Labs RSS Feeds</a> - Please subscribe to the <a href="http://www.adobe.com/go/labs_rss">RSS feeds</a> on Adobe Labs to be   notified when new releases of Spry become available.</p>
<div class="nav-up"><a href="#tabtop">back to top</a></div>
<h4>How You Can Help Us</h4>
<p>While we want to hear about bugs that you find in this prerelease, we are especially interested in what you think about our approach. We are making this available so that we have a better opportunity to address your feedback. Please let us know:</p>
<blockquote>
  <p>Are there things that miss the mark?<br />
    Are there things that make you think &quot;This would be great if they just changed/added...&quot;?<br />
    Are there things that don't work the way you think they should?</p>
</blockquote>
<div class="nav-up"><a href="#tabtop">back to top</a></div>
<h4>Feedback</h4>
<p>Post any questions or feedback on the Spry framework to the <a href="http://www.adobe.com/go/labs_spry_pr1_forum" target="_blank">forums</a> available on the Adobe site.</p>
</blockquote>
<p>We look forward to seeing what you think!</p>