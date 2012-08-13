<?php
// Copyright (c) 2007. Adobe Systems Incorporated.
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

	session_start();
	
	$NoRequestsBeforeSessionExpired = 5;
	if (empty($_SESSION["counter"])) {
		$_SESSION["counter"] = 1;
	}
	if ($_SESSION["counter"] >= $NoRequestsBeforeSessionExpired) 
	{
		echo ('session expired');
		exit;
	}
	$_SESSION["counter"]++;


	if(empty($_GET['state']))
	{
		die("State name is missing");	
	}

	// Do not allow anything else than letters
	$fileName = preg_replace('/[^a-z]/ims', '', $_GET['state']) . ".xml";
	
	$filePath = realpath(dirname(realpath(__FILE__)). '/../../data/states'). '/' . $fileName;

	if (!@($fp = fopen($filePath, 'r'))) 
	{
		die("could not open the requested cities file.");
	}
	
	if (!defined('DATE_RFC822'))
	{
		define ('DATE_RFC822', 'D, d M Y H:i:s T');
	}

	header('Content-Type: text/xml');
	header('Last-Modified: '.date(DATE_RFC822));
	header('Pragma: no-cache');
	header('Cache-Control: no-cache, must-revalidate');
	header('Expires: '. date(DATE_RFC822, mktime() - 3600));

	fpassthru($fp);
	fclose($fp);
?>
