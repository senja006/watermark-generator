<?php
/**
 *  Функция для транслитерации русского текста
 *
 * @param  string $string
 * @return string
 */
function rus2translit($string) {

    $converter = array(

        'а' => 'a',   'б' => 'b',   'в' => 'v',

        'г' => 'g',   'д' => 'd',   'е' => 'e',

        'ё' => 'e',   'ж' => 'zh',  'з' => 'z',

        'и' => 'i',   'й' => 'y',   'к' => 'k',

        'л' => 'l',   'м' => 'm',   'н' => 'n',

        'о' => 'o',   'п' => 'p',   'р' => 'r',

        'с' => 's',   'т' => 't',   'у' => 'u',

        'ф' => 'f',   'х' => 'h',   'ц' => 'c',

        'ч' => 'ch',  'ш' => 'sh',  'щ' => 'sch',

        'ь' => '\'',  'ы' => 'y',   'ъ' => '\'',

        'э' => 'e',   'ю' => 'yu',  'я' => 'ya',



        'А' => 'A',   'Б' => 'B',   'В' => 'V',

        'Г' => 'G',   'Д' => 'D',   'Е' => 'E',

        'Ё' => 'E',   'Ж' => 'Zh',  'З' => 'Z',

        'И' => 'I',   'Й' => 'Y',   'К' => 'K',

        'Л' => 'L',   'М' => 'M',   'Н' => 'N',

        'О' => 'O',   'П' => 'P',   'Р' => 'R',

        'С' => 'S',   'Т' => 'T',   'У' => 'U',

        'Ф' => 'F',   'Х' => 'H',   'Ц' => 'C',

        'Ч' => 'Ch',  'Ш' => 'Sh',  'Щ' => 'Sch',

        'Ь' => '\'',  'Ы' => 'Y',   'Ъ' => '\'',

        'Э' => 'E',   'Ю' => 'Yu',  'Я' => 'Ya',

    );

    return strtr($string, $converter);

}

/**
 *  Функция, которая нормализует имена файлов для URL
 *
 * @param $str
 * @return mixed|string
 */
function str2url($str) {

    // переводим в транслит

    $str = rus2translit($str);

    // в нижний регистр

    $str = strtolower($str);

    // заменям все ненужное нам на "-"

    $str = preg_replace('~[^-a-z0-9_]+~u', '-', $str);

    // удаляем начальные и конечные '-'

    $str = trim($str, "-");

    return $str;

}

// устанавливаем путь к папке для загрузки
$uploadDir = "img/upload/";
// устанавливаем валидные MYME-types
$types = array("image/gif", "image/png", "image/jpeg", "image/pjpeg", "image/x-png");
// Устанавливаем максимальный размер файла
$file_size = 2097152; // 2МБ
// Получаем данные из глобального массива
$file = $_FILES['files'];
// Массив с результатами отработки скрипта
$data = array();

// Если размер файла больше максимально допустимого
if($file['size'][0] > $file_size){
    $data['status'] = 'NO';
    $data['mes'] = "Файл слишком большой. Загружать можно только изображения (gif|png|jpg|jpeg) размером до 2МБ";
    $data['url'] = '';
}
// если MYME-type файла не соответствует допустимому
else if(!in_array($file['type'][0], $types)){
    $data['status'] = 'NO';
    $data['mes'] = "Загружать можно только изображения (gif|png|jpg|jpeg) размером до 2МБ";
    $data['url'] = '';
}
// Если ошибок нет
else if($file['error'][0] == 0){
    // получаем имя файла
    $filename = basename($file['name'][0]);
    // получаем расширение файла
    $extension = pathinfo($file['name'][0], PATHINFO_EXTENSION);
    // перемещаем файл из временной папки в  нужную
    if(move_uploaded_file($file['tmp_name'][0], $uploadDir.str2url($filename).'.'.$extension)){
        $data['status'] = 'OK';
        $data['mes'] = "Изображение успешно загружено";
        $data['url'] = $uploadDir.str2url($filename).'.'.$extension;
        $data['name'] = $filename;
    }
    // ошибка при перемещении файла
    else {
        $data['status'] = 'NO';
        $data['mes'] = "Возникла неизвестная ошибка при загрузке файла";
        $data['url'] = '';
    }
}
// Выводим результат в JSON и заверщаем в скрипт
echo json_encode($data);
exit;
