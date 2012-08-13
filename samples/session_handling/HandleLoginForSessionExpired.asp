<%
' Copyright (c) 2007. Adobe Systems Incorporated.
' All rights reserved.
'
' Redistribution and use in source and binary forms, with or without
' modification, are permitted provided that the following conditions are met:
'
'   * Redistributions of source code must retain the above copyright notice,
'     this list of conditions and the following disclaimer.
'   * Redistributions in binary form must reproduce the above copyright notice,
'     this list of conditions and the following disclaimer in the documentation
'     and/or other materials provided with the distribution.
'   * Neither the name of Adobe Systems Incorporated nor the names of its
'     contributors may be used to endorse or promote products derived from this
'     software without specific prior written permission.
'
' THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
' AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
' IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
' ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
' LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
' CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
' SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
' INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
' CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
' ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
' POSSIBILITY OF SUCH DAMAGE.

	If Request.Form("username") = "" OR Request.Form("pass") = "" Then
		Response.write "<strong>Error: invalid parameters</strong><br /><a href='SessionExpiredSample.asp.html'>Back</a>"
		Response.end()
	End If
	
	If Request.Form("username") = "admin" and Request.Form("pass") = "pass12" Then
		Session("counter") = 1
		Response.write "<h4>Login successful!</h4>"
		If Request.Form("ajax") = "" Then
			Response.write "<a href='SessionExpiredSample.asp.html'>Go to sample page</a>"
		End If
	Else
		Response.write "<strong>Error: login failed</strong><br /><a href='SessionExpiredSample.asp.html'>Go to Login page</a>"
	End If
%>
