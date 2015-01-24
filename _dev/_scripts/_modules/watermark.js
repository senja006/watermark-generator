var watermark = (function() {

	var $watermark = $('#watermark'), // watermark
		$bg = $('#bg__wrapper'), // original image
		$opacityVal = $('#opacity-val'), // поле значения прозрачности
		$opacity = $('#opacity'), // ползунок прозрачности		
		$xVal = $('#x-val'), // поле left
		$yVal = $('#y-val'), // поле top
		correctionX = 0, // коорекция координат в зависимости от размера картинки
		correctionY = 0,
		watermarkWidth = 0,  // размеры
		watermarkHeight = 0,
		bgWidth = 0,
		bgHeight = 0,
		scaleImgX = 1, // масштаб
		scaleImgY = 1,
		currPos = {    // текушее положение ватермарки top, left
			left: 0,
			top: 0
		},
		currOpacity = null, // текущая прозрачность
		optionsDraggable = {
			cursor: 'move',
			snap: '#bg__wrapper',
			drag: onDragWatermark // событие 'drag'
		},
		optionsSliderRange = {
			animate: true,
			range: "min",
			value: 50,
			min: 0,
			max: 100,
			step: 1,
			slide: onOpacityChange // событине на ползунке
		},
		resultBoxWidth = $('#result-box').width(),
		resultBoxHeight = $('#result-box').height(),
		$imgMain = null,
		$imgWatermark = null;

	function addEventListeners() {
		$watermark.draggable(optionsDraggable);
		$('.slider__range').slider(optionsSliderRange);
		$('.coordinate__property-btn').on('click', controlChangePositionOnClickButton);
	};

	function controlChangePositionOnClickButton() {
		if(!images.checkUploadImg()) return false;
		var id = $(this).attr('id');
		changeValuePosition(id);
		onChangeVal();
	};

	function changeValuePosition(id) {
		switch(id) {
			case 'x-val-plus':
				currPos.left++;
				break;
			case 'x-val-minus':
				currPos.left--;
				break;
			case 'y-val-plus':
				currPos.top++;
				break;
			case 'y-val-minus':
				currPos.top--;
				break;
		}
	};
	
	function controlGetOptionsImg(){
		$imgMain = $('#bg__img');
		$imgWatermark = $('#drag__img');
		$imgMain.add($imgWatermark).on('load.img', function() {
			getOptionsImgMain();
			getOptionsWatermark();
			setCorrectionVariables();
			correctionSizeWatermark();
			if(bgHeight > 0 && watermarkHeight > 0) {
				refreshPosInput();
			}
			$imgMain.add($imgWatermark).off('load.img');
		});
	};

	function getOptionsImgMain() {
		bgWidth = $imgMain.width();
		bgHeight = $imgMain.height();
	};

	function getOptionsWatermark() {
		watermarkWidth = $imgWatermark.css('max-width', '100000px').width();
		watermarkHeight = $imgWatermark.css('max-height', '100000px').height();
	};

	function setCorrectionVariables() {
		$imgMain.css({
			'max-width': '100000px',
			'max-height': '100000px'
		});
		scaleImgX = bgWidth / $imgMain.width();
		scaleImgY = bgHeight / $imgMain.height();
		$imgMain.css({
			'max-width': '100%',
			'max-height': '100%'
		});
		correctionX = (resultBoxWidth - bgWidth) / 2;
		correctionY = (resultBoxHeight - bgHeight) / 2;
		if(correctionY === 0) {
			correctionX = correctionX / scaleImgX;
		}
		if(correctionX === 0) {
			correctionY = correctionY / scaleImgY;
		}
	};

	function correctionSizeWatermark() {
		$imgWatermark.css({
			'max-width': watermarkWidth * scaleImgX,
		});
	};

	// обработчик смены прозрачности
	function onOpacityChange(e, ui) {
		currOpacity = ui.value;
		$watermark.css({
			'opacity': currOpacity / 100
		});
		$opacity.val(currOpacity / 100);
	};

	// обработчик изменения позиций drag'n'drop
	function onDragWatermark(e, ui) {
		currPos = {
			left: ui.position.left,
			top: ui.position.top
		};
		refreshPosInput();
	};

	// обработчики изменения позиции кнопками
	function onChangeVal() {
		refreshPosInput();
		setPos();
	};

	// просто обновляет инпуты позиции
	function refreshPosInput() {
		$xVal.val(Math.floor(parseInt(currPos.left / scaleImgX) - correctionX));
		$yVal.val(Math.floor(parseInt(currPos.top / scaleImgY) - correctionY));
	};

	// установка ватермарки в нужную позицию
	function setPos() {
		$watermark.css({
			left: currPos.left,
			top: currPos.top
		});
	}

	function setOpacity(opacity) {
		currOpacity = opacity || 0.5;
		$watermark.css('opacity', currOpacity);
		$opacity.val(currOpacity);
	}

	return {
		init: function() {
			addEventListeners();
			setOpacity();
			console.log('<watermark> init!');
		},
		getOptionsImg: controlGetOptionsImg
	};

}());