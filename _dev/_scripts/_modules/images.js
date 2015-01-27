var images = (function() {

	var IMG_SRC = 'upload/files/';
	var MAX_FILE_SIZE = 2000000;
	var timerError = null;

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
		if(!checkUploadImg()) return false;
		var $form = $(this);
		var data = $form.serialize();
		$.ajax({
			url: 'create-img.php',
			type: 'POST',
			dataType: 'html',
			data: data,
			beforeSend: function(){
				$('.preloader').show();
			},
			success: function(response) {
				var response = getObj(response);
				// console.log(response);
				downloadResImg(response);
				// console.log('отправлено');
				$('.preloader').hide();
			},
			error: function(response) {
				// console.log('ошибка');
			},
		});
		// console.log(data);
		return false;
	};

	function initUploadImg(endId) {
		var $input = $('#input__file-' + endId);
		var $controlsFile = $input.parents('.controls__file');
		$input.fileupload({
			url: 'upload/upload.php',
			dataType: 'json',
			add: function(e, data) {
				var errorsText = '';
		        var acceptFileTypes = /^image\/(gif|jpe?g|png)$/i;

		        $('.preloader').show();
		        if(data.originalFiles[0]['size'] > MAX_FILE_SIZE) {
		            errorsText = lang.getMsgText('maxfilesize') + (MAX_FILE_SIZE / 1000000) + lang.getMsgText('mb');
		        }
		        if(data.originalFiles[0]['type'].length && !acceptFileTypes.test(data.originalFiles[0]['type'])) {
		            errorsText = lang.getMsgText('onlypicture');
		        }
		        if(errorsText.length > 0) {
		            showError($controlsFile, errorsText);
		        }else{
		            data.submit();
		        	hideError($controlsFile);
		        }
			},
			done: function(e, data) {
		        $controlsFile.addClass('is-load');
	        	$.each(data.files, function(index, file) {
					addNameFile(file.name, $controlsFile);
				});
				$.each(data.result.files, function(index, file) {
					addImg(file.name, endId);
					addNameFileWithVersion(file.name, $('.input-file--' + endId));
				});
			},
			fail: function (e, data) {
				showError($controlsFile, lang.getMsgText('cantload'));
			},
		});
	};

	function addNameFile(name, container) {
		container.find('.input__file-name').val(name);
	};

	function addNameFileWithVersion(name, container) {
		container.find('.input__file-name-version').val(name);
	};

	function addImg(fileName, container) {
		var img = $('<img/>'),
			src = IMG_SRC + fileName;

		if (container.match(/main/)) {
			if ($('#bg__img')) $('#bg__img').fadeOut().remove();
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
				$(this).hide().fadeIn();
				$('.preloader').hide();
			})
			img.appendTo($bg);

		} else if (container.match(/watermark/)) {
			if ($('#wm img')) $('#wm img').remove();
			if ($('.wm__tile')) $('.wm__tile').remove();
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
				watermark.createTiled();
				$(this).hide().fadeIn();
				$('.preloader').hide();
			});
			img.appendTo($wm);
			
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
		$('.is-load').removeClass('is-load');
		$('.error').fadeOut(300);
		$('#bg__img, #wm__img').remove();
		watermark.reset();
	};

	function checkUploadImg() {
		console.log('check');
		$('.controls__file').each(function() {
			var $this = $(this);
			var $input = $this.find('.input__file-name');
			var emptyVal = '';
			if($input.val() === '') {
				showError($this, lang.getMsgText('needfile'));
			}else{
				hideError($this);
			}
		});
		if($('.is-error').length) {
			return false;
		}else{
			return true;
		};
	};

	function showError(container, text) {
		var $controlsFile = container;
		var $error = $controlsFile.find('.error');
		$error.text(text);
		$controlsFile.addClass('is-error');
		$error.fadeIn(300);
		if($controlsFile.hasClass('is-load')) {
			timerError = setTimeout(function() {
				hideError($controlsFile);
			}, 3000);
		}
	};

	function hideError(container) {
		container.removeClass('is-error').find('.error').fadeOut(300);
	};

	return {
		init: function() {
			initJqueryFileUpload();
			addEventListeners();
		},
		checkUploadImg: checkUploadImg,
	};

}());