<?php
$q = $_REQUEST["q"];
$r = $_REQUEST["r"];
if(!ctype_alpha($q))
die("Use only alphabetic letters");
if(!ctype_digit($r))
die('Btti Bujha ke soja');
$xml=simplexml_load_file("score.xml");
foreach($xml->children() as $user)
{
    if($r > $user->SCORE)
    {
     $user->SCORE = $r;
     $user->NAME = $q;
     break;
    }
 }
file_put_contents('score.xml',$xml->saveXML());
$xml=simplexml_load_file("score.xml");
header("Content-type: text/xml");
echo $xml->saveXML();?> 
