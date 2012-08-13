//For AHV 1.1, this goes back to previous page in history.
function closePopup()
{
  window.close();
}

// HIDES AND SHOWS LARGE GRAPHICS IN THE CONTENT PAGES
function showHideImage(thisID, obj) 
{
	
	var imgElement = document.getElementById(thisID);
	var imgText = obj;

	if( imgElement.className == "largeImage" )
	{
			imgElement.src = "images/" + thisID + ".png";
			imgElement.className="smallImage";
			obj.className="showImageLink";
			obj.href="#";
			obj.firstChild.nodeValue = terms_AHV_LARGE_GRAPHIC;
			window.focus();
	}
	else
	{
			imgElement.src = "images/" + thisID + "_popup.png";
			imgElement.className="largeImage";
			obj.className="hideImageLink";
			obj.href="#";
			obj.firstChild.nodeValue = terms_AHV_SMALL_GRAPHIC;
			window.focus();
	}
}
// js function for expand collapse menu functionality
function KeyCheck(e, tree, idx)
{
  var KeyID = (window.event) ? event.keyCode : e.keyCode;
  var node =  YAHOO.widget.TreeView.getNode(tree, idx);
   switch(KeyID)
   {
      case 37:
     // alert("Arrow Left");
      node.collapse();
      break;
      case 39:
     // alert("Arrow Right");
      node.expand();
      break;
   }
}
// js function for hide/display mini-elements functionality
function toggleLayer(whichLayer) {
	if (document.getElementById) {
		// this is the way the standards work
		var obj=document.getElementById(whichLayer);
		var img = obj.previousSibling.firstChild.firstChild;
		img.setAttribute("src","images/on.gif");
		var styleatt = obj.style;
		styleatt.display = styleatt.display? "":"block";
		
		//change the class of the h3 per design
		if (obj.previousSibling.className === "topictitle3")	{
			obj.previousSibling.className ="topictitle3off";
		    img.setAttribute("src","images/on.gif");
		} else if (obj.previousSibling.className === "topictitle3off")	{
			obj.previousSibling.className ="topictitle3";
			img.setAttribute("src","images/off.gif");
		} 
	}
	else if (document.all) {
		// this is the way old msie versions work
		var style2 = document.all[whichLayer].style;
		style2.display = style2.display? "":"block";
	}
}
 function addBookmark( bm_url_str, bm_str_label ) {
  parent.navigation.flashProxy.call('addBookmark', bm_url_str, bm_str_label );
}

var upperAsciiXlatTbl = new Array(
223,"ss",
230,"ae",
198,"ae",
156,"oe",
140,"oe",
240,"eth",
208,"eth",
141,"y",
159,"y"
);

var maxNumberOfShownSearchHits = 100;
var showInputStringAlerts = 0;
var navigationCookie = "";

////////////// COOKIE-RELATED FUNCTIONS /////////////////////////////////////////
//  test the navigator object for cookie enabling
//  additional code would need to be added for
//  to support browsers pre navigator 4 or IE5 or 
//  other browsers that dont support
//  the navigator object if any .. 
 function cookiesNotEnabled() 
{
	return true;     // We're not going to use cookies
}
/*
 * This function parses comma-separated name=value 
 * argument pairs from the query string of the URL. 
 * It stores the name=value pairs in 
 * properties of an object and returns that object.
 */
function getArgs() 
{
	var args = new Object();
	var query = top.location.search.substring(1); 
	// Get query string
	if (query.length > 0)	{
		var pairs = query.split(",");
		// Break at comma
		for(var i = 0; i < pairs.length; i++) 
		{
			var pos = pairs[i].indexOf('=');
			  // Look for "name=value"
			if (pos == -1) continue;
			  // If not found, skip
			var argname = pairs[i].substring(0,pos);
			  // Extract the name
			var value = pairs[i].substring(pos+1);
			// Watch out for JavaScript injections...
			var chk_value = value.toLowerCase();
			if (chk_value.indexOf("javascript:",0) == -1) {
				// Extract the value
				args[argname] = unescape(value);
			} else {
				args[name] = false;
			}

		}
	} else {
		args[name] = false;		
	}
	return args;     // Return the object
}

