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

	Dim NoRequestsBeforeSessionExpired : NoRequestsBeforeSessionExpired = 5

	If Session("counter") = "" Then
		Session("counter") = 1
	End If

	If Session("counter") >= NoRequestsBeforeSessionExpired Then
		Response.Write "session expired"
		Response.End
	End If

	Session("counter") = Session("counter") + 1
	
	If Request.QueryString("state") = "" Then
		Response.Write "State name is missing"
		Response.End
	End If

	' Do not allow anything else than letters
	Dim fileName : fileName = Request.QueryString("state")
	Set rg = New RegExp
	With rg
	.Pattern = "[^a-z]"
	.IgnoreCase = true
	.Global = true
	End With

	fileName = rg.Replace(fileName, "")
	
	fileName = Server.MapPath(".") & "\..\..\data\states\" & fileName & ".xml"
	
	Set FSO = Server.CreateObject("Scripting.FileSystemObject")
	If Not FSO.FileExists(fileName) Then
		Response.Write "could not open the requested cities file."
		Response.End
	End If

	Dim fp	
	Set fp = FSO.GetFile(fileName)

	Dim TextStream
	Set TextStream = fp.OpenAsTextStream(1, -2)

	' Headers part
	Response.ContentType  = "text/xml"
	Response.AddHeader "Pragma", "no-cache"
	Response.AddHEader "Cache-Control", "no-cache, must-revalidate"

	Do While Not TextStream.AtEndOfStream
		Response.Write TextStream.readline & vbCRLF	
	Loop

	Set FSO = nothing
%>
