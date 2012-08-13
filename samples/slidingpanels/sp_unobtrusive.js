//Declare the varibale name outside the function so it is global. 
var sp;
function InitPage()
{
	sp = new Spry.Widget.SlidingPanels("ticker");
	Spry.$$("#link1, #link4, #link6").addEventListener("click", function(){sp.showPanel('item2');return false; }, false); 
	Spry.$$("#link2, #link5").addEventListener("click", function(){sp.showPanel('item1');return false; }, false); 
	Spry.$$("#link3, #link7").addEventListener("click", function(){sp.showPanel('item3');return false; }, false); 
}
Spry.Utils.addLoadListener(InitPage);
