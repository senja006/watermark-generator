'use strict';

var watermark = (function(){

	var $dragBoxes = $('.drag'),
			$opacityField = $('#opacity-field'),
			$opacity = $('#opacity'),
			$opacityVal = $('#opacity-val'),
			$xVal = $('#xVal'),
			$yVal = $('#yVal'),
			$backgroundURL = $('#backgroundURL'),
			$watermarkURL = $('#watermarkURL');

	var app = {
		
		// инициализация
		initialize: function(){
			$opacityVal.text($dragBoxes.css('opacity'));
			$watermarkURL.text($('#drag__img').attr('src'));
			$backgroundURL.text($('#bg__img').attr('src'));
			$dragBoxes.draggable({
				cursor: 'move',
				snap: '.result',
				drag: app.onDragWatermark // событие 'drag'
			});
			app.setupListeners();
		},


		// установка обработчиков
		setupListeners: function(){
			$opacity.on('change', this.onOpacityChange);
		},

		// обработчик изменения контрола Opacity watermark
		onOpacityChange: function(e){
			var opacity = $(e.target).val() / 100; 
			$dragBoxes.css({
				'opacity': opacity
			});
			$opacityVal.text(opacity);
		},

		// обработчик события 'drag' плагина 'draggable'
		onDragWatermark: function(e, ui){
			$xVal.text(ui.position.left  + 1);
			$yVal.text(ui.position.top + 1);
		}

	};

	return {
		init: app.initialize
	};

}());

watermark.init();

