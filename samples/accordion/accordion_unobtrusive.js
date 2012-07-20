// Declare the widget name outside the function so it exists globally.
var sampleAccordion;
// Add a listener that fires after the page is loaded. This runs the actual constructor script.
Spry.Utils.addLoadListener(function()
{
	Spry.$$("#sampleAccordion").forEach(function(n) {  sampleAccordion = new Spry.Widget.Accordion("sampleAccordion");});
});