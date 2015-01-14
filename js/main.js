'use strict';

(function(){

  var $dragBoxes = $('.drag'),
      $opacityField = $('#opacity-field'),
      $opacity = $('#opacity'),
      $opacityVal = $('#opacity-val'),
      $xVal = $('#xVal'),
      $yVal = $('#yVal'),
      $backgroundURL = $('#backgroundURL'),
      $watermarkURL = $('#watermarkURL');
  
	var app = {
		
		initialize: function(){
			$opacityVal.text($dragBoxes.css('opacity'));
			$watermarkURL.text($('#drag__img').attr('src'));
    	$backgroundURL.text($('#bg__img').attr('src'));
			$dragBoxes.draggable({
	      cursor: 'move',
	      snap: '.result',
	      drag: app.updateCoordFields
	    });
	    this.setupListeners();
		},

		setupListeners: function(){
			  $opacity.on('change', this.opacityChange);
		},

		opacityChange: function(e){
	    var opacity = $(e.target).val() / 100; 
	    $dragBoxes.css({
	      'opacity': opacity
	    });
	    $opacityVal.text(opacity);
		},

		updateCoordFields: function(e, ui){
	    $xVal.text(ui.position.left  + 1);
	    $yVal.text(ui.position.top + 1);
	  }

	};

	app.initialize();

}());

