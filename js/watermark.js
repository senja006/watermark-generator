var watermark = (function() {

	var $opacityField = $('#opacity-field'),
		$opacity = $('#opacity'),
		$opacityVal = $('#opacity-val'),
		$xVal = $('#xVal'),
		$yVal = $('#yVal'),
		$watermark = $('#watermark'),
		$btnLeftTop = $('#lt'),
		$btnCentTop = $('#ct'),
		$btnRightTop = $('#rt'),
		$btnLeftMiddle = $('#lm'),
		$btnCentMiddle = $('#cm'),
		$btnRightMiddle = $('#rm'),
		$btnLeftBottom = $('#lb'),
		$btnCentBottom = $('#cb'),
		$btnRightBottom = $('#rb');

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
		$xVal.text(ui.position.left  + 1);
		$yVal.text(ui.position.top + 1);
	};

	function onClickFixedButt(e){
		var id = $(e.target).attr('id');
		moveFixed(id);
		e.preventDefault();
	};


	function moveFixed(pos){
		switch (pos) {
			case 'lt':
				$watermark.css({top: 0, left: 0});
				break
			case 'ct':
				$watermark.css({top: 0, left: '300px'});
				break
			case 'rt':
				$watermark.css({top: 0, right: 0});
				break
			default:
				break
		};
	};

	// здесь только запуск нужных функций
	return {
		init: function() {
			setStartOpacity();
			addDragAndDrop();
			addEventListeners();
		},
	};

}());