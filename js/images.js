var images = (function() {

	var $imgSource = $('#img-source'),
			$imgWatermark = $('#img-watermark'),
      // $formImg = $('#form-control'),
      $result = $('#result'),
			$bgImg = $('#bg__img'),
			$bgImgWrapper = $('#bg__wrapper'),
			$watermark = $('#watermark'),
			$wmImg = $('#drag__img');

	var	bgImgWidth,
			bgImgHeight,
			wmImgWidth,
			wmImgHeight,
			bgImgScale = 1;

	

	// установка обработчиков
	function addEventListeners() {
		$imgSource.on('change', onChangeImageSource);
		$imgWatermark.on('change', onChangeImageWatermark);
	}

	// обработчик смены исходного изображения
	function onChangeImageSource(e){
		var file = this.files[0],
				fr = new FileReader();

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
	function insertBgImg($image){
		$image.css({
			width: '100%'
		}).appendTo($bgImgWrapper);
		$result.css({
			minHeight: 0,
			height: $bgImgWrapper.height() - 4
		});
		watermark.calcPositions();
	}

	// обработчик смены изображения ватермарки
	function onChangeImageWatermark(e){
		var file = this.files[0],
				fr = new FileReader();

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

		if ($image) {
			scaleWidth = $image[0].width * bgImgScale;

			$image.css({
				width: scaleWidth
			});

			return $image;
		}
	}

	// функция вставки изображения ватермарки
	function insertWmImg($image){
		rescaleWmImg($image).appendTo($watermark);
		watermark.calcPositions();
		watermark.setPos({left: 0, top: 0});
	}

	return {
		init: function() {
			addEventListeners();
			console.log('<images> init!'); // дебаг
		},
		getScale: function(){
			return bgImgScale;
		}
	};

}());