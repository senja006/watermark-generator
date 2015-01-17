var watermark = (function() {

	var	$watermark = $('#watermark'),			// watermark
		$bg = $('#bg__wrapper'),							// original image
		$opacityVal = $('#opacity-val'),		// поле значения прозрачности
		$opacity = $('#opacity'),				// ползунок прозрачности		
		$xVal = $('#xVal'),						// поле left spinner
		$yVal = $('#yVal'),						// поле top spinner

		$btnLeftTop = $('#lt'),					// кнопки фиксированых позиций
		$btnCentTop = $('#ct'),
		$btnRightTop = $('#rt'),
		$btnLeftMiddle = $('#lm'),
		$btnCentMiddle = $('#cm'),
		$btnRightMiddle = $('#rm'),
		$btnLeftBottom = $('#lb'),
		$btnCentBottom = $('#cb'),
		$btnRightBottom = $('#rb');

	var watermarkWidth = 0,  	// пригодится
		watermarkHeight = 0,	//
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
	function onOpacityChange(e){
		currOpacity = $(e.target).val() / 100;

		$watermark.css({
			'opacity': currOpacity
		});
		refreshOpacityVal(currOpacity);
	}

	// обработчик изменения позиции
	function onPosChange(){
		$('.position__b-link').removeClass('position__b-link__active');
		setPos(currPos);
	}

	// обработчик изменения позиций drag'n'drop
	function onDragWatermark(e, ui){
		currPos = {
			left: ui.position.left,
			top: ui.position.top
		};
		onPosChange();
	}

	// обработчик клика по кнопке с фиксированой позицией
	function onClickFixedButt(e){
		var id = $(e.target).attr('id');

		e.preventDefault();
		moveFixed(id);
		$(this).addClass('position__b-link__active');
	}

	// обработчики клика по спину
	function onSpinX(){
		currPos.left = $xVal.spinner('value') * images.getScale();
		onPosChange();
	}
	function onSpinY(){
		currPos.top = $yVal.spinner('value') * images.getScale();
		onPosChange();
	}

	// установка ватермарки в нужную позицию
	function setPos(position){
		$watermark.css({
			left: position.left,
			top: position.top
		});
		refreshPosVal(currPos);
	}

	// рендер позиций
	function refreshPosVal(){
		$xVal.spinner('value', parseInt(currPos.left / images.getScale()));
		$yVal.spinner('value', parseInt(currPos.top / images.getScale()));
	}

	// рендер прозрачности
	function refreshOpacityVal(opacity){
		$opacityVal.text(opacity);
	}

	// перемещение ватермарки по фиксированым позициям
	function moveFixed(pos){
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
	function calcPositions(){
		var	watermarkWidth = $('#watermark').width(),
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
	function getPos(){
		return currPos;
	}
	function getOpacity(){
		return currOpacity;
	}

	// !!!!!!!!!! ТОЛЬКО В ТАКОМ ПОРЯДКЕ   !!!!!!!!!!
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
		opacity: getOpacity
	};

}());