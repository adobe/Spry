// Spry loadListener that fires off when the page is loaded.
Spry.Utils.addLoadListener(function makeMenus(){
//loops through all the horizontal menus											  
	Spry.$$(".MenuBarHorizontal").forEach(function(n) {window[n.id] = new Spry.Widget.MenuBar(n);});
//handles the single vertical menu
	var MenuBar2 = new Spry.Widget.MenuBar("MenuBar2", {imgRight:"../../widgets/menubar/SpryMenuBarRightHover.gif"});
	});