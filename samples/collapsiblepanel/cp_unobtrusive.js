var cp_options;
function InitPage()
{
	Spry.$$(".CollapsiblePanel:not(#CollapsiblePanel2)").forEach(function(n) { window[n.id] = new Spry.Widget.CollapsiblePanel(n); });
	cp_options = new Spry.Widget.CollapsiblePanel("CollapsiblePanel2", { contentIsOpen: false, enableAnimation: false });
	
	Spry.$$(".open").addEventListener("click", function(e){ CollapsiblePanel4.open(); return false;}, false);

	Spry.$$(".close").addEventListener("click", function(e){ CollapsiblePanel4.close(); return false;}, false);
}

Spry.Utils.addLoadListener(InitPage);

