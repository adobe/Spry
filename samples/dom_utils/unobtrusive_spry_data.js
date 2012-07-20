//the data set constructor
var ds1 = new Spry.Data.XMLDataSet("../../data/adobe_products.xml", "products/product");

// Add a listener that fires after the page is loaded. 
Spry.Utils.addLoadListener(function()
{
	Spry.$$("#myTable").setAttribute("spry:region","ds1");
	Spry.$$("#repeatRow").setAttribute("spry:repeat","ds1");
	Spry.$$("#theName").setAttribute("spry:sort","name");
	Spry.$$("#theCategory").setAttribute("spry:sort","category");
});