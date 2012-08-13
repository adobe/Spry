//Declare the varibale name outside the function so it is global. 
var TabbedPanels1;
function InitPage()
{
	TabbedPanels1 = new Spry.Widget.TabbedPanels("TabbedPanels1");
	Spry.Utils.addEventListener("one", "click", function(){TabbedPanels1.showPanel(0);}, false);
	Spry.Utils.addEventListener("two", "click", function(){TabbedPanels1.showPanel(1);}, false);
	Spry.Utils.addEventListener("three", "click", function(){TabbedPanels1.showPanel(2);}, false);
	Spry.Utils.addEventListener("four", "click", function(){TabbedPanels1.showPanel(3);}, false);
}
Spry.Utils.addLoadListener(InitPage);