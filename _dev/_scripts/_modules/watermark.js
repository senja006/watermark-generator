var watermark = (function() {

	var $watermark = $('#watermark'), // watermark
		$bg = $('#bg__wrapper'), // original image
		$opacityVal = $('#opacity-val'), // поле значения прозрачности
		$opacity = $('#opacity'), // ползунок прозрачности		
		$xVal = $('#x-val'), // поле left
		$yVal = $('#y-val'), // поле top

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
		$('#bg__img, #drag__img').on('load', function(){
			calcPositions();
		});
	}


	// обработчик смены прозрачности
	function onOpacityChange(e, ui) {
		currOpacity = ui.value;

		console.log(currOpacity);
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
		console.log(currPos);
		$('#x-val').val(currPos.left);
		$('#y-val').val(currPos.top);
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
			left: currPos.left,
			top: currPos.top
		});
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
		console.log(fixedPositions);
		console.log(bgHeight, watermarkHeight);
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
			left: position.left,
			top: position.top
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