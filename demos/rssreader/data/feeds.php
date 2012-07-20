<?php
// Copyright (c) 2006. Adobe Systems Incorporated.
// All rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//
//   * Redistributions of source code must retain the above copyright notice,
//     this list of conditions and the following disclaimer.
//   * Redistributions in binary form must reproduce the above copyright notice,
//     this list of conditions and the following disclaimer in the documentation
//     and/or other materials provided with the distribution.
//   * Neither the name of Adobe Systems Incorporated nor the names of its
//     contributors may be used to endorse or promote products derived from this
//     software without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
// AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
// IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
// ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
// LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
// CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
// SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
// INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
// CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
// ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
// POSSIBILITY OF SUCH DAMAGE.

// string we will display
$strOutData = "";

// function is hit for each opening tag encountered
function startTag($parser, $name, $attrs)
{
	global $strOutData;
	// look for the <feed> tag
	if(strcasecmp($name, "feed") == 0)
	{
		// compare the feed.id attribute
		if(isset($_GET['id']) && !empty($_GET['id']) && $_GET['id'] == $attrs['ID'])
		{
			// found the correct ID
			// get the data at the associated URL
			if (!($fpURL = fopen($attrs['URL'], "r")))
			{
				die("could not open URL");
			}
			// get the data from this URL
			while (!feof($fpURL)) {
				$strOutData .= fread($fpURL, 8192);
			}
			fclose($fpURL);
		}
	}
}

// function is hit for each closing tag encountered
function endTag($parser, $name)
{
}

// begin main execution

// get path to LiveFeeds.xml and open it
$arrPathInfo = pathinfo($_SERVER['SCRIPT_FILENAME']);
$strXMLFile = $arrPathInfo['dirname']."/LiveFeeds.xml";
if (!($fp = fopen($strXMLFile, "r"))) {
	die("could not open Adobe feeds");
}

// do they want a particular feed
if(isset($_GET['id']) && !empty($_GET['id']))
{
	// get a specific RSS feed
	$xml_parser = xml_parser_create();
	xml_set_element_handler($xml_parser, "startTag", "endTag");
	while (($data = fread($fp, 8192)) && empty($strOutData))
	{
		if (!xml_parse($xml_parser, $data, feof($fp)))
		{
			die(sprintf("XML error: %s at line %d, byte %d", xml_error_string(xml_get_error_code($xml_parser)), xml_get_current_line_number($xml_parser), xml_get_current_byte_index($xml_parser)));
		}
	}
	xml_parser_free($xml_parser);
}

// either feed wasn't found or they want the list of feeds
if(empty($strOutData))
{
	// get the original XML file
	fseek($fp, 0); // go back to the beginning in case we already read
	while ($data = fread($fp, 8192))
	{
		$strOutData .= $data;
	}
}

fclose($fp);
header('Content-type: text/xml');
echo $strOutData;
?>