document.write("<object classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000'"+
" codebase='http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=4,0,00,'"+
" width='"+popup_width+"' height='"+popup_height+"'>");
document.write("<param name='movie' value='"+popup_value+"'>");
document.write("<param name='wmode' value='transparent'>");
document.write("<param name='quality' value='best'>");
document.write("<param name='play' value='false'>");
document.write("<embed src='"+popup_value+"' quality='high' wmode='transparent' bgcolor='#ffffff'"+
" width='"+popup_width+"' height='"+popup_height+"' type='application/x-shockwave-flash' play='false'"+
"pluginspage='http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash'>");
document.write("</object>");
