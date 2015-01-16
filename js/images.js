var images = (function() {

	var $imgSource = $('#img-source'),
		$imgWatermark = $('#img-watermark'),
        $formImg = $('#form-control'),
		$bg = $('#bg');

	// установка обработчиков
	function addEventListeners() {
		$imgSource.on('change', onChangeImageSource);
		$imgWatermark.on('change', onChangeImageWatermark);
		$formImg.on('submit', onSubmitForm);
	}

	function onChangeImageSource(e){
		var file = this.files[0];

		console.log(file)		;
	}
	function onChangeImageWatermark(e){
		var file = this.files[0];

		console.log(file)		;
	}

	function onSubmitForm(e){
		e.preventDefault();
		$.post({
			url: 'upload.php',
			success: function(data){
				console.log(data);
			}
		});
	}
	return {
		init: function() {
			addEventListeners();
			console.log('<images> init!');
		}
	};

}());