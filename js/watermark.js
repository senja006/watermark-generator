var watermark = (function() {

	var	$watermark = $('#watermark'),			// watermark
		$bg = $('#bg'),							// original image
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
			left: 0 + "px",
			top: 0 + "px"
		},
		currOpacity = 0.5;



	// инициализация плагинов
	function initPlugins() {
		$watermark.draggable({
			cursor: 'move',
			snap: '.result',
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
		refreshPosVal(currPos)
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
		refreshPosVal(currPos);
	}

	// обработчик изменения позиций drag'n'drop
	function onDragWatermark(e, ui){
		currPos.left = ui.position.left + 1 + "px";
		currPos.top = ui.position.top + 1 + "px";
		refreshPosVal(currPos);
	}

	// обработчик клика по кнопке с фиксированой позицией
	function onClickFixedButt(e){
		var id = $(e.target).attr('id');

		e.preventDefault();
		$('.position__b-link').removeClass('position__b-link__active');
		$(this).addClass('position__b-link__active');
		moveFixed(id);
		onPosChange();
	}

	// обработчики клика по спину
	function onSpinX(){
		currPos.left = $xVal.spinner('value');
		setPos(currPos);
	}
	function onSpinY(){
		currPos.top = $yVal.spinner('value');
		setPos(currPos);
	}

	// установка ватермарки в нужную позицию
	function setPos(position){
		$watermark.css(position);
	}

	// рендер позиций
	function refreshPosVal(){
		var left = parseInt(currPos.left),
			top = parseInt(currPos.top);

		$xVal.spinner('value', left);
		$yVal.spinner('value', top);
	}

	// рендер прозрачности
	function refreshOpacityVal(opacity){
		$opacityVal.text(opacity);
	}

	// перемещение ватермарки по фиксированым позициям
	function moveFixed(pos){
		switch (pos) {
			case 'lt':
				$watermark.css(fixedPositions.lt);
				currPos = fixedPositions.lt;
				break
			case 'ct':
				$watermark.css(fixedPositions.ct);
				currPos = fixedPositions.ct;
				break
			case 'rt':
				$watermark.css(fixedPositions.rt);
				currPos = fixedPositions.rt;
				break
			case 'lm':
				$watermark.css(fixedPositions.lm);
				currPos = fixedPositions.lm;
				break
			case 'cm':
				$watermark.css(fixedPositions.cm);
				currPos = fixedPositions.cm;
				break
			case 'rm':
				$watermark.css(fixedPositions.rm);
				currPos = fixedPositions.rm;
				break
			case 'lb':
				$watermark.css(fixedPositions.lb);
				currPos = fixedPositions.lb;
				break
			case 'cb':
				$watermark.css(fixedPositions.cb);
				currPos = fixedPositions.cb;
				break
			case 'rb':
				$watermark.css(fixedPositions.rb);
				currPos = fixedPositions.rb;
				break
			default:
				break
		};
	}

	// вычисление фиксированых позиций
	function calcPositions(){
		watermarkWidth = $watermark.width();
		watermarkHeight = $watermark.height();
		bgWidth = $bg.width();
		bgHeight = $bg.height();

		fixedPositions = {
			lt: {
				left: 0,
				top: 0
			},
			ct: {
				left: parseInt((bgWidth - watermarkWidth) / 2) + "px",
				top: 0
			},
			rt: {
				left: bgWidth - watermarkWidth + "px",
				top: 0
			},
			lm: {
				left: 0,
				top: parseInt((bgHeight - watermarkHeight)) / 2 + "px",
			},
			cm: {
				left: parseInt((bgWidth - watermarkWidth) / 2) + "px",
				top: parseInt((bgHeight - watermarkHeight) / 2) + "px"
			},
			rm: {
				left: bgWidth - watermarkWidth + "px",
				top: parseInt((bgHeight - watermarkHeight) / 2) + "px"
			},
			lb: {
				left: 0,
				top: bgHeight - watermarkHeight + "px",
			},
			cb: {
				left: parseInt((bgWidth - watermarkWidth) / 2) + "px",
				top: bgHeight - watermarkHeight + "px"
			},
			rb: {
				left: bgWidth - watermarkWidth + "px",
				top: bgHeight - watermarkHeight + "px"
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
		},
		position: getPos,
		opacity: getOpacity
	};

}());