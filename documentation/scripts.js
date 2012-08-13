// SETS AN ONCLICK EVENT LISTENER ON ALL LIST ITEMS IN THE NAVE PAGES
function pageload() {

	if (document.getElementsByTagName)
	{
		var clk_li = top.navigation.document.getElementsByTagName('li');
	}
	else if (document.all)
	{
		var clk_li = top.navigation.document.all.tags('li');
	}
	else
	{
		return;
	}

	for (var i=0;i<clk_li.length;i++)
	{
		if(clk_li[i].parentNode.id != "tabsRow") {
			clk_li[i].onclick = showList_li;
		}
	}
	
}


// OPENS AND CLOSES SUB-LEVELS IN THE NAVIGATION LISTS
function showList_li(e)
{
	var y = this;
	var z = y.getElementsByTagName('ul');

	if(z[0]) {
	
		if( z[0].className == 'hideIt') 
		{
			this.className = 'hasChildren_on';
			z[0].className = 'showIt';

		} else
		{
			this.className = 'hasChildren';
			z[0].className = 'hideIt';
		}
	}
	
	if (!e) var e = top.navigation.event;
	e.cancelBubble = true;
	// if (e.stopPropagation) e.stopPropagation();
	
}
