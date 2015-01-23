var images = (function() {

	var IMG_SRC = 'upload/files/';

	var $work = $('#work'),
		$wm = $('#wm'),
		$bg = $('#bg'),
		$bgImg = $('#bg__img'),
		$wmImg = $('#wm__img');

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
				$.each(data.files, function(index, file) {
					addNameFile(file.name, $('.input-file--' + endId));
				});
				data.submit();
			},
			done: function(e, data) {
				$.each(data.result.files, function(index, file) {
					addImg(file.name, endId);
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
		var img = $('<img/>'),
			src = IMG_SRC + fileName;

		if (container.match(/main/)) {
			if ($('#bg__img')) $('#bg__img').remove();
			img.attr({
				id: 'bg__img',
				class: 'bg__img',
				src: src
			}).on('load', function() {
				watermark.setParams({
					bgWidth: $(this).width(),
					bgHeight: $(this).height()
				});
				watermark.scaleImg();
			}).appendTo($bg);

		} else if (container.match(/watermark/)) {
			if ($('#wm__img')) $('#wm__img').remove();
			img.attr({
				id: 'wm__img',
				class: 'wm__img',
				src: src
			}).on('load', function() {
				watermark.setParams({
					wmWidth: $(this).width(),
					wmHeight: $(this).height()
				});
				watermark.scaleImg();
			}).appendTo($wm);

		} else {
			console.error('Чё за контейнер?!');
			return;
		}
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