/////////////////////////////// COOKIE-RELATED FUNCTIONS ////////////////////////
// Bill Dortch getCookieVal and GetCookie routines
function getCookieVal(offset) {
  var endstr=document.cookie.indexOf(";",offset);
  if (endstr==-1)endstr=document.cookie.length;
  return unescape(document.cookie.substring(offset, endstr));
}
function GetCookie(name) {
  var arg=name+"=";
  var alen=arg.length;
  var clen=document.cookie.length;
  var i=0;

  if (cookiesNotEnabled())
  {
	var args = getArgs();
	if (args[name] !== false) { 
		return args[name];
	}	
  } else {
	  while(i<clen){
	    var j=i+alen;
	    if(document.cookie.substring(i,j)==arg)return getCookieVal(j);
	    i=document.cookie.indexOf(" ",i)+1;
	    if(i==0)break; 
	  }
	  return null;
	}
}
function getTopCookieVal(offset) {
  var endstr=top.document.cookie.indexOf(";",offset);
  if (endstr==-1)endstr=top.document.cookie.length;
  return unescape(top.document.cookie.substring(offset, endstr));
}
function GetTopCookie(name) {
  var arg=name+"=";
  var alen=arg.length;
  var clen=top.document.cookie.length;
  var i=0;
  while(i<clen){
    var j=i+alen;
    if(top.document.cookie.substring(i,j)==arg)return getTopCookieVal(j);
    i=top.document.cookie.indexOf(" ",i)+1;
    if(i==0)break; 
  }
  return null;
}
// SetCookie
// -----------
// This function is called to set a cookie in the current document.
//  params:
//		n - name of the cookie
//		v - value of the cookie
//		minutes - the duration of the cookie in minutes (that is, how many minutes before it expires)
function SetCookie(n,v,minutes) {
 var Then = new Date();
 Then.setTime(Then.getTime() + minutes * 60 * 1000);
 document.cookie = n + "=" + v + ";expires=" + Then.toGMTString();
}
// getContentCookie
// ----------------
// This function reads the content cookie set by the handleContext funtion.
//
function getContentCookie()
{
	var contentCookie = GetCookie("content");
	top.document.cookie = "content=";

	// What does this expression mean?
	// (contentCookie.indexOf("htm") != -1)
	if ( (contentCookie != null) && (contentCookie.indexOf("htm") != -1) ) 
	{
		document.cookie = "content="; // Wipe out the cookie
		top.document.cookie = "histR=" + contentCookie;
		location.replace(contentCookie);
	}			
}
// getNavigationCookie
// -------------------
// This function reads the content cookie set by the handleContext funtion.
//
function getNavigationCookie()
{
	navigationCookie = GetCookie("navigation");
	top.document.cookie = "navigation=";

	// What does this expression mean?
	// (navigationCookie.indexOf("htm") != -1)
	if ( (navigationCookie != null) && (navigationCookie.indexOf("htm") != -1) ) 
	{
		document.cookie = "navigation="; // Wipe out the cookie
		top.document.cookie = "histL=" + navigationCookie;
		location.replace(navigationCookie);
	}
				
}

