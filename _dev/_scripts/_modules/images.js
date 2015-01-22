var images = (function() {

	var MAX_FILE_SIZE = 10485760; // 10 Mb

	var $imgSource = $('#img-source'),
		$imgWatermark = $('#img-watermark'),
		$formImg = $('#form-control'),
		$result = $('#result'),
		$bgImgWrapper = $('#bg__wrapper'),
		$watermark = $('#watermark'),
		$bgImg = $('#bg__img'),
		$wmImg = $('#drag__img'),
		$butGetImage = $('#but-send'),
		$butReset = $('#but-reset');

	var bgImgWidth,
		bgImgHeight,
		wmImgWidth,
		wmImgHeight,
		bgImgScale = 1;

	// установка обработчиков
	function addEventListeners() {
		$imgSource.on('change', onChangeImageSource);
		$imgWatermark.on('change', onChangeImageWatermark);
		$('#but-bg-load').on('click', onButBgLoad);
		$('#but-wm-load').on('click', onButWmLoad);
		$butGetImage.on('click', onSubmitImage);
		$butReset.on('click', onResetForm);
	}

	function onButBgLoad(e) {
		e.preventDefault();
		console.log('bg load')
	}

	function onButWmLoad(e) {
		e.preventDefault();
		console.log('wm load')
	}

	// обработчик смены исходного изображения
	function onChangeImageSource(e) {
		var file = this.files[0],
			fr = new FileReader();

		if (!file || !validationImg(file)) return;

		fr.onload = function(event) {
			var $image = $(new Image());

			$('#bg__img').remove();
			$image.attr({
				src: event.target.result,
				id: 'bg__img'
			});

			bgImgWidth = $image[0].width;
			bgImgHeight = $image[0].height;
			bgImgScale = $bgImgWrapper.width() / bgImgWidth;
			if ($('#drag__img').length) {
				rescaleWmImg($('#drag__img'));
			}
			insertBgImg($image);
		}

		fr.onerror = function(event) {
			console.error("Error: " + event.target.error.code);
		};

		fr.readAsDataURL(file);

	}

	// функция вставки исходного изображения
	function insertBgImg($image) {
		$image.css({
			width: '100%'
		}).appendTo($bgImgWrapper);
		$result.css({
			minHeight: 0,
			height: $bgImgWrapper.height() - 4
		});
		watermark.calcPositions();
		watermark.setPos({
			left: 0,
			top: 0
		});
	}

	// обработчик смены изображения ватермарки
	function onChangeImageWatermark(e) {
		var file = this.files[0],
			fr = new FileReader();

		if (!validationImg(file)) return;

		fr.onload = function(event) {
			var $image = $(new Image());

			$('#drag__img').remove();
			$image.attr({
				src: event.target.result,
				id: 'drag__img'
			});
			wmImgWidth = $image[0].width;
			wmImgHeight = $image[0].height;
			insertWmImg($image);
		}

		fr.onerror = function(event) {
			console.error("Error: " + event.target.error.code);
		};

		fr.readAsDataURL(file);
	}

	// массштабирование ватермарки относительно исходного изображения
	function rescaleWmImg($image) {
		var scaleWidth = 0;

		scaleWidth = $image[0].width * bgImgScale;

		$image.css({
			width: scaleWidth
		});

		return $image;
	}

	// функция вставки изображения ватермарки
	function insertWmImg($image) {
		rescaleWmImg($image).appendTo($watermark);
		watermark.calcPositions();
		watermark.setPos({
			left: 0,
			top: 0
		});
	}

	// валидация изображения
	function validationImg(file) {
		var errorMessage;

		if (!file.type.match('image.*')) {
			errorMessage = 'Файл должен быть изображением!';
		}
		if (file.size > MAX_FILE_SIZE) {
			errorMessage = 'Размер файла не может быть больше ' + MAX_FILE_SIZE + ' байт (у этого - ' + file.size + ')';
		}
		if (errorMessage) {
			onErrorMessage(errorMessage);
			return false;
		}
		return true;
	}

	function onErrorMessage (message) {
		console.log(message);
	}

	function onSubmitImage(e) {
		e.preventDefault();
		onErrorMessage('Форма передана');
	}

	function onResetForm(e) {
		e.preventDefault();
		$('#bg__img').remove();
		$('#drag__img').remove();
		$imgSource.val('');
		$imgWatermark.val('');
		watermark.calcSizes();
		watermark.calcPositions();

		onErrorMessage('Форма очищена');
	}


	return {
		init: function() {
			addEventListeners();
			console.log('<images> init!'); // дебаг
		},
		getScale: function() {
			return bgImgScale;
		}
	};

}());