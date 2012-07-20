var cp;

Spry.Utils.addLoadListener(function()
{
	Spry.Utils.addEventListener("openLink", "click", function(e) { cp.open(); return false; }, false);
	Spry.Utils.addEventListener("closeLink", "click", function(e) { cp.close(); return false; }, false);

	cp = new Spry.Widget.CollapsiblePanel('cp', { contentIsOpen: false });
});
