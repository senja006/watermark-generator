// Module opacity.js
//
// Require 	JQuery.min.js,	jquery-ui.min.js


'use strict';

var opacity = (function(){

	var $opacityField = $('#opacity-field'),
			$opacity = $('#opacity'),
			$opacityVal = $('#opacity-val'),
			$xVal = $('#xVal'),
			$yVal = $('#yVal');

	var module = {
		
		// инициализация
		initialize: function(){
			$opacityVal.text($watermark.css('opacity'));
			$watermark.draggable({
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
			$watermark.css({
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



