<?php
//Входные параметры
$img_path = "upload/files/";
$name_main_img = $_POST['name-version-main'];
$name_watermark = $_POST['name-version-watermark'];
$x = $_POST['x'];
$y = $_POST['y'];
$opacity = $_POST['opacity'] * 100;
$mode = $_POST['mode']; // tile, untile
$x_margin = $_POST['x-margin'];
$y_margin = $_POST['y-margin'];
$img_main = ImgToPng($img_path.$name_main_img, "main-img.png");
$img_watermark = ImgToPng($img_path.$name_watermark, "watermark.png");
//$res_img = joinImg($img_main, $img_watermark, $x, $y, $opacity, $mode, $x_margin, $y_margin);






//$name_main_img = $img_path."watermark3.jpg";
//$name_watermark = $img_path."small-square.png";
//$x = 550;
//$y = 550;
//$opacity = 0.8 * 100;
//$x_margin = 40;
//$y_margin = 40;
//$mode = 'tile';
    // Переводим в PNG для обработки
//    $img_main = ImgToPng($name_main_img, "bg.png");
//    $img_watermark = ImgToPng($name_watermark, "watermark.png");

//    $data = array();
//
//    $data['main'] = $name_main_img;
//    $data['watermark'] = $img_watermark;
//    $data['type-main'] = exif_imagetype($img_main);
//    $data['src-res'] = $res_img;
//    $data['width_main'] = $img_main_width;
//    $data['heigth_main'] = $img_main_height;
//    $data['width_watermark'] = $img_watermark_width;
//    $data['heigth_watermark'] = $img_watermark_height;

    // Конвертация изображений в png
    function ImgToPng($img, $destName) {
        switch (exif_imagetype($img)) {
            case IMAGETYPE_GIF :
                $img = imagecreatefromgif($img);
                imagesavealpha($img, true);
                break;
            case IMAGETYPE_JPEG :
                $img = imagecreatefromjpeg($img);
                imagesavealpha($img, true);
                break;
            case IMAGETYPE_PNG :
                $img = imagecreatefrompng($img);
                imagesavealpha($img, true);
                break;
        }
        imagepng($img, $destName);
        imagedestroy($img);
        return $destName;
    };

    $MainWidth = imagesx($img_main); //получаем ширину фона
    $MainHeight = imagesy($img_main); //получаем высоту фона
    $WatermarkWidth = imagesx($img_watermark); //получаем ширину watermark
    $WatermarkHeight = imagesy($img_watermark); //получаем высоту watermark
    $row_height = $WatermarkHeight + $y_margin;
    $col_width = $WatermarkWidth + $x_margin;
    $row_num = ceil($MainHeight / $row_height);
    $col_num = ceil($MainWidth / $col_width);

    //создание дубликатов для передачи в обработку функции
	$main_img = imagecreatefrompng($img_main);
	$watermark_img = imagecreatefrompng($img_watermark);




	// imagejpeg($img, $ResultImage, "100");
	// imagedestroy($img);
/**
 * PNG ALPHA CHANNEL SUPPORT for imagecopymerge();
 * This is a function like imagecopymerge but it handle alpha channel well!!!
 **/

// A fix to get a function like imagecopymerge WITH ALPHA SUPPORT
// Main script by aiden dot mail at freemail dot hu
// Transformed to imagecopymerge_alpha() by Alexey Chyrva for LOFTSCHOOL
function imagecopymerge_alpha($dst_im, $src_im, $dst_x, $dst_y, $src_x, $src_y, $src_w, $src_h, $pct, $row_h, $row_w, $mode){
    if(!isset($pct)){
        return false;
    }
    $pct /= 100;
    // Get image width and height
    $w = imagesx( $src_im );
    $h = imagesy( $src_im );
    // Turn alpha blending off
    imagealphablending( $src_im, false );
    // Find the most opaque pixel in the image (the one with the smallest alpha value)
    $minalpha = 127;
    for( $x = 0; $x < $w; $x++ )
        for( $y = 0; $y < $h; $y++ ){
            $alpha = ( imagecolorat( $src_im, $x, $y ) >> 24 ) & 0xFF;
            if( $alpha < $minalpha ){
                $minalpha = $alpha;
            }
        }
    //loop through image pixels and modify alpha for each
    for( $x = 0; $x < $w; $x++ ){
        for( $y = 0; $y < $h; $y++ ){
            //get current alpha value (represents the TANSPARENCY!)
            $colorxy = imagecolorat( $src_im, $x, $y );
            $alpha = ( $colorxy >> 24 ) & 0xFF;
            //calculate new alpha
            if( $minalpha !== 127 ){
                $alpha = 127 + 127 * $pct * ( $alpha - 127 ) / ( 127 - $minalpha );
            } else {
                $alpha += 127 * $pct;
            }
            //get the color index with new alpha
            $alphacolorxy = imagecolorallocatealpha( $src_im, ( $colorxy >> 16 ) & 0xFF, ( $colorxy >> 8 ) & 0xFF, $colorxy & 0xFF, $alpha );
            //set pixel with the new color + opacity
            if( !imagesetpixel( $src_im, $x, $y, $alphacolorxy ) ){
                return false;
            }
        }
    }
    // The image copy
    $row_height = $src_h + $row_h;
    $col_width = $src_w + $row_w;
    $row_num = ceil($dst_y / $row_height);
    $col_num = ceil($dst_x / $col_width);

    if($mode === 'tile') {
        for($r = 0; $r <= $row_num; $r++) {
            $y_tile = $row_height * $r;
            for($c = 0; $c <= $col_num; $c++) {
                $x_tile = $col_width * $c;
                imagecopy($dst_im, $src_im, $x_tile, $y_tile, $src_x, $src_y, $src_w, $src_h);
            }
        }
    }else{
        imagecopy($dst_im, $src_im, $dst_x, $dst_y, $src_x, $src_y, $src_w, $src_h);
    }
}

// SAME COMMANDS:
imagecopymerge_alpha($main_img, $watermark_img, $x, $y, 0, 0, imagesx($watermark_img), imagesy($watermark_img),$opacity, $y_margin, $x_margin, $mode);

// показ результата:
header("Content-Type: image/png");
imagesavealpha($main_img, true);
imagepng($main_img, NULL);

// Вывод изображения и очистка памяти
//header('Content-Type: image/png');
//
//imagepng($png);
//imagedestroy($png);
// echo json_encode($data);


//	imagejpeg($img, $new_img_name, "100");
//	imagedestroy($img);
//	return $new_img_name;


echo json_encode($data);

?>