// handleContext
// -------------
// This function is called from content pages. It sets a cookie as soon
// as the page is loaded. If the content page is not in it's proper place
// in the frameset, the frameset will be loaded and the page will be 
// restored using the value in this cookie.
//
function handleContext(which)
{
	var docLocLastNode = lastNodeOf(document.location);
	var srchString = '';
	if(document.location.search.length !== 0) { 
		srchString = document.location.search;
	}
	if( top.frames.length ) {
		
		if( which ) {	// This page is supposed to go into the CONTENT frame
			if( docLocLastNode != lastNodeOf(top.frames["content"].location) ) {	// ...but it is being loaded elsewhere
				if (cookiesNotEnabled())
				{
					top.location.replace("help.html?content=" + docLocLastNode + srchString);
				}
				top.location.replace("help.html");
				top.document.cookie = "content=" + docLocLastNode + srchString;
			}
			else {
				top.document.cookie = "histR=" + docLocLastNode;
			}
		}
		else {			// This page is supposed to go into the NAVIGATION frame
			if( docLocLastNode != lastNodeOf(top.frames["navigation"].location) ) {	// ...but it is being loaded elsewhere
				top.location.replace("help.html");
				top.document.cookie = "navigation=" + lastNodeOf(top.frames["navigation"].history.previous);
			}
			else {
				top.document.cookie = "histL=" + docLocLastNode;
			}
		}
	}
	else {
		if( which ) {
      //alert(document.location);
			top.document.cookie = "navigation=toc.html";
			top.document.cookie = "histL=toc.html";
			top.document.cookie = "content=" + docLocLastNode  + srchString;
			top.document.cookie = "histR=" + docLocLastNode;
			if (cookiesNotEnabled())
			{
				top.location.replace("help.html?content=" + docLocLastNode  + srchString);
				return;
			}
		}
		else {
			top.document.cookie = "navigation=" + docLocLastNode;
			top.document.cookie = "histL=" + docLocLastNode;
			top.document.cookie = "content=splash.html";
			top.document.cookie = "histR=splash.html";
		}
		top.location.replace("help.html");
	}
}
// lastNodeOf
// ----------
// This function gets passed a URL and returns the last node of same.
function lastNodeOf(e)
{
	var expr = "" + e;
	var to = expr.indexOf("?");
	if( to !== -1) {
		var path = expr.substring(0,to);		
		var pieces = path.split("/");
		return pieces[pieces.length -1];
	}  else	{	
		var pos = expr.lastIndexOf("/");	
		if( (pos != -1) && (pos+1 != expr.length) ) {
			return expr.substr(pos+1);
		} else {
			return expr;
		}
	}
}
// frameBuster
// -----------
// This function is called by the frameset to ensure it's always loaded
// at the top level of the current window.
//
function frameBuster()
{
	var thisLocation = document.location;
	if ( document.location != top.location )
	{
		top.location.replace("help.html");
	}
}


