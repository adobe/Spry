var cp;

function AddEventListener(element, eventType, handler, capture)
{
	if (element.addEventListener)
		element.addEventListener(eventType, handler, capture);
	else if (element.attachEvent)
		element.attachEvent("on" + eventType, handler);
}

window.onload = function()
{
	AddEventListener(document.getElementById("openLink"), "click", function(e)
	{
		cp.open();

		if (e.preventDefault) e.preventDefault();
		else e.returnResult = false;
		if (e.stopPropagation) e.stopPropagation();
		else e.cancelBubble = true;
	}, false);

	AddEventListener(document.getElementById("closeLink"), "click", function(e)
	{
		cp.close();

		if (e.preventDefault) e.preventDefault();
		else e.returnResult = false;
		if (e.stopPropagation) e.stopPropagation();
		else e.cancelBubble = true;
	}, false);

	cp = new Spry.Widget.CollapsiblePanel('cp', { contentIsOpen: false });
};
