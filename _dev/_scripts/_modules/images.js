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
		$butReset = $('#but-reset'),
		$butFour = $('#but-four'),
		$butOne = $('#but-one');

	var bgImgWidth,
		bgImgHeight,
		wmImgWidth,
		wmImgHeight,
		bgImgScale = 1,

		vMargin = 0,
		hMargin = 0;

	// установка обработчиков
	function addEventListeners() {
		$imgSource.on('change', onChangeImageSource)
				  .on('focus', clearError);
		$imgWatermark.on('change', onChangeImageWatermark)
					 .on('focus', clearError);
		$('#but-bg-load').on('click', onButBgLoad);
		$('#but-wm-load').on('click', onButWmLoad);
		$butGetImage.on('click', onSubmitImage);
		$butReset.on('click', onResetForm);
		$butFour.on('click', function(e){
			e.preventDefault();
			$('.controls__switch-group-but').removeClass('active');
			$butFour.addClass('active');
			$('#one').hide();
			$('#four').show();
			tile();
		});
		$butOne.on('click', function(e){
			e.preventDefault();
			$('.controls__switch-group-but').removeClass('active');
			$butOne.addClass('active');
			$('#four').hide();
			$('#one').show();
			untile();
		});
	}
	
	function tile() {
		console.log('tiled');
	}

	function untile() {
		console.log('untiled');
	}

	function clearError() {
		$('.error').hide();
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
			error = errorImg(file);

		if (error !== '') {
			onErrorMessage(error, $("#bg-img-control .error"));
			return;
		}

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
			fr = new FileReader(),
			error = errorImg(file);

		console.log(error);
		if (error !== '') {
			onErrorMessage(error, $("#wm-img-control .error"));
			return;
		}

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
	function errorImg(file) {
		var errorMessage = '';

		if (!file.type.match('image.*')) {
			errorMessage = 'Файл должен быть изображением!';
		}
		if (file.size > MAX_FILE_SIZE) {
			errorMessage = 'Размер файла не может быть больше ' + MAX_FILE_SIZE + ' байт (у этого - ' + file.size + ')';
		}

		return errorMessage;
	}

	function onErrorMessage (message, $element) {
		$element.text(message);
		$element.show();
	}

	function onSubmitImage(e) {
		e.preventDefault();
	}

	function onResetForm(e) {
		e.preventDefault();
		$('#bg__img').remove();
		$('#drag__img').remove();
		$imgSource.val('');
		$imgWatermark.val('');
		watermark.calcSizes();
		watermark.calcPositions();

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