var images = (function() {

	var MAX_FILE_SIZE = 10485760; // 10 Mb

	var $imgSource = $('#img-source'),
		$imgWatermark = $('#img-watermark'),
		$formImg = $('#form-control'),
		$result = $('#result'),
		$bgImgWrapper = $('#bg__wrapper'),
		$watermark = $('#watermark'),
		$bgImg = $('#bg__img'),
		$wmImg = $('#drag__img'),
		$butGetImage = $('#but-send'),
		$butReset = $('#but-reset');

	var bgImgWidth,
		bgImgHeight,
		wmImgWidth,
		wmImgHeight,
		bgImgScale = 1;

	// установка обработчиков
	function addEventListeners() {
		$imgSource.on('change', onChangeImageSource);
		$imgWatermark.on('change', onChangeImageWatermark);
		$('.modal').on('click', function() {
			$(this).fadeOut('fast');
		});
		$butGetImage.on('click', onSubmitImage);
		$butReset.on('click', onResetForm);
	}

	// обработчик смены исходного изображения
	function onChangeImageSource(e) {
		var file = this.files[0],
			fr = new FileReader();

		if (!file || !validationImg(file)) return;

		fr.onload = function(event) {
			var $image = $(new Image());

			$('#bg__img').remove();
			$image.attr({
				src: event.target.result,
				id: 'bg__img'
			});

			bgImgWidth = $image[0].width;
			bgImgHeight = $image[0].height;
			bgImgScale = $bgImgWrapper.width() / bgImgWidth;
			if ($('#drag__img').length) {
				rescaleWmImg($('#drag__img'));
			}
			insertBgImg($image);
		}

		fr.onerror = function(event) {
			console.error("Error: " + event.target.error.code);
		};

		fr.readAsDataURL(file);

		verifyDisable();
	}

	// функция вставки исходного изображения
	function insertBgImg($image) {
		$image.css({
			width: '100%'
		}).appendTo($bgImgWrapper);
		$result.css({
			minHeight: 0,
			height: $bgImgWrapper.height() - 4
		});
		watermark.calcPositions();
		watermark.setPos({
			left: 0,
			top: 0
		});
	}

	// обработчик смены изображения ватермарки
	function onChangeImageWatermark(e) {
		var file = this.files[0],
			fr = new FileReader();

		if (!validationImg(file)) return;

		fr.onload = function(event) {
			var $image = $(new Image());

			$('#drag__img').remove();
			$image.attr({
				src: event.target.result,
				id: 'drag__img'
			});
			wmImgWidth = $image[0].width;
			wmImgHeight = $image[0].height;
			insertWmImg($image);
		}

		fr.onerror = function(event) {
			console.error("Error: " + event.target.error.code);
		};

		fr.readAsDataURL(file);
		verifyDisable();
	}

	// массштабирование ватермарки относительно исходного изображения
	function rescaleWmImg($image) {
		var scaleWidth = 0;

		scaleWidth = $image[0].width * bgImgScale;

		$image.css({
			width: scaleWidth
		});

		return $image;
	}

	// функция вставки изображения ватермарки
	function insertWmImg($image) {
		rescaleWmImg($image).appendTo($watermark);
		watermark.calcPositions();
		watermark.setPos({
			left: 0,
			top: 0
		});
	}

	// валидация изображения
	function validationImg(file) {
		var errorMessage;

		if (!file.type.match('image.*')) {
			errorMessage = 'Файл должен быть изображением!';
		}
		if (file.size > MAX_FILE_SIZE) {
			errorMessage = 'Размер файла не может быть больше ' + MAX_FILE_SIZE + ' байт (у этого - ' + file.size + ')';
		}
		if (errorMessage) {
			onErrorMessage(errorMessage);
			return false;
		}
		return true;
	}

	function onErrorMessage (message) {
		$('.modal-error').text(message);
		$('.modal').fadeIn('fast');
	}

	function onSubmitImage(e) {
		e.preventDefault();
		onErrorMessage('Форма передана');
	}

	function onResetForm(e) {
		e.preventDefault();
		$('#bg__img').remove();
		$('#drag__img').remove();
		$imgSource.val('');
		$imgWatermark.val('');

		verifyDisable();
		onErrorMessage('Форма очищена');
	}

	function verifyDisable() {
		var $options = $('.options'),
			$source = $('.source');

		if (typeof $('#img-watermark')[0].files[0] === 'object' && typeof $('#img-source')[0].files[0]) {
			$options.show();
			$source.hide();
			return false;
		}
		else {
			$options.hide();
			$source.show();
			return true;
		}
	}


	return {
		init: function() {
			addEventListeners();
			verifyDisable();
			console.log('<images> init!'); // дебаг
		},
		getScale: function() {
			return bgImgScale;
		}
	};

}());
'use strict';

$(document).ready(function() {

    watermark.init();       // управление водяным знаком
    // images.init();          // управление картинками

});

 // * Created by FreeWay on 15.01.15.
 // */
