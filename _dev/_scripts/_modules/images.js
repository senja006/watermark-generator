var images = (function() {

	var IMG_SRC = 'upload/files/';

	function addEventListeners() {
		$('#download-img').on('submit', controlDownloadImg);
		$('#but-reset').on('click', resetForm);
	};

	function initJqueryFileUpload() {
		initUploadImg('main');
		initUploadImg('watermark');
	};

	function controlDownloadImg() {
		var $form = $(this);
		var data = $form.serialize();
		$.ajax({
			url: 'create-img.php',
			type: 'POST',
			dataType: 'html',
			data: data,
			success: function(response) {
				var response = getObj(response);
				// console.log(response);
				downloadResImg(response);
				// console.log('отправлено');
			},
			error: function(response) {
				// console.log('ошибка');
			},
		});
		// console.log(data);
		return false;
	};

	function initUploadImg(endId) {
		$('#input__file-' + endId).fileupload({
	        url: 'upload/upload.php',
	        dataType: 'json',
	        add: function(e, data) {
	        	$.each(data.files, function (index, file) {
	            	addNameFile(file.name, $('.input-file--' + endId));
	            });
	        	data.submit();
	        },
	        done: function(e, data){
	         	 $.each(data.result.files, function (index, file) {
	                addImg(file.name, $('.img-' + endId));
	                addNameFileWithVersion(file.name, $('.input-file--' + endId));
					watermark.calcBasicParam();
	            });
	        }
	    });
	};

	function addNameFile(name, container) {
		container.find('.input__file-name').val(name);
		// hideTooltip.apply($inputFile);
	};

	function addNameFileWithVersion(name, container) {
		container.find('.input__file-name-version').val(name);
	};

	function addImg(fileName, container) {
		// var $img = new Image();
		// $img.src = IMG_SRC + fileName;
		var img = $('<img/>'),
			src = IMG_SRC + fileName;
			containerClass = container.attr('class');

		container.find('img').remove();

		console.log(containerClass);
		if (containerClass.match(/img-main/)) {
			img.attr('id', 'bg__img')
		} else if (containerClass.match(/img-watermark/)) {
			img.attr('id', 'drag__img')
		} else {
			console.error('Чё за контейнер?!');
			return;
		}
		img.attr('src', src).addClass(containerClass);
		container.append(img);
		// console.log($('#img-watermark'));
		// container.empty().append($img);
	};


	function getObj(json) {
		var obj = JSON.parse(json);
		return obj;
	};

	function downloadResImg(response) {
		var href = 'download-img.php?file=' + response['src-res'];
		window.downloadFile = function(url) {
		    window.open(url, '_self');
		}
		window.downloadFile(href);
	};

	function resetForm() {
		$('#download-img').find('input').val('');
		$('#bg__img, #drag__img').remove();
	}

	return {
		init: function() {
			initJqueryFileUpload();
			addEventListeners();
		},
	};

}());