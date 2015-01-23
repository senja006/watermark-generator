var watermark = (function() {

	var $watermark = $('#watermark'), // watermark
		$bg = $('#bg__wrapper'), // original image
		$opacityVal = $('#opacity-val'), // поле значения прозрачности
		$opacity = $('#opacity'), // ползунок прозрачности		
		$xVal = $('#x-val'), // поле left
		$yVal = $('#y-val'); // поле top

		$btnLeftTop = $('#lt'), // кнопки фиксированых позиций
		$btnCentTop = $('#ct'),
		$btnRightTop = $('#rt'),
		$btnLeftMiddle = $('#lm'),
		$btnCentMiddle = $('#cm'),
		$btnRightMiddle = $('#rm'),
		$btnLeftBottom = $('#lb'),
		$btnCentBottom = $('#cb'),
		$btnRightBottom = $('#rb'),

		$xValPlus = $('#x-val-plus'),// кнопки изменения позиции
		$yValPlus = $('#y-val-plus'),
		$xValMinus = $('#x-val-minus'),
		$yValMinus = $('#y-val-minus'),
		correctionX = 0; // коорекция координат в зависимости от размера картинки
		correctionY = 0;

		$btnFour = $('#but-four'), // кнопки замостить-размостить 
		$btnOne = $('#but-one'),

		$hMarginVal = $('#h-margin-val'), // инпуты полей
		$vMarginVal = $('#v-margin-val'),
		$btnHMarginPlus = $('#h-margin-plus'), // кнопки полей
		$btnHMarginMinus = $('#h-margin-minus'),
		$btnVMarginPlus = $('#v-margin-plus'),
		$btnVMarginMinus = $('#v-margin-minus'),
		$hMarginLine = $('#h-margin-line'), // красные линии
		$vMarginLine = $('#v-margin-line');

	var watermarkWidth = 0,  // размеры
		watermarkHeight = 0,
		bgWidth = 0,
		bgHeight = 0,
		scaleImgX = 1, // масштаб
		scaleImgY = 1,

		fixedPositions = {}, 

		currPos = {    // текушее положение ватермарки top, left
			left: 0,
			top: 0
		},

		currOpacity = 0.5, // текущая прозрачность

		vMargin = 0, // поля между ватермарками
		hMargin = 0; // 

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
			slide: onOpacityChange // событине на ползунке
		});
	}

	// установка обработчиков
	function addEventListeners() {
		$('.one-watermark__col-link').on('click', onClickFixedButt);
		// $('#drag__img').on('load', calcBasicParam);

		// $('#bg__img').on('load', calcBasicParam);

		// кнопки смены режима
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

		// обработчики кнопок +/- координат
		$xValPlus.on('click', function(e){ 
			currPos.left = ++currPos.left;
			onChangeVal();
		});
		$xValMinus.on('click', function(e){
			currPos.left = --currPos.left;
			onChangeVal();
		});
		$yValPlus.on('click', function(e){
			currPos.top = ++currPos.top;
			onChangeVal()
		});
		$yValMinus.on('click', function(e){
			currPos.top = --currPos.top;
			onChangeVal();
		});

		// обработчики кнопок +/- полей
		$btnHMarginPlus.on('click', function(e){ 
			hMargin = hMargin + 1;
			onChangeHMargin();
		});
		$btnHMarginMinus.on('click', function(e){
			hMargin = hMargin - 1;
			onChangeHMargin();
		});
		$btnVMarginPlus.on('click', function(e){
			vMargin = vMargin + 1;
			onChangeVMargin();
		});
		$btnVMarginMinus.on('click', function(e){
			vMargin = vMargin - 1;
			onChangeVMargin();
		});
	}

	
	function calcBasicParam(){
		calcSizes();
		calcPositions();
	}

	// замостить
	function tile() {
		var rows = bgHeight / watermarkHeight + 1,
			cols = bgWidth / watermarkWidth + 1;

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
			img.addClass('drug__watermark');
			$watermark.append(img);
		}
		$watermark.draggable('disable');
	}

	// размостить
	function untile() {

	}

	function onChangeHMargin() {
		$hMarginVal.val(hMargin);
		$('.drug__watermark').css('marginBottom', hMargin);
		$hMarginLine.css('height', hMargin);
	}

	function onChangeVMargin() {
		$vMarginVal.val(vMargin);
		$('.drug__watermark').css('marginRight', vMargin);
		$vMarginLine.css('width', vMargin);
	}

	// обработчик смены прозрачности
	function onOpacityChange(e, ui) {
		currOpacity = ui.value;
		$watermark.css({
			'opacity': currOpacity / 100
		});
		$('#opacity').val(currOpacity / 100);
	}


	// обработчик изменения позиций drag'n'drop
	function onDragWatermark(e, ui) {
		currPos = {
			// left: ui.position.left / scaleImgX,
			// top: ui.position.top / scaleImgY
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

	// обработчики изменения позиции кнопками
	function onChangeVal() {
		refreshPosInput();
		setPos(currPos);
	}

	// просто обновляет инпуты позиции
	function refreshPosInput() {
		$xVal.val(parseInt(currPos.left / scaleImgX) - correctionX);
		$yVal.val(parseInt(currPos.top / scaleImgY) - correctionY);
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
			left: currPos.left * scaleImgX,
			top: currPos.top * scaleImgY
		});
		refreshPosInput();
	}

	function calcSizes() {
		$('#bg__img, #drag__img').on('load.img', function() {
			var resultBoxWidth = $('#result-box').width(), // ширина контейнера
				resultBoxHeight = $('#result-box').height(), // высота контейнера
				// proportions = resultBoxWidth / resultBoxHeight; // 

			bgWidth = $('#bg__img').width(); // ширина картинки
			bgHeight = $('#bg__img').height(); // высота картинки
			watermarkWidth = $('#drag__img').css('width', 'auto').width(); // ширина ватермарка
			watermarkHeight = $('#drag__img').css('height', 'auto').height(); // высота ватермарка
			correctionX = (resultBoxWidth - bgWidth) / 2;
			correctionY = (resultBoxHeight - bgHeight) / 2;

			// console.log(bgWidth);

			console.log('calc');
			$('#bg__img, #drag__img').off('load.img');
			$('#bg__img').css({
				'max-width': '10000px',
				'max-height': '10000px'
			});
			var correctionWatermarkWidth = bgWidth / $('#bg__img').width();
			var correctionWatermarkHeight = bgHeight / $('#bg__img').height();
			scaleImgX = correctionWatermarkWidth;
			scaleImgY = correctionWatermarkHeight;
			$('#drag__img').css({
				'width': watermarkWidth * correctionWatermarkWidth,
				'height': watermarkHeight * correctionWatermarkHeight
			});
			$('#bg__img').css({
				'max-width': '100%',
				'max-height': '100%'
			});
			if(correctionY === 0) {
				correctionX = correctionX / scaleImgX;
			}
			if(correctionX === 0) {
				correctionY = correctionY / scaleImgY;
			}
		});
			
		// if (bgWidth / bgHeight > proportions){
		// 	scaleImgX = resultBoxWidth / bgWidth;
		// 	$('#bg__iYmg').css('width', resultBoxWidth);
		// } else {
		// 	scaleimgX = resultBoxHeight / bgHeight;
		// 	$('#bg__iYmg').css('height', resultBoxHeight);
		// }
		// $('#drag__img').css('width', watermarkWidth * scaleImgX);
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
			left: position.left / scaleImgX,
			top: position.top / scaleImgY
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
		calcBasicParam: calcBasicParam,
		position: getPos,
		opacity: getOpacity,
		setPos: setPos,
		getPos: getPos
	};

}());