$(document).ready(function(){
    $( ".slider__range" ).slider({
        animate: true,
        range: "min",
        value: 50,
        min: 5,
        max: 100,
        step: 1,

        //Получаем значение и выводим его на странице
        //slide: function( event, ui ) {
        //    $( "#slider-result" ).html( ui.value );
        //},

        //Обновляем скрытое поле формы, так что можно передать данные с помощью формы
        change: function(event, ui) {
            $('#opacity').attr('value', ui.value);
        }

    });
    //tabs


});
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
var watermark = (function() {

	var $watermark = $('#watermark'), // watermark
		$bg = $('#bg__wrapper'), // original image
		$opacityVal = $('#opacity-val'), // поле значения прозрачности
		$opacity = $('#opacity'), // ползунок прозрачности		
		$xVal = $('#xVal'), // поле left spinner
		$yVal = $('#yVal'), // поле top spinner

		$btnLeftTop = $('#lt'), // кнопки фиксированых позиций
		$btnCentTop = $('#ct'),
		$btnRightTop = $('#rt'),
		$btnLeftMiddle = $('#lm'),
		$btnCentMiddle = $('#cm'),
		$btnRightMiddle = $('#rm'),
		$btnLeftBottom = $('#lb'),
		$btnCentBottom = $('#cb'),
		$btnRightBottom = $('#rb');

	var watermarkWidth = 0, 
		watermarkHeight = 0,
		fixedPositions = {},

		currPos = {
			left: 0,
			top: 0
		},

		currOpacity = 0.5;

	// инициализация плагинов
	function initPlugins() {
		$watermark.draggable({
			cursor: 'move',
			snap: '#bg__wrapper',
			drag: onDragWatermark // событие 'drag'
		});
		$xVal.spinner();
		$yVal.spinner();
	}

	// установка обработчиков
	function addEventListeners() {
		$opacity.on('change', onOpacityChange);
		$('.position__b-link').on('click', onClickFixedButt);
		$xVal.on('spinchange', onSpinX);
		$yVal.on('spinchange', onSpinY);
		$xVal.on('spin', onSpinX);
		$yVal.on('spin', onSpinY);
	}

	// установка начальной прозрачности
	function setStartOpacity() {
		refreshOpacityVal(currOpacity);
	}

	// установка начальной позиции
	function setStartPos() {
		onPosChange();
	}

	// обработчик смены прозрачности
	function onOpacityChange(e) {
		currOpacity = $(e.target).val() / 100;

		$watermark.css({
			'opacity': currOpacity
		});
		refreshOpacityVal(currOpacity);
	}

	// обработчик изменения позиции
	function onPosChange() {
		setPos(currPos);
	}

	// обработчик изменения позиций drag'n'drop
	function onDragWatermark(e, ui) {
		currPos = {
			left: ui.position.left,
			top: ui.position.top
		};
		onPosChange();
	}

	// обработчик клика по кнопке с фиксированой позицией
	function onClickFixedButt(e) {
		var id = $(e.target).attr('id');

		e.preventDefault();
		moveFixed(id);
		$(this).addClass('position__b-link__active');
	}

	// обработчики клика по спину
	function onSpinX() {
		currPos.left = $xVal.spinner('value') * images.getScale();
		onPosChange();
	}

	function onSpinY() {
		currPos.top = $yVal.spinner('value') * images.getScale();
		onPosChange();
	}

	// установка ватермарки в нужную позицию
	function setPos(position) {
		$('.position__b-link').removeClass('position__b-link__active');
		$watermark.css({
			left: position.left,
			top: position.top
		});
		refreshPosVal(currPos);
	}

	// рендер позиций
	function refreshPosVal() {
		$xVal.spinner('value', parseInt(currPos.left / images.getScale()));
		$yVal.spinner('value', parseInt(currPos.top / images.getScale()));
	}

	// рендер прозрачности
	function refreshOpacityVal(opacity) {
		$opacityVal.text(opacity);
	}

	// перемещение ватермарки по фиксированым позициям
	function moveFixed(pos) {
		switch (pos) {
			case 'lt':
				currPos = fixedPositions.lt;
				break
			case 'ct':
				currPos = fixedPositions.ct;
				break
			case 'rt':
				currPos = fixedPositions.rt;
				break
			case 'lm':
				currPos = fixedPositions.lm;
				break
			case 'cm':
				currPos = fixedPositions.cm;
				break
			case 'rm':
				currPos = fixedPositions.rm;
				break
			case 'lb':
				currPos = fixedPositions.lb;
				break
			case 'cb':
				currPos = fixedPositions.cb;
				break
			case 'rb':
				currPos = fixedPositions.rb;
				break
			default:
				break
		};

		onPosChange();
	}

	// вычисление фиксированых позиций
	function calcPositions() {
		var watermarkWidth = $('#watermark').width(),
			watermarkHeight = $('#watermark').height(),
			bgWidth = $('#bg__wrapper').width(),
			bgHeight = $('#bg__wrapper').height();

		fixedPositions = {
			lt: {
				left: 0,
				top: 0
			},
			ct: {
				left: parseInt((bgWidth - watermarkWidth) / 2),
				top: 0
			},
			rt: {
				left: bgWidth - watermarkWidth,
				top: 0
			},
			lm: {
				left: 0,
				top: parseInt((bgHeight - watermarkHeight)) / 2,
			},
			cm: {
				left: parseInt((bgWidth - watermarkWidth) / 2),
				top: parseInt((bgHeight - watermarkHeight) / 2)
			},
			rm: {
				left: bgWidth - watermarkWidth,
				top: parseInt((bgHeight - watermarkHeight) / 2)
			},
			lb: {
				left: 0,
				top: bgHeight - watermarkHeight,
			},
			cb: {
				left: parseInt((bgWidth - watermarkWidth) / 2),
				top: bgHeight - watermarkHeight
			},
			rb: {
				left: bgWidth - watermarkWidth,
				top: bgHeight - watermarkHeight
			}
		}
	}

	// геттеры
	function getPos() {
		return currPos;
	}

	function getOpacity() {
		return currOpacity;
	}

	return {
		init: function() {
			calcPositions();
			initPlugins();
			setStartOpacity();
			setStartPos();
			addEventListeners();
			console.log('<watermark> init!');
		},
		calcPositions: calcPositions,
		position: getPos,
		opacity: getOpacity,
		setPos: setPos
	};

}());