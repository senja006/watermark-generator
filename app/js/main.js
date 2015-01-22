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
		$butReset = $('#but-reset'),
		$butFour = $('#but-four'),
		$butOne = $('#but-one');

	var bgImgWidth,
		bgImgHeight,
		wmImgWidth,
		wmImgHeight,
		bgImgScale = 1,

		vMargin = 0,
		hMargin = 0;

	// установка обработчиков
	function addEventListeners() {
		$imgSource.on('change', onChangeImageSource)
				  .on('focus', clearError);
		$imgWatermark.on('change', onChangeImageWatermark)
					 .on('focus', clearError);
		$('#but-bg-load').on('click', onButBgLoad);
		$('#but-wm-load').on('click', onButWmLoad);
		$butGetImage.on('click', onSubmitImage);
		$butReset.on('click', onResetForm);
		$butFour.on('click', function(e){
			e.preventDefault();
			$('.controls__switch-group-but').removeClass('active');
			$butFour.addClass('active');
			$('#one').hide();
			$('#four').show();
			tile();
		});
		$butOne.on('click', function(e){
			e.preventDefault();
			$('.controls__switch-group-but').removeClass('active');
			$butOne.addClass('active');
			$('#four').hide();
			$('#one').show();
			untile();
		});
	}
	
	function tile() {
		console.log('tiled');
	}

	function untile() {
		console.log('untiled');
	}

	function clearError() {
		$('.error').hide();
	}

	function onButBgLoad(e) {
		e.preventDefault();
		console.log('bg load')
	}

	function onButWmLoad(e) {
		e.preventDefault();
		console.log('wm load')
	}

	// обработчик смены исходного изображения
	function onChangeImageSource(e) {
		var file = this.files[0],
			fr = new FileReader();
			error = errorImg(file);

		if (error !== '') {
			onErrorMessage(error, $("#bg-img-control .error"));
			return;
		}

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
			fr = new FileReader(),
			error = errorImg(file);

		console.log(error);
		if (error !== '') {
			onErrorMessage(error, $("#wm-img-control .error"));
			return;
		}

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
	function errorImg(file) {
		var errorMessage = '';

		if (!file.type.match('image.*')) {
			errorMessage = 'Файл должен быть изображением!';
		}
		if (file.size > MAX_FILE_SIZE) {
			errorMessage = 'Размер файла не может быть больше ' + MAX_FILE_SIZE + ' байт (у этого - ' + file.size + ')';
		}

		return errorMessage;
	}

	function onErrorMessage (message, $element) {
		$element.text(message);
		$element.show();
	}

	function onSubmitImage(e) {
		e.preventDefault();
	}

	function onResetForm(e) {
		e.preventDefault();
		$('#bg__img').remove();
		$('#drag__img').remove();
		$imgSource.val('');
		$imgWatermark.val('');
		watermark.calcSizes();
		watermark.calcPositions();

	}


	return {
		init: function() {
			addEventListeners();
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
    images.init();          // управление картинками

});

 // * Created by FreeWay on 15.01.15.
 // */
$(document).ready(function(){
   
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
		$xVal = $('#x-val'), // поле left
		$yVal = $('#y-val'), // поле top
		scaleImg = 1;

		$btnLeftTop = $('#lt'), // кнопки фиксированых позиций
		$btnCentTop = $('#ct'),
		$btnRightTop = $('#rt'),
		$btnLeftMiddle = $('#lm'),
		$btnCentMiddle = $('#cm'),
		$btnRightMiddle = $('#rm'),
		$btnLeftBottom = $('#lb'),
		$btnCentBottom = $('#cb'),
		$btnRightBottom = $('#rb'),
		$btnFour = $('#but-four'),
		$btnOne = $('#but-one');

	var watermarkWidth = 0, 
		watermarkHeight = 0,
		bgWidth = 0,
		bgHeight = 0,
		fixedPositions = {},

		currPos = {
			left: 0,
			top: 0
		},

		currOpacity = 0.5,

		vMargin = 10,
		hMargin = 20;

	// инициализация плагинов
	function initPlugins() {
		$watermark.draggable({
			cursor: 'move',
			snap: '#bg__wrapper',
			drag: onDragWatermark // событие 'drag'
		});

		$(".slider__range").slider({
			animate: true,
			range: "min",
			value: 50,
			min: 5,
			max: 100,
			step: 1,
			slide: onOpacityChange
		});
	}

	// установка обработчиков
	function addEventListeners() {
		$('.one-watermark__col-link').on('click', onClickFixedButt);
		$('#drag__img').on('load', function(){
			console.log('wm load')
			calcSizes();
			calcPositions();
		});
		$btnFour.on('click', function(e){
			e.preventDefault();
			$('.controls__switch-group-but').removeClass('active');
			$btnFour.addClass('active');
			$('#one').hide();
			$('#four').show();
			tile();
		});
		$btnOne.on('click', function(e){
			e.preventDefault();
			$('.controls__switch-group-but').removeClass('active');
			$btnOne.addClass('active');
			$('#four').hide();
			$('#one').show();
			untile();
		});
	}

	// замостить
	function tile() {
		var rows = bgHeight / watermarkHeight,
			cols = bgWidth / watermarkWidth;

		$('#drag__img').css({
			'float': 'left',
			'margin': '0 ' + hMargin + 'px ' + vMargin + 'px ' + '0'
		});

		for(var i = 0; i < rows * cols; i++) {
			var img = $('<img/>');

			img.attr('src', $('#drag__img').attr('src'));
			img.css({
				'margin': '0 ' + hMargin + 'px ' + vMargin + 'px ' + '0',
				'width': $('#drag__img').width(),
				'height': $('#drag__img').height()
			});
			$watermark.append(img);
		}
		$watermark.draggable('disable');

	}

	// размоостить
	function untile() {

	}

	// обработчик смены прозрачности
	function onOpacityChange(e, ui) {
		currOpacity = ui.value;
		$watermark.css({
			'opacity': currOpacity / 100
		});
	}


	// обработчик изменения позиций drag'n'drop
	function onDragWatermark(e, ui) {
		currPos = {
			left: ui.position.left,
			top: ui.position.top
		};
		$('#x-val').val(currPos.left);
		$('#y-val').val(currPos.top);
		refreshPosInput();
	}

	// обработчик клика по кнопке с фиксированой позицией
	function onClickFixedButt(e) {
		var id = $(e.target).attr('id');

		e.preventDefault();
		moveFixed(id);
		$(this).addClass('one-watermark__col-link__active');
	}

	// обработчики изменения позиции кноаками
	function onChangeValX() {
		currPos.left = $xVal.val() * images.getScale();
		$xVal.value(currPos.left);
		setPos(currPos);
	}

	function onChangeValY() {
		currPos.top = $yVal.val() * images.getScale();
		$yVal.value(currPos.top);
		setPos(currPos);
	}

	function refreshPosInput() {
		$xVal.val(parseInt(currPos.left / scaleImg));
		$yVal.val(parseInt(currPos.top / scaleImg));
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
		}
		$('.one-watermark__col-link').removeClass('one-watermark__col-link__active');
		$watermark.css({
			left: currPos.left * scaleImg,
			top: currPos.top * scaleImg
		});
		refreshPosInput();
	}

	function calcSizes() {
		var resultBoxWidth = $('#result-box').width(),
			resultBoxHeight = $('#result-box').height(),
			proportions = resultBoxWidth / resultBoxHeight;

		watermarkWidth = $('#drag__img').width();
		watermarkHeight = $('#drag__img').height();
		bgWidth = $('#bg__img').width();
		bgHeight = $('#bg__img').height();

		if (bgWidth / bgHeight > proportions){
			scaleImg = resultBoxWidth / bgWidth;
			$('#bg__img').css('width', resultBoxWidth);
		} else {
			scaleimg = resultBoxHeight / bgHeight;
			$('#bg__img').css('height', resultBoxHeight);
		}
		$('#drag__img').css('width', watermarkWidth * scaleImg);
	}

	// вычисление фиксированых позиций
	function calcPositions() {
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

	// установка ватермарки в нужную позицию
	function setPos(position) {
		var position = position || {left: 0, top: 0};

		currPos = position;
		$('.one-watermark__col-link').removeClass('one-watermark__col-link__active');
		$watermark.css({
			left: position.left / scaleImg,
			top: position.top / scaleImg
		});
	}

	function setOpacity(opacity) {
		var opacity = opacity || 0.5;

		currOpacity = opacity;
	}

	return {
		init: function() {
			initPlugins();
			addEventListeners();
			console.log('<watermark> init!');
		},
		calcPositions: calcPositions,
		position: getPos,
		opacity: getOpacity,
		setPos: setPos,
		getPos: getPos
	};

}());