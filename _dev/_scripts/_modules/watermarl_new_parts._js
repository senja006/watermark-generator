// кнопки смены режима
		$btnFour.on('click', function(e){
			e.preventDefault();
			$('.controls__switch-group-but').removeClass('active');
			$btnFour.addClass('active');
			$('#one').hide();
			$('#four').show();
			tile();
		});
		$btnOne.on('click', function(e){
			e.preventDefault();
			$('.controls__switch-group-but').removeClass('active');
			$btnOne.addClass('active');
			$('#four').hide();
			$('#one').show();
			untile();
		});


				// обработчики кнопок +/- полей
		$btnHMarginPlus.on('click', function(e){ 
			hMargin = hMargin + 1;
			onChangeHMargin();
		});
		$btnHMarginMinus.on('click', function(e){
			hMargin = hMargin - 1;
			onChangeHMargin();
		});
		$btnVMarginPlus.on('click', function(e){
			vMargin = vMargin + 1;
			onChangeVMargin();
		});
		$btnVMarginMinus.on('click', function(e){
			vMargin = vMargin - 1;
			onChangeVMargin();
		});

			// замостить
	function tile() {
		var rows = bgHeight / watermarkHeight + 1,
			cols = bgWidth / watermarkWidth + 1;

		$('#drag__img').css({
			'float': 'left',
			'margin': '0 ' + hMargin + 'px ' + vMargin + 'px ' + '0'
		});

		for(var i = 0; i < rows * cols; i++) {
			var img = $('<img/>');

			img.attr('src', $('#drag__img').attr('src'));
			img.css({
				'margin': '0 ' + hMargin + 'px ' + vMargin + 'px ' + '0',
				'width': $('#drag__img').width(),
				'height': $('#drag__img').height()
			});
			img.addClass('drug__watermark');
			$watermark.append(img);
		}
		$watermark.draggable('disable');
	}

	// размостить
	function untile() {

	}


	

	function onChangeHMargin() {
		$hMarginVal.val(hMargin);
		$('.drug__watermark').css('marginBottom', hMargin);
		$hMarginLine.css('height', hMargin);
	}

	function onChangeVMargin() {
		$vMarginVal.val(vMargin);
		$('.drug__watermark').css('marginRight', vMargin);
		$vMarginLine.css('width', vMargin);
	}