// SEARCH RELATED.......................................SEARCH RELATED
// SEARCH RELATED.......................................SEARCH RELATED
// SEARCH RELATED.......................................SEARCH RELATED
// SEARCH RELATED.......................................SEARCH RELATED
// SEARCH RELATED.......................................SEARCH RELATED
// SEARCH RELATED.......................................SEARCH RELATED
// SEARCH RELATED.......................................SEARCH RELATED
// SEARCH RELATED.......................................SEARCH RELATED
// SEARCH RELATED.......................................SEARCH RELATED
// SEARCH RELATED.......................................SEARCH RELATED
function bubbleSortWithShadow(a,b)
{
	var temp;
	for(var j=1; j<a.length; j++) {
		for(var i=0; i<j; i++) {
			if( a[i] < a[j] ) {	
				temp = a[j];a[j] = a[i];a[i] = temp;
				temp = b[j];b[j] = b[i];b[i] = temp;
			}
		}
	}
}
//---------------------------------------------------
function buildHtmlResultsStr()
{
	var innerHTMLstring,ndxEnd;

	// Gather all of the results display lines into the 'resultsArr'
		ndxEnd = (matchesArrIndices.length > maxNumberOfShownSearchHits ) ? maxNumberOfShownSearchHits : matchesArrIndices.length;

		for(var ndx=0, resultsArr = new Array(); ndx < ndxEnd; ndx++) {
			resultsArr[resultsArr.length] = buildResultsStrOneLine(matchesArrIndices[ndx],matchesArrHits[ndx]);
		}

	// Convert this 'resultsArr' into a single string that will be injected into this search page.
		innerHTMLstring = "";
		for( var ndx=0; ndx < resultsArr.length; ndx++ ) {
			innerHTMLstring = innerHTMLstring + resultsArr[ndx];
		}
	return innerHTMLstring;
}
//---------------------------------------------------
function buildResultsStrOneLine(a,b)
{
	var retStr;
	retStr = "<p class=\"searchresults\"><a href=\"" + top.fileArr[a] + ".html\"";

	// for debug...
	//retStr += "target=\"content\" ";
	//retStr += "title=\"" + top.fileArr[a] + ".html-";
	//retStr += a + "-" + b + "\">";

	// for production...
	retStr += "target=\"content\" >";

	retStr += top.titleArr[a] + "</a></p>";
	return retStr;
}
//---------------------------------------------------
// checkForHits
//  Break up the search term into words.
//  Check each of those words against...
//		(a) cached titles and 
//		(b) cached content lines 
//  Perform the hit detection for each one, 
//  storing the results into (hits-ordered) 
//		'matchesArrIndices' and 
//		'matchesArrHits'.
//---------------------------------------------------
function checkForHits()
{
	var inputWords = new Array();
	var tempArr = new Array();

	// Split the search term into individual search words
		tempArr = searchTerm.split(" ");
		for(var ndx=0; ndx < tempArr.length; ndx++) {
			if( tempArr[ndx].length ) {
				inputWords[inputWords.length] = tempArr[ndx];
			}
		}

	// Initialization
		matchesArrHits = new Array();
		matchesArrIndices = new Array();

	// Initialize the 'maskArr' and the 'hitsArr'
		maskArr = new Array();
		hitsArr = new Array();
		for( var ndx = 0; ndx < top.fileArr.length; ndx++ ) {
			maskArr[maskArr.length] = 1;
			hitsArr[hitsArr.length] = 0;
		}

	// Do checking for matches on EACH OF THE INPUT WORDS
		for( var ndx = 0; ndx < inputWords.length; ndx++ ) {

			// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
			if( ! checkForHitsWordAgainstPages( inputWords[ndx] ) ) {
				return; 	// No sense in continuing, match has failed.
			}
			// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

			for( var ndx2 = 0; ndx2 < hitsArr.length; ndx2++ ) {
				if( hitsArr[ndx2] == 0 ) {
					maskArr[ndx2] = 0;
				}
				else {
					if( maskArr[ndx2] != 0 ) {
						maskArr[ndx2] += hitsArr[ndx2];
					}
				}
			}
		}

	// From the final 'maskArr', generate 'matchesArrHits' and 'matchesArrIndices'	
		for( var ndx = 0; ndx < maskArr.length; ndx++ ) {
			if( maskArr[ndx] ) {
				matchesArrHits[matchesArrHits.length] = maskArr[ndx];
				matchesArrIndices[matchesArrIndices.length] = ndx;
			}
		}

	// If there were any hits, then sort them by highest hits first
		if( matchesArrIndices.length ) {
			bubbleSortWithShadow(matchesArrHits, matchesArrIndices);
		}
}
//---------------------------------------------------
function checkForHitsWordAgainstPages(w)		
{
	var hitAnywhere = 0;
	
	if(showInputStringAlerts){alert( "Length of sc2: " + top.sc2.length );}

	// Process each of the content lines (one per file/page)
		for(var ndx=0; ndx < top.sc2.length; ndx++) {

			// Put the cached title into glob_title
				glob_title = top.sc1[ndx];

			// Put the cached content line into glob_phrase
				glob_phrase = top.sc2[ndx];
				
			if( maskArr[ndx] ) {
			// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
				if( top.isDblByte ) {
					hitsArr[ndx] = checkForHitsWordAgainstTitleAndLine2(w,ndx);
				}
				else {
					hitsArr[ndx] = checkForHitsWordAgainstTitleAndLine(w,ndx);
				}
				if( hitsArr[ndx] ) {
					hitAnywhere = 1;
				}
			// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
			}
		}
	return hitAnywhere;
}
//---------------------------------------------------
function checkForHitsWordAgainstTitleAndLine(w, lineNdx)
{
	var words;
	var titleHitCnt = 0;
	var contentHitCnt = 0;
	var regex = new RegExp(w, "i");

	// TITLE .........................................
		words = new Array();
		words = glob_title.split(" ");

		// EXECUTE TITLE MATCH TEST
		for( var ndx = 0; ndx < words.length; ndx++ ) {
			if( w == words[ndx] ) {
				titleHitCnt += 100;
				break;
			}
		}

	// CONTENT .........................................
		words = new Array();
		words = glob_phrase.split(" ");

		// EXECUTE CONTENT MATCH TEST
		if( regex.test(glob_phrase) ) {	// See if word is anywhere within the phrase first.
			for( var ndx = 0; ndx < words.length; ndx++ ) {
				if( w == words[ndx] ) {
					contentHitCnt += getInstanceCount(lineNdx,ndx);
					break;
				}
				//else if( w < words[ndx] ) { // If word is greater than the remaining words, leave
				//	break;
				//}
			}
		}

	return titleHitCnt + contentHitCnt;
}
//---------------------------------------------------
function checkForHitsWordAgainstTitleAndLine2(w, lineNdx)
{
	var titleHitCnt = 0;
	var contentHitCnt = 0;

	// TITLE .........................................
		if( glob_title.indexOf(w) != -1 ) {
			titleHitCnt = 100;
		}

	// CONTENT .........................................
		contentHitCnt = indexesOf(glob_phrase,w);

	return titleHitCnt + contentHitCnt;
}
//---------------------------------------------------
// checkTheInputString
// 
//  returns...
//		empty string - if there is valid input to search
//		message string - if there is NO VALID INPUT to search
//---------------------------------------------------
function checkTheInputString()
{
	var myArr = new Array();
	var tempArr = new Array();
	var foundStopOrShortWord = 0;
	var ptn1 = /\d\D/;
	var ptn2 = /\D\d/;

	handleWhitespaceRemoval();

	searchTerm = searchTerm.toLowerCase();

	searchTerm = filterTheChars(searchTerm);
		
	handleWhitespaceRemoval();

	if( searchTerm.length ) {
		
		// Split the searchTerm
			tempArr = searchTerm.split(" ",100);
			if(showInputStringAlerts){alert( "size of tempArr: " + tempArr.length );}

		// Handle periods
			for( var ndx = 0; ndx < tempArr.length; ndx++ ) {
				if( tempArr[ndx].charCodeAt(0) == 46 ) {	// periods at the start of word
					//tempArr[ndx] = tempArr[ndx].substr(1); // NOTE: We don't want to do this. (e.g. ".txt")
				}
				if( tempArr[ndx].charCodeAt(tempArr[ndx].length-1) == 46 ) { // end of word
					tempArr[ndx] = tempArr[ndx].substr(0,tempArr[ndx].length-1);
				}
			}
			
		// Do stopwords and shortwords removal
			for( var ndx = 0; ndx < tempArr.length; ndx++ ) {
				var word = tempArr[ndx];
				if(showInputStringAlerts){alert( "Checking word: " + word );}
				
				if( ! top.sw[word] ) {
					if( word.length < 2 ) {
						foundStopOrShortWord = 1;
					}
					else if( (word.length > 2) || (ptn1.test(word) || ptn2.test(word)) ) {
						myArr[myArr.length] = tempArr[ndx];
					}
					else {
						foundStopOrShortWord = 1;
					}
				}
				else {
					foundStopOrShortWord = 1;
				}
			}

		// Now reconstruct the searchTerm, based upon the 'myArr'
			searchTerm = "";
			for( var ndx = 0; ndx < myArr.length; ndx++ ) {
				searchTerm = searchTerm + myArr[ndx] + " ";
			}

		handleWhitespaceRemoval();

		if(showInputStringAlerts){alert( "FINAL SEARCH TERM: *" + searchTerm + "*" );}
			
		if( foundStopOrShortWord && ! searchTerm.length ) {
			return MSG_stopAndShortWords;
		}
		top.srch_input_massaged = searchTerm;
		return "";
	} 
	else {
		return MSG_noSearchTermEntered;
	}
}
//---------------------------------------------------
function checkTheInputString2()		// double-byte version
{
	var tempArr = new Array();

	handleWhitespaceRemoval();
	searchTerm = searchTerm.toLowerCase();

	if( searchTerm.length ) {

		// Split the searchTerm
			tempArr = searchTerm.split(" ",100);
			if(showInputStringAlerts){alert( "number of search terms: " + tempArr.length );}

		// Now reconstruct the searchTerm, based upon the 'tempArr'
			searchTerm = "";
			for( var ndx = 0; ndx < tempArr.length; ndx++ ) {
				searchTerm = searchTerm + tempArr[ndx] + " ";
			}
			handleWhitespaceRemoval();

if(showInputStringAlerts){alert( "Massaged search term: " + searchTerm );}

		top.srch_input_massaged = searchTerm;
		return "";
	}
	else {
		return MSG_noSearchTermEntered;
	}
}
//---------------------------------------------------
function doIEsearch()
{
	var stStr = "";
			
	document.forms[0].sh_term.value = top.srch_input_verbatim;
	
	if( top.srch_message.length ) {
		document.getElementById("results").innerHTML = top.srch_message;
		top.srch_message = "";
	}
	else if( top.srch_1_shot ) {
		top.srch_1_shot = 0;
		
		searchTerm = top.srch_input_massaged;
		checkForHits();	// Sets: 'matchesArrIndices' and 'matchesArrHits'

		if( matchesArrIndices.length ) {	// If there were matches/hits...
			stStr = "<div class=\"form\">" + MSG_pagesContaining + top.srch_input_massaged + "</div>\n";
			document.getElementById("results").innerHTML = stStr + buildHtmlResultsStr();
		}
		else {
			document.getElementById("results").innerHTML = MSG_noPagesContain + top.srch_input_massaged;
		}
		//searching_message.style.visibility="visible";
	}
	top.srch_input_verbatim = "";
}
//---------------------------------------------------
function getInstanceCount( lineIndex, wordIndex )
{
	var instancesStr = top.instances[lineIndex];	// e.g. "1432931"
	var ch = instancesStr.substr(wordIndex,1);
	
	return parseInt(ch);
}
//---------------------------------------------------
function handleWhitespaceRemoval()
{
	var re_1 = /^\s/;
	var re_2 = /\s$/;
	var re_3 = /\s\s/;
	var temp;

	// Remove leading whitespace
		while( true ) {
			temp = searchTerm.replace(re_1,"");
			if( temp == searchTerm ) {
				break;
			}
			searchTerm = temp;
		}
	// Remove trailing whitespace
		while( true ) {
			temp = searchTerm.replace(re_2,"");
			if( temp == searchTerm ) {
				break;
			}
			searchTerm = temp;
		}
	// Replace multiple contiguous spaces with a single space
		while( searchTerm.search(re_3) != -1 ) {
			temp = searchTerm.replace(re_3," ");
			searchTerm = temp;
		}
}
//--------------------------------------------------
function isAcceptableChar(chrNdx)
{
	var acceptableChars = new Array( 32, 46, 95 );	// space, period, underscore
	
	for( var ndx = 0; ndx < acceptableChars.length; ndx++ ) {
		if( chrNdx == acceptableChars[ndx] ) {
			return true;
		}
	}
	return false;
}
//--------------------------------------------------
function indexesOf(str,ptn)
{
	var position = 0;
	var hits = -1;
	var start = -1;

	while( position != -1 ) {
		position = str.indexOf(ptn, start+1);
		hits += 1;
		start = position;
	}
	return hits;
}
//--------------------------------------------------
function filterTheChars(line)
{
	var retStr = "",tempStr;
	var ch, chCode, retChr;
	var ndx;
	
	for( ndx = 0; ndx < line.length; ndx++ ) {
		ch = line.substr(ndx,1);
		chCode = ch.charCodeAt(0);
		
		
			if( (chCode >= 192) && (chCode <= 221) ) {	// Handle capital upper-ASCII characters
				chCode = chCode + 32;
				retChr = ASCII_to_char(chCode);
			}
			else if( withinAcceptableRanges(chCode) || isAcceptableChar(chCode) ) { // Acceptable characters
				retChr = ch;
			}
			else {
				tempStr = isLigatureChar(chCode);

				if( tempStr.length ) {	//Don't replace ligatures.
					retChr = ch;
				}
				else {		// Turn all else into space	
					retChr = " ";
				}
			}

		// Grow the return string
			retStr += retChr;
	}
	
	return retStr;
}
//--------------------------------------------------
function isLigatureChar(codeToCheck) {
	var xlatTblNdx, code, replStr = "";

	for( xlatTblNdx = 0; xlatTblNdx < upperAsciiXlatTbl.length; xlatTblNdx+=2 ) {

		code = upperAsciiXlatTbl[xlatTblNdx];
		if( code == codeToCheck ) {
			replStr = upperAsciiXlatTbl[xlatTblNdx+1];
			break;
		}
	}
	
	return replStr;
}
//--------------------------------------------------
function respondToSearchButton() 
{
	var myStr;
	document.getElementById("results").innerHTML = ""; //We don't expect this to be slow enough to need a message.	
	top.srch_input_verbatim = document.forms[0].sh_term.value;
	searchTerm = document.forms[0].sh_term.value;
	
	if( top.isDblByte ) {
		myStr = checkTheInputString2();
	}
	else {
		myStr = checkTheInputString();	
	}
	
	top.srch_message = myStr;
	top.srch_1_shot = top.srch_message.length ? 0 : 1;
	
	if( (! myStr.length) && (! top.didDbLoad) ) {
		document.location = "srch_fset.html";
	}
	else {
		document.location = "search.html";
	}
}
//---------------------------------------------------
function strReplace(orig,src,dest)
{
	var startPos=0;
	var matchPos = orig.indexOf(src,startPos);
	var retLine="";
	
	while(matchPos != -1) {
		retLine = retLine + orig.substring(startPos,matchPos) + dest;
		startPos = matchPos+1;
		matchPos = orig.indexOf(src,startPos);
	}
	if(! retLine.length) {return orig;}
	else {return retLine+orig.substring(startPos,orig.length);}
}
//--------------------------------------------------
function withinAcceptableRanges(chrNdx)
{	
	var acceptableRanges = new Array( "48-57","65-90","97-122","224-229","231-239","241-246","248-253","255-255");
	
	for( var ndx = 0; ndx < acceptableRanges.length; ndx++ ) {
		var start_finish = new Array();

		start_finish = acceptableRanges[ndx].split("-");
		
		if( (chrNdx >= start_finish[0]) && (chrNdx <= start_finish[1]) ) {
			return true;
		}
	}
	return false;
}
//--------------------------------------------------
function ASCII_to_char(num_in)
{
	var str_out = "";
	var num_out = parseInt(num_in);
	
	num_out = unescape('%' + num_out.toString(16));
	str_out += num_out;
	
	return unescape(str_out);
}
//--------------------------------------------------
var agt=navigator.userAgent.toLowerCase();
var use_ie_behavior = false;
var use_ie_6_behavior = false;
if (agt.indexOf("msie") != -1) {
  use_ie_behavior = true;
}
if ((agt.indexOf("msie 5") != -1) || (agt.indexOf("msie 6") != -1)) {
  use_ie_6_behavior = true;
}



