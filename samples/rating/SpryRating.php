<?php
// SpryRating.js - version 0.1 - Spry Pre-Release 1.7
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

//compute new rating using id and val
function compute_rating($id,$val){
	//example only: return the voted value minus one
	return $val-1;
}

//compute new rating using array of ratings
function compute_rating2($rating){
	//example only: return the maximum 
	return max($rating);
}

//error_log("POST:".print_r($_POST,true));
//error_log("GET:".print_r($_GET,true));

$found = false;

	//case1: (id,val) pair	
	$id = $_GET['id'];		//unique ID of the voted content
if(!$id) $id = $_POST['id'];
	
	$val = $_GET['val'];	//value of the vote
if(!$val) $val = $_POST['val'];	
	
	if($id && $val) 
		$found = true;
		
//case2: or more params starting with 'spryrating'
if($_SERVER['REQUEST_METHOD']=='GET'){
	//multiple pairs of values
	foreach($_GET as $key=>$value){
		if(strpos($key,'spry')!==false){
			$rating[$key] = $value;
			$found = true;
		}
	}
}
if($_SERVER['REQUEST_METHOD']=='POST'){
	//multiple pairs of values	
	foreach($_POST as $key=>$value){
		if(strpos($key,'spry')!==false){
			$rating[$key] = $value;
			$found = true;
		}
	}
}

if(!$found)
	die('Required params missing');

//compute new rating
if($id && $val){
	$comp_val = compute_rating($id,$val);
}
else
	$comp_val = compute_rating2($rating);

echo $comp_val;
?>