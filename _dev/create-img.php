<?php

$img_path = "upload/files/";
$name_main_img = $_POST['name-version-main'];
$name_watermark = $_POST['name-version-watermark'];
$x = $_POST['x'];
$y = $_POST['y'];
$img_main = convertImgToPng($img_path.$name_main_img, "main-img.png");
$img_watermark = convertImgToPng($img_path.$name_watermark, "watermark.png");
$res_img = joinImg($img_main, $img_watermark, $x, $y, 75);

$data = array();

$data['main'] = $name_main_img;
$data['watermark'] = $img_watermark;
$data['type-main'] = exif_imagetype($img_main);
$data['src-res'] = $res_img;
$data['width_main'] = $img_main_width;
$data['heigth_main'] = $img_main_height;
$data['width_watermark'] = $img_watermark_width;
$data['heigth_watermark'] = $img_watermark_height;

function convertImgToPng($img, $name) {
	switch (exif_imagetype($img)) {
	    case IMAGETYPE_GIF :
	        $new_img = imagecreatefromgif($img);
	        break;
	    case IMAGETYPE_JPEG :
	        $new_img = imagecreatefromjpeg($img);
	        break;
	    case IMAGETYPE_PNG :
	        $new_img = imagecreatefrompng($img);
	        break;
	}
	$new_img_name = $name;
	imagepng($new_img, $new_img_name);
	imagedestroy($new_img);
	return $new_img_name;
};

function joinImg($img_main, $watermark, $x, $y, $opacity) {
	$img_main_size = getimagesize($img_main);
	$img_main_width = $img_main_size[0];
	$img_main_height = $img_main_size[1];
	$img_watermark_size = getimagesize($watermark);
	$img_watermark_width = $img_watermark_size[0];
	$img_watermark_height = $img_watermark_size[1];
	$new_img_name = "result.jpg";
	$img = imagecreatetruecolor($img_main_width, $img_main_height);
	$main_img = imagecreatefrompng($img_main);
	$watermark_img = imagecreatefrompng($watermark);
	imagecopy($img, $main_img, 0, 0, 0, 0, $img_main_width, $img_main_height);
	imagecopymerge($img, $watermark_img, $x, $y, 0, 0, $img_watermark_width, $img_watermark_height, $opacity);
	imagejpeg($img, $new_img_name, "100");
	imagedestroy($img);
	return $new_img_name;
};

echo json_encode($data);

?>