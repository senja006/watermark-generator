<?php

var_dump($_POST);
var_dump($_FILES);


// define(__FILE__, "/");

// $path = dirname(__FILE__);

// $imgBig = 'medium-square.png'; 
// $imgSmall = 'small-square.png';

// $img1 = imagecreatefromjpeg($path . DIRECTORY_SEPARATOR . $imgBig); 
// $img2 = imagecreatefromjpeg($path . DIRECTORY_SEPARATOR . $imgSmall);

// if($img1 and $img2) { 
// 	$x2 = imagesx($img2); 
// 	$y2 = imagesy($img2); 
// 	imagecopyresampled($img1, $img2, 20, 20, 0, 0, $x2, $y2, $x2, $y2); 
// 	header('Content-type: image/jpeg'); 
// 	imagejpeg($img1, null, 100); 
// } else { 
// 	header('HTTP/1.1 404 Not Found'); 
// } 
