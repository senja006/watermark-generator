<?php

$img_path = "upload/files/";
$name_main_img = $_POST['name-version-main'];
$name_watermark = $_POST['name-version-watermark'];
$x = $_POST['x'];
$y = $_POST['y'];
$opacity = $_POST['opacity'] * 100;
$mode = $_POST['mode']; // tile, untile
$x_margin = $_POST['x-margin'];
$y_margin = $_POST['y-margin'];
$img_main = convertImgToPng($img_path.$name_main_img, "main-img.png");
$img_watermark = convertImgToPng($img_path.$name_watermark, "watermark.png");
$res_img = joinImg($img_main, $img_watermark, $x, $y, $opacity, $mode, $x_margin, $y_margin);

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
	// imagealphablending($new_img, false);
	// imagesavealpha($new_img, true);
	imagepng($new_img, $new_img_name);
	imagedestroy($new_img);
	return $new_img_name;
};

function joinImg($img_main, $watermark, $x, $y, $opacity, $mode, $x_margin, $y_margin) {
	$img_main_size = getimagesize($img_main);
	$img_main_width = $img_main_size[0];
	$img_main_height = $img_main_size[1];
	$img_watermark_size = getimagesize($watermark);
	$img_watermark_width = $img_watermark_size[0];
	$img_watermark_height = $img_watermark_size[1];
	$new_img_name = "result.jpg";
	$row_height = $img_watermark_height + $x_margin;
	$col_width = $img_watermark_width + $y_margin;
	$row_num = ceil($img_main_height / $row_height);
	$col_num = ceil($img_main_width / $col_width);
	$img = imagecreatetruecolor($img_main_width, $img_main_height);
	$main_img = imagecreatefrompng($img_main);
	$watermark_img = imagecreatefrompng($watermark);
	// imagealphablending($img, false);
	// imagesavealpha($img, true);
	// imagealphablending($watermark_img, false);
	// imagesavealpha($watermark_img, true);
	imagecopy($img, $main_img, 0, 0, 0, 0, $img_main_width, $img_main_height);
	if($mode === 'tile') {
		for($r = 0; $r <= $row_num; $r++) {
			$y_tile = $row_height * $r;
			for($c = 0; $c <= $col_num; $c++) {
				$x_tile = $col_width * $c;
				imagecopymerge($img, $watermark_img, $x_tile, $y_tile, 0, 0, $img_watermark_width, $img_watermark_height, $opacity);
			}
		}
	}else{
		imagecopymerge($img, $watermark_img, $x, $y, 0, 0, $img_watermark_width, $img_watermark_height, $opacity);
	}
	imagejpeg($img, $new_img_name, "100");
	imagedestroy($img);
	return $new_img_name;
};

echo json_encode($data);

?>