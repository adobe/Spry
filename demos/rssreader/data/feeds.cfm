<!---
Copyright (c) 2006. Adobe Systems Incorporated.
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice,
    this list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation
    and/or other materials provided with the distribution.
  * Neither the name of Adobe Systems Incorporated nor the names of its
    contributors may be used to endorse or promote products derived from this
    software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
POSSIBILITY OF SUCH DAMAGE.
--->
<cfsetting showdebugoutput="no">
<cfif IsDefined("url.id") AND url.id NEQ "">
  <cffile action="read" file="#GetDirectoryFromPath(GetTemplatePath())#LiveFeeds.xml" variable="myxml">
  <cfset myxml = Replace(myxml,"&","&amp;","all")>
  <cfset mydoc = XmlParse(myxml)>
  <cfset feeds = mydoc.feeds.xmlchildren >
  <cfif ISNumeric(url.id) AND url.id LTE ArrayLen(feeds)>
    <cfset myurl = feeds[url.id].xmlattributes["url"]>
    <cfset myurl = Replace(myurl,"&amp;","&","all")>
    <cfhttp url="#myurl#" method="get" charset="utf-8" ></cfhttp>
    <cfcontent type="text/xml" reset="yes"><cfoutput>#Trim(cfhttp.FileContent)#</cfoutput>
  </cfif>
<cfelse>
  <cffile action="read" file="#GetDirectoryFromPath(GetTemplatePath())#LiveFeeds.xml" variable="myxml">
  <cfcontent type="text/xml" reset="yes"><cfoutput>#Replace(myxml,"&","&amp;","all")#</cfoutput>
</cfif>