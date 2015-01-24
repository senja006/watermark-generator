var watermark = (function() {

	var
		$work = $('#work'),
		$wm = $('#wm'), // контейнер дла ватермарка
		$bg = $('#bg'), // контейнер для исходного изображкения
		$wmTilesWork = $('#wm-tiles-work'); // границы для замощеного контенера
		$wmTiles = $('#wm-tiles'); // замощеный контейнер
		$bgImg = $('#bg__img'), // исходное изображение
		$wmImg = $('#wm__img'), // изображение ватермарк

		$opacityVal = $('#opacity-val'), // поле прозрачности
		$opacity = $('#opacity'), // 
		$xVal = $('#x-val'),
		$yVal = $('#y-val');

	$btnLeftTop = $('#lt'),
		$btnRightTop = $('#rt'),
		$btnLeftMiddle = $('#lm'),
		$btnCentMiddle = $('#cm'),
		$btnRightMiddle = $('#rm'),
		$btnLeftBottom = $('#lb'),
		$btnCentBottom = $('#cb'),
		$btnRightBottom = $('#rb'),

		$btnXPlus = $('#x-val-plus'), // кнопки изменения позиции
		$btnYPlus = $('#y-val-plus'),
		$btnXMinus = $('#x-val-minus'),
		$btnYMinus = $('#y-val-minus'),

		$btnFour = $('#but-four'), // кнопки замостить-размостить 
		$btnOne = $('#but-one'),

		$hMarginVal = $('#h-margin-val'), // инпуты полей
		$vMarginVal = $('#v-margin-val'),
		$btnHMarginPlus = $('#h-margin-plus'), // кнопки полей
		$btnHMarginMinus = $('#h-margin-minus'),
		$btnVMarginPlus = $('#v-margin-plus'),
		$btnVMarginMinus = $('#v-margin-minus'),
		$lineHMargin = $('#h-margin-line'), // красные линии
		$lineVMargin = $('#v-margin-line'),

		draggable = false,
		mode = "untile";

	var param = {
		wmWidth: 0,
		wmHeight: 0,
		bgWidth: 0,
		bgHeight: 0,
		scale: 1,
		fixedPositions: {},
		currOpacity: 0.5,
		vMargin: 0,
		hMargin: 0,
		currPos: {
			left: 0,
			top: 0
		}
	}

	// инициализация плагинов
	function initPlugins() {
		$(".slider__range").slider({
			animate: true,
			range: "min",
			value: parseInt(param.currOpacity * 100),
			min: 0,
			max: 100,
			step: 1,
			slide: onOpacityChange
		});
		$wm.css('opacity', param.currOpacity);
	}

	// инициализация плагина draggable
	function initDrag() {
		$work.width($('#bg').width());
		$work.height($('#bg').height());
		$wm.draggable({
			snapTolerance: 5,
			containment: "parent",
			cursor: 'move',
			snap: $work.selector,
			drag: onDragWatermark
		});
		draggable = true;
	}

	function addEventListeners() {
		var i = 0;
		$('.one-watermark__col-link').on('click', onClickFixedButt);

		$btnXPlus.on('click', function() {
			if (!draggable) return;
			++param.currPos.left;
			if (param.currPos.left >= param.fixedPositions.rb.left) --param.currPos.left;
			refreshPosVal();
			moveWm();
		});
		$btnYPlus.on('click', function() {
			if (!draggable) return;
			++param.currPos.top;
			if (param.currPos.top >= param.fixedPositions.rb.top) --param.currPos.top;
			refreshPosVal();
			moveWm();
		});
		$btnXMinus.on('click', function() {
			if (!draggable) return;
			--param.currPos.left;
			if (param.currPos.left < 0) ++param.currPos.left;
			refreshPosVal();
			moveWm();
		});
		$btnYMinus.on('click', function() {
			if (!draggable) return;
			--param.currPos.top;
			if (param.currPos.top < 0) ++param.currPos.top;
			refreshPosVal();
			moveWm();
		});
		$btnFour.on('click', function(e) {
			e.preventDefault();
			tile();
		});
		$btnOne.on('click', function(e) {
			e.preventDefault();
			untile();
		});
		$('.margin__property-btn').on('click', onChangeMargin);
	}

	// создание замощения
	function createTiled () {
		var wmW = param.wmWidth,
			wmH = param.wmHeight,
			colsTiled = param.bgWidth / wmW + 2,
			rowsTiled = param.bgHeight / wmH + 2;

			$('#wm-tiles-work').css({
				'width': (colsTiled + 2) * wmW * param.scale,
				'height': (rowsTiled + 1) * wmH * param.scale,
				'left': 0 - wmW * 2 * param.scale,
				'top': 0 - wmH * 2 * param.scale
			});
			$('#wm-tiles').css({
				'width': colsTiled * wmW * param.scale,
				'height': rowsTiled * wmH * param.scale,
				'left': wmW * param.scale,
				'top': wmH * param.scale
			});

			for (var i = 0; i < colsTiled * rowsTiled; i++) {
				console.log(wmW * param.scale);
				var img = $('<img/>');
				img.attr('src', $('#wm__img').attr('src'));
				img.css ({
					'dislay': 'block',
					'width': wmW * param.scale,
					'height': wmH * param.scale,
					'margin-right': param.vMargin,
					'margin-top': param.hMargin,
					'float': 'left'
				});
				img.appendTo($('#wm-tiles'));
			}
			$('#wm-tiles').draggable({
				containment: "parent",
				cursor: 'move'
			}).css('opacity', param.currOpacity);
	}

	// обработчик кнопок изменения полей
	function onChangeMargin (e) {
		e.preventDefault();
		switch (e.target.id) {
			case 'h-margin-plus':
				++param.hMargin;
				break;
			case 'v-margin-plus':
				++param.vMargin;
				break;
			case 'h-margin-minus':
				--param.hMargin;
				break;
			case 'v-margin-minus':
				--param.vMargin;
				break
		}
		refreshMarginVal();
	}

	// обновление инпутов полей
	function refreshMarginVal() {
		$hMarginVal.val(param.hMargin);
		$vMarginVal.val(param.vMargin);
		$lineHMargin.height(param.hMargin);
		$lineVMargin.width(param.vMargin);
		$('#wm-tiles img').css({
			'marginRight': param.hMargin,	
			'marginTop': param.vMargin,	
		});
	}

	// замостить
	function tile() {
		$('.controls__switch-group-but').removeClass('active');
		$(this).addClass('active');
		$('#mode').val('tile');
		$('#one').hide();
		$('#four').show();
		$wm.fadeOut();
		$('#wm-tiles-work').fadeIn();
	}
	
	// размостить
	function untile() {
		$('.controls__switch-group-but').removeClass('active');
		$(this).addClass('active');
		$('#mode').val('untail');
		$('#four').hide();
		$('#one').show();
		$('#wm-tiles-work').fadeOut();
		$wm.fadeIn();
	}	

	// обработчик смены прозрачности
	function onOpacityChange(e, ui) {
		param.currOpacity = ui.value / 100;
		$wm.css('opacity', param.currOpacity);
		$wmTiles.css('opacity', param.currOpacity);
		$opacity.val(param.currOpacity);
	}

	// обработчик изменения позиций drag'n'drop
	function onDragWatermark(e, ui) {
		rmClassActive();
		if (param.scale) {
			param.currPos.left = ui.position.left / param.scale;
			param.currPos.top = ui.position.top / param.scale;
		}
		console.log(param.fixedPositions.cm.left);
		refreshPosVal();
	}

	// обновление полей с координатами
	function refreshPosVal() {
		$xVal.val(parseInt(param.currPos.left));
		$yVal.val(parseInt(param.currPos.top));
	}

	// удаление активного класса у кнопок с фикс позициями
	function rmClassActive() {
		$('.one-watermark__col-link').removeClass('one-watermark__col-link__active');
	}

	// обработчик клика по кнопке с фиксированой позицией
	function onClickFixedButt(e) {
		e.preventDefault();
		if (!draggable) return;
		rmClassActive();
		moveFixed($(this).attr('id'));
		$(this).addClass('one-watermark__col-link__active');
	}

	// перемещение ватермарки по фиксированым позициям
	function moveFixed(pos) {
		if (!pos) return;
		switch (pos) {
			case 'lt':
				param.currPos = param.fixedPositions.lt;
				break
			case 'ct':
				param.currPos = param.fixedPositions.ct;
				break
			case 'rt':
				param.currPos = param.fixedPositions.rt;
				break
			case 'lm':
				param.currPos = param.fixedPositions.lm;
				break
			case 'cm':
				param.currPos = param.fixedPositions.cm;
				break
			case 'rm':
				param.currPos = param.fixedPositions.rm;
				break
			case 'lb':
				param.currPos = param.fixedPositions.lb;
				break
			case 'cb':
				param.currPos = param.fixedPositions.cb;
				break
			case 'rb':
				param.currPos = param.fixedPositions.rb;
				break
			default:
				break
		}
		moveWm();
		refreshPosVal();
	}

	// перемещение в текущую позицию
	function moveWm() {
		rmClassActive();
		$('#wm').animate({
			left: param.currPos.left * param.scale,
			top: param.currPos.top * param.scale
		});
	}
	
	// вычисление фиксированых позиций
	function calcPositions() {
		param.fixedPositions = {
			lt: {
				left: 0,
				top: 0
			},
			ct: {
				left: parseInt((param.bgWidth - param.wmWidth) / 2),
				top: 0
			},
			rt: {
				left: param.bgWidth - param.wmWidth,
				top: 0
			},
			lm: {
				left: 0,
				top: parseInt((param.bgHeight - param.wmHeight)) / 2,
			},
			cm: {
				left: parseInt((param.bgWidth - param.wmWidth) / 2),
				top: parseInt((param.bgHeight - param.wmHeight) / 2)
			},
			rm: {
				left: param.bgWidth - param.wmWidth,
				top: parseInt((param.bgHeight - param.wmHeight) / 2)
			},
			lb: {
				left: 0,
				top: param.bgHeight - param.wmHeight,
			},
			cb: {
				left: parseInt((param.bgWidth - param.wmWidth) / 2),
				top: param.bgHeight - param.wmHeight
			},
			rb: {
				left: param.bgWidth - param.wmWidth,
				top: param.bgHeight - param.wmHeight
			}
		}
	}

	// установка параметров
	function setParams(data) {
		if (data) {
			for (var key in data) {
				param[key] = data[key];
			}
			calcPositions();
		}
	}

	// масщтабирование
	function scaleImg() {
		if (param.bgWidth >= param.bgHeight) {
			param.scale = $('#result-box').width() / param.bgWidth;
		} else {
			console.log('less');
			param.scale = $('#result-box').height() / param.bgHeight;
		}
		zoom();
		initDrag();
	}

	// масщтабирование с параметром
	function zoom(scale) {
		param.scale = scale || param.scale;
		$('#bg__img').css('width', param.bgWidth * param.scale);
		$('#wm__img').css('width', param.wmWidth * param.scale);
		centeredBg();
	}

	// центрирование
	function centeredBg() {
		$work.css('left', ($('#result-box').width() - param.bgWidth * param.scale) / 2);
		$work.css('top', ($('#result-box').height() - param.bgHeight * param.scale) / 2);
	}

	function reset() {
		param.draggable = false;
		untile();
	}

	return {
		init: function() {
			initPlugins();
			addEventListeners();
		},
		setParams: setParams,
		scaleImg: scaleImg,
		getParams: function() {
			return param;
		},
		reset: reset,
		createTiled: createTiled
	};

}());