<!---
 Copyright (c) 2007. Adobe Systems Incorporated.
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
---><cfsetting enablecfoutputonly="yes">
<cfif NOT StructKeyExists(FORM,"username") OR NOT StructKeyExists(FORM,"pass")>
	<cfoutput><strong>Error: invalid parameters</strong><br /><a href='SessionExpiredSample.cfm.html'>Back</a></cfoutput>
    <cfexit>
</cfif>
<cfparam name="FORM.username" type="string" default="">
<cfparam name="FORM.username" type="string" default="">
	
<cfif FORM.username EQ "admin" AND FORM.pass EQ "pass12">
	<cfset SESSION.counter = 1>
    <cfoutput><h4>Login successful!</h4></cfoutput>
   	<cfif StructKeyExists(FORM,"ajax") EQ false>
	    <cfoutput><a href='SessionExpiredSample.cfm.html'>Go to sample page</a></cfoutput>
    </cfif>
<cfelse>
   	<cfoutput><strong>Error: login failed</strong><br /><a href='SessionExpiredSample.cfm.html'>Go to Login page</a></cfoutput>
</cfif>
