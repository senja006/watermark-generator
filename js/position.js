// Module position.js
//
// Require 	JQuery.min.js,	jquery-ui.min.js


'use strict';

var position = (function(){

	var $btnLeftTop = $('#lt'),
			$btnCentTop = $('#ct'),
			$btnRightTop = $('#rt'),
			$btnLeftMiddle = $('#lm'),
			$btnCentMiddle = $('#cm'),
			$btnRightMiddle = $('#rm'),
			$btnLeftBottom = $('#lb'),
			$btnCentBottom = $('#cb'),
			$btnRightBottom = $('#rb');



	var module = {
		
		// инициализация
		initialize: function(){
			module.setupListeners();
		},


		// установка обработчиков
		setupListeners: function(){
			$('.position__b-link').on('click', module.onClickFixedButt);
		},

		onClickFixedButt: function(e){

			var id = $(e.target).attr('id');
			
			module.moveFixed(id);
			e.preventDefault();
		},

		moveFixed: function(pos){
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
			}

		}
	};

	return {
		init: module.initialize
	};

}());