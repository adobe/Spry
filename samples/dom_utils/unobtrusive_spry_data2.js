var ds1 = new Spry.Data.XMLDataSet("../../data/adobe_products.xml", "products/product");
var dsFeatures = new Spry.Data.NestedXMLDataSet(ds1, "features/feature");
// Add a listener that fires after the page is loaded. 
Spry.Utils.addLoadListener(function()
{
    //Set attributes.
	Spry.$$("#myTable").setAttribute("spry:region","ds1");
	Spry.$$("#repeatRow").setAttribute("spry:repeat","ds1");
	Spry.$$("#repeatRow").setAttribute("spry:setrow","ds1");
	Spry.$$("#theName").setAttribute("spry:sort","name");
	Spry.$$("#repeatRow").setAttribute("spry:even","even");
	Spry.$$("#theCategory").setAttribute("spry:sort","category");
	Spry.$$(".AccordionPanelContent").setAttribute("spry:detailregion","ds1 dsFeatures");
	Spry.$$("#panel").setAttribute("spry:repeatchildren","dsFeatures");
	//Call initRegions to ensure that processing happens in the correct order.
	Spry.Data.initRegions();
	//create Accordion after the regions are done.
	var Accordion1 = new Spry.Widget.Accordion("Accordion1");
});