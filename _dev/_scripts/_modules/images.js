var images = (function() {

	var IMG_SRC = 'upload/files/';

	function addEventListeners() {
		$('#download-img').on('submit', controlDownloadImg);
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
		var src = IMG_SRC + fileName;
		container.find('img').attr('src', src).css('width', '100%');
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

	return {
		init: function() {
			initJqueryFileUpload();
			addEventListeners();
		},
	};

}());