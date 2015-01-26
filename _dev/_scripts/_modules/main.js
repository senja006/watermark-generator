'use strict';

$(document).ready(function() {

    watermark.init();       // управление водяным знаком
    images.init();			// управление картинками
    lang.init();            // Смена языка
    // socialShare.init();     // Кнопки соц сетей

});

 // * Created by FreeWay on 15.01.15.
 // */
//FILEUPLOAD
//$(function(){
//
//    var ul = $('#upload ul');
//
//    $('#drop a').click(function(){
//        // имитация нажатия на поле выбора файла
//        $(this).parent().find('input').click();
//    });
//
//    // инициализация плагина jQuery File Upload
//    $('#upload').fileupload({
//
//        // этот элемент будет принимать перетаскиваемые на него файлы
//        dropZone: $('#drop'),
//
//        // Функция будет вызвана при помещении файла в очередь
//        add: function (e, data) {
//
//            var tpl = $('<li><input type="text" value="0" data-width="48" data-height="48"'+
//            ' data-fgColor="#0788a5" data-readOnly="1" data-bgColor="#3e4043" /><p></p><span></span></li>');
//
//            // вывод имени и размера файла
//            tpl.find('p').text(data.files[0].name)
//                .append('<i>' + formatFileSize(data.files[0].size) + '</i>');
//
//            data.context = tpl.appendTo(ul);
//
//            // инициализация плагина jQuery Knob
//            tpl.find('input').knob();
//
//            // отслеживание нажатия на иконку отмены
//            tpl.find('span').click(function(){
//
//                if(tpl.hasClass('working')){
//                    jqXHR.abort();
//                }
//
//                tpl.fadeOut(function(){
//                    tpl.remove();
//                });
//
//            });
//
//            // Автоматически загружаем файл при добавлении в очередь
//            var jqXHR = data.submit();
//        },
//
//        progress: function(e, data){
//
//            // Вычисление процента загрузки
//            var progress = parseInt(data.loaded / data.total * 100, 10);
//
//            // обновляем шкалу
//            data.context.find('input').val(progress).change();
//
//            if(progress == 100){
//                data.context.removeClass('working');
//            }
//        },
//
//        fail:function(e, data){
//            // что-то пошло не так
//            data.context.addClass('error');
//        }
//
//    });
//
//    $(document).on('drop dragover', function (e) {
//        e.preventDefault();
//    });
//
//    // вспомогательная функция, которая форматирует размер файла
//    function formatFileSize(bytes) {
//        if (typeof bytes !== 'number') {
//            return '';
//        }
//
//        if (bytes >= 1000000000) {
//            return (bytes / 1000000000).toFixed(2) + ' GB';
//        }
//
//        if (bytes >= 1000000) {
//            return (bytes / 1000000).toFixed(2) + ' MB';
//        }
//
//        return (bytes / 1000).toFixed(2) + ' KB';
//    }
//
//});