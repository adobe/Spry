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
header('Content-Type: text/xml');
header('Last-Modified: '.date(DATE_RFC822));
header('Pragma: no-cache');
header('Cache-Control: no-cache, must-revalidate');
header('Expires: '. date(DATE_RFC822, mktime() - 3600));

$file = '../../data/adobe_products.xml';

if (empty($_GET['prd'])){
	header('Content-Length: ' . filesize($file));
	@ob_end_flush();
	readfile($file);
	return;
}
$content = '<?xml version="1.0" encoding="iso-8859-1"?>
<products>';

$prd = $_GET['prd'];
$prd = htmlentities($prd);

$f = fopen($file, 'r');

if ($f){
	$f_content = fread($f, filesize($file));
	fclose($f);
	if (preg_match_all('/(<product>\s*<name>[^<]*?'.strtolower(preg_quote(($prd), '/')).'[^<]*?<\/name>.*?<\/product>)/ims', $f_content, $m) !== false ){
		foreach($m[1] as $k=>$v){
			$content .= $v;
		}
	}
}
$content .= '</products>';
header('Content-Length: ' . strlen($content));
echo $content;
?>
