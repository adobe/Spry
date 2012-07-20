Spry.Utils.addLoadListener(function()
{
	Spry.$$("#hoverExample tr").addEventListener("mouseover", function(e) { this.className = "hover"; }, false).addEventListener("mouseout", function(e) { this.className = ""; }, false);
});
