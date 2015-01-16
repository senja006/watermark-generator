var images = (function() {

	var $imgSource = $('#img-source'),
			$imgWatermark = $('#img-watermark'),
      $formImg = $('#form-control'),
			$bg = $('#bg'),
			$bgImg = $('#bg__img'),
			$wmImg = $('#drag__img');

	

	// установка обработчиков
	function addEventListeners() {
		$imgSource.on('change', onChangeImageSource);
		$imgWatermark.on('change', onChangeImageWatermark);
	}

	function onChangeImageSource(e){
		var file = this.files[0],
				fr = new FileReader();

		fr.onload = function(event) {
				$bgImg.attr('src', event.target.result);
		}

		fr.onerror = function(event) {
				console.error("Error: " + event.target.error.code);
		};

		fr.readAsDataURL(file);
	}

	function onChangeImageWatermark(e){
		var file = this.files[0],
				fr = new FileReader();

		fr.onload = function(event) {
				$wmImg.attr('src', event.target.result);
		}

		fr.onerror = function(event) {
				console.error("Error: " + event.target.error.code);
		};

		fr.readAsDataURL(file);
	}

	return {
		init: function() {
			addEventListeners();
			console.log('<images> init!');
		}
	};

}());