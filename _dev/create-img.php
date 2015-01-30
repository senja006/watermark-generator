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
$name_result_img = "result.png";

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

//создание дубликатов для передачи в обработку функции
$main_img = imagecreatefrompng($img_main);
$watermark_img = imagecreatefrompng($img_watermark);

/**
 * PNG ALPHA CHANNEL SUPPORT for imagecopymerge();
 * This is a function like imagecopymerge but it handle alpha channel well!!!
 **/

// A fix to get a function like imagecopymerge WITH ALPHA SUPPORT
// Main script by aiden dot mail at freemail dot hu
// Transformed to imagecopymerge_alpha() by Alexey Chyrva for LOFTSCHOOL

function imagecopymerge_alpha($dst_im, $src_im, $dst_x, $dst_y, $pct, $x_margin, $y_margin, $mode, $name_result_img) {
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
    $dst_im_width = imagesx($dst_im);
    $dst_im_height = imagesy($dst_im);
    $row_height = $h + $y_margin;
    $col_width = $w + $x_margin;
    $row_num = ceil($dst_im_height / $row_height);
    $col_num = ceil($dst_im_width / $col_width);

    if($mode === 'tile') {
        for($r = 0; $r <= $row_num; $r++) {
            $y_tile = $row_height * $r;
            for($c = 0; $c <= $col_num; $c++) {
                $x_tile = $col_width * $c;
                imagecopy($dst_im, $src_im, $x_tile, $y_tile, 0, 0, $w, $h);
            }
        }
    }else{
        imagecopy($dst_im, $src_im, $dst_x, $dst_y, 0, 0, $w, $h);
    }
    imagepng($dst_im, $name_result_img);
}

// SAME COMMANDS:
imagecopymerge_alpha($main_img, $watermark_img, $x, $y, $opacity, $x_margin, $y_margin, $mode, $name_result_img);

$data = array();
$data['src-res'] = $name_result_img;

echo json_encode($data);

?>