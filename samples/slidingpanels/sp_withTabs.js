var sp2;
var quotes;
var lastTab="nutshell";

function switchTab(tab)
{
	if (tab!=lastTab)
	{
		document.getElementById(tab).className=("tabActive");
		document.getElementById(lastTab).className=("tab");
		sp2.showPanel(tab+"Panel");
		lastTab=tab;
	}
}

function fadeInNextQuote()
{
	if (!quotes || quotes.length < 1)
		return;

	var curEle;

	if (typeof quotes.curIndex == "undefined")
		quotes.curIndex = quotes.length - 1;
	else
		curEle = quotes[quotes.curIndex];

	quotes.curIndex = (quotes.curIndex+1)%quotes.length;
	var nextEle = quotes[quotes.curIndex];

	if (curEle)
		Spry.Effect.DoFade(curEle, { from: 100, to: 0 });
	Spry.Effect.DoFade(nextEle, { to: 100, finish: function(){ setTimeout(function(){ fadeInNextQuote(); }, fadeInNextQuote.interval); } });
}

fadeInNextQuote.interval = 6000;

Spry.Utils.addLoadListener(function()
{
	// Show the sliding panels tab buttons.

	Spry.$$(".slidingTabPanelWrapper").setStyle("display: block");
	Spry.$$("#nutshell, #widgets, #data, #effects").addEventListener("click", function(){ switchTab(this.id); return false; }, false);

	// Turn the slidingPanel region into a real sliding panel widget.

	Spry.$$("#slidingPanel").addClassName("SlidingPanels").setAttribute("tabindex", "0");
	Spry.$$("#slidingPanel > div").addClassName("SlidingPanelsContentGroup");
	Spry.$$("#slidingPanel .SlidingPanelsContentGroup > div").addClassName("SlidingPanelsContent");
	sp2 = new Spry.Widget.SlidingPanels('slidingPanel');

	// Find the quoteBox and setup any quotes inside it for fading.

	Spry.$$(".quoteBox").setStyle("position: relative; height: 260px;");
	quotes = Spry.$$(".quote").setStyle("position: absolute; top: 0px; left: 0px; opacity: 0; filter: alpha(opacity=0);");
	fadeInNextQuote();
});