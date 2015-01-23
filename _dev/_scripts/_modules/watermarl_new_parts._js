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


		