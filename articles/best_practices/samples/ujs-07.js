var dsEmployees = new Spry.Data.XMLDataSet("../../../data/employees-01.xml", "/employees/employee");

// Since this JavaScript file can load before the browser has even read in and created the actual
// DOM elements we want to attach attributes to, we need to add a load listener that will set the
// attributes on the appropriate elements after the onload event fires.

Spry.Utils.addLoadListener(function()
{
	// Attach the spry namespaced attributes unobtrusively.

	Spry.$$("div").setAttribute("spry:region", "dsEmployees");
	Spry.$$("#hoverExample th:nth-child(1)").setAttribute("spry:sort", "lastname");
	Spry.$$("#hoverExample th:nth-child(2)").setAttribute("spry:sort", "firstname");
	Spry.$$("#hoverExample tr:nth-child(2)").setAttribute("spry:repeat", "dsEmployees");

	// Tell Spry to process regions within the document.

	Spry.Data.initRegions();
});
