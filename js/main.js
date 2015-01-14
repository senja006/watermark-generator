// Module watermark

// Require 	JQuery-1.11.0.min.js,
// 					jquery-ui.min.js


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

	var module = {
		
		// инициализация
		initialize: function(){
			$opacityVal.text($dragBoxes.css('opacity'));
			$watermarkURL.text($('#drag__img').attr('src'));
			$backgroundURL.text($('#bg__img').attr('src'));
			$dragBoxes.draggable({
				cursor: 'move',
				snap: '.result',
				drag: module.onDragWatermark // событие 'drag'
			});
			module.setupListeners();
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
		init: module.initialize
	};

}());

watermark.init();

