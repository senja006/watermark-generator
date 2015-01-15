var watermark = (function() {

	var	$watermark = $('#watermark'),			// watermark
		$bg = $('#bg'),							// original image
		$opacityField = $('#opacity-field'),
		$opacity = $('#opacity'),
		$opacityVal = $('#opacity-val'),
		$xVal = $('#xVal'),
		$yVal = $('#yVal'),
		$btnLeftTop = $('#lt'),
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
		watermarLeft = 0,
		watermarTop = 0,
		fixedPositions = {},
		currPos = {
			left: 0,
			top: 0
		};


	function addEventListeners() {
		$opacity.on('change', onOpacityChange);
		$('.position__b-link').on('click', onClickFixedButt);
	};

	function onOpacityChange(e){
		var opacity = $(e.target).val() / 100;
		$watermark.css({
			'opacity': opacity
		});
		$opacityVal.text(opacity);
	};

	function setStartOpacity() {
		$opacityVal.text($watermark.css('opacity'));
	};

	function addDragAndDrop() {
		$watermark.draggable({
			cursor: 'move',
			snap: '.result',
			drag: onDragWatermark // событие 'drag'
		});
	};

	function onDragWatermark(e, ui){
		refreshPosVal(ui.position.left + 1, ui.position.top + 1);
	};

	function refreshPosVal(x, y){
		$xVal.text(x);
		$yVal.text(y);
	}

	function onClickFixedButt(e){
		var id = $(e.target).attr('id');

		e.preventDefault();
		moveFixed(id);
	};


	function moveFixed(pos){
		switch (pos) {
			case 'lt':
				$watermark.css(fixedPositions.lt);
				refreshPosVal($watermark.css('left'), $watermark.css('top'));
				break
			case 'ct':
				$watermark.css(fixedPositions.ct);
				refreshPosVal($watermark.css('left'), $watermark.css('top'));
				break
			case 'rt':
				$watermark.css(fixedPositions.rt);
				refreshPosVal($watermark.css('left'), $watermark.css('top'));
				break
			case 'lm':
				$watermark.css(fixedPositions.lm);
				refreshPosVal($watermark.css('left'), $watermark.css('top'));
				break
			case 'cm':
				$watermark.css(fixedPositions.cm);
				refreshPosVal($watermark.css('left'), $watermark.css('top'));
				break
			case 'rm':
				$watermark.css(fixedPositions.rm);
				refreshPosVal($watermark.css('left'), $watermark.css('top'));
				break
			case 'lb':
				$watermark.css(fixedPositions.lb);
				refreshPosVal($watermark.css('left'), $watermark.css('top'));
				break
			case 'cb':
				$watermark.css(fixedPositions.cb);
				refreshPosVal($watermark.css('left'), $watermark.css('top'));
				break
			case 'rb':
				$watermark.css(fixedPositions.rb);
				refreshPosVal($watermark.css('left'), $watermark.css('top'));
				break
			default:
				break
		};
	};

	// вычисление размеров основных элементов
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
				left: (bgWidth - watermarkWidth) / 2 + "px",
				top: 0
			},
			rt: {
				left: bgWidth - watermarkWidth + "px",
				top: 0
			},
			lm: {
				left: 0,
				top: (bgHeight - watermarkHeight) / 2 + "px",
			},
			cm: {
				left: (bgWidth - watermarkWidth) / 2 + "px",
				top: (bgHeight - watermarkHeight) / 2 + "px"
			},
			rm: {
				left: bgWidth - watermarkWidth + "px",
				top: (bgHeight - watermarkHeight) / 2 + "px"
			},
			lb: {
				left: 0,
				top: bgHeight - watermarkHeight + "px",
			},
			cb: {
				left: (bgWidth - watermarkWidth) / 2 + "px",
				top: bgHeight - watermarkHeight + "px"
			},
			rb: {
				left: bgWidth - watermarkWidth + "px",
				top: bgHeight - watermarkHeight + "px"
			}
		}
	}

	// здесь только запуск нужных функций
	return {
		init: function() {
			calcPositions();
			setStartOpacity();
			addDragAndDrop();
			addEventListeners();
		},
	};

}());