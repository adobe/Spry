<pre><%
    Response.Expires = -1
	Sub dump_object_irequestdictionary(ByRef var)
		If var.Count<>0 Then
    		Dim i
			For each i in var
                quote = """"
                If var(i).Count = 1 Then
                    Response.write i & " = " & quote & var(i) & quote & vbNewLine
                Else
                    Response.write i & " = " & vbNewLine
                    For j = 1 to var(i).Count
                        Response.write vbTab & "(" & j & ") = " & quote & var(i)(j) & quote & vbNewLine
                    Next
                End If
                Response.write vbNewLine
			Next
		End If
	End Sub
    Response.write "<strong>Response from AjaxSubmitChecker.asp</strong>" & vbNewLine
	Response.Write "<strong>POST:</strong>" & vbNewLine
	dump_object_irequestdictionary Request.Form
	Response.Write "<strong>GET:</strong>" & vbNewLine
    dump_object_irequestdictionary Request.QueryString
%></pre>