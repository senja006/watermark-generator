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
		$yVal = $('#y-val'),

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
	};

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
		$opacity.val(param.currOpacity);
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
		$('.one-watermark__col-link').on('click', onClickFixedButt);
		$('.coordinate__property-btn').on('click', controlChangeCoordinates);
		$('#but-four').on('click', tile);
		$('#but-one').on('click', untile);
		$('.margin__property-btn').on('click', onChangeMargin);
	};

	function controlChangeCoordinates() {
		if (!images.checkUploadImg()) return;
		if (!draggable) return;
		var id = $(this).attr('id');
		switch (id) {
			case 'x-val-plus':
				++param.currPos.left;
				if (param.currPos.left >= param.fixedPositions.rb.left) --param.currPos.left;
				break;
			case 'y-val-plus':
				++param.currPos.top;
				if (param.currPos.top >= param.fixedPositions.rb.top) --param.currPos.top;
				break;
			case 'x-val-minus':
				--param.currPos.left;
				if (param.currPos.left < 0) ++param.currPos.left;
				break;
			case 'y-val-minus':
				--param.currPos.top;
				if (param.currPos.top < 0) ++param.currPos.top;
				break;
		}
		refreshPosVal();
		moveWm();
	};

	// создание замощения
	function createTiled() {
		var wmW = param.wmWidth,
			wmH = param.wmHeight,
			colsTiled = param.bgWidth / wmW + 3,
			rowsTiled = param.bgHeight / wmH + 3;
		var data = {
			'wmW': wmW,
			'wmH': wmH,
			'colsTiled': colsTiled,
			'rowsTiled': rowsTiled,
			'colsTiled * rowsTiled': colsTiled * rowsTiled,
		};
		console.log(data);

		$('#wm-tiles-work').css({
			'width': param.bgWidth * param.scale,
			'height': param.bgHeight * param.scale,
			'left': 0,
			'top': 0,
			'overflow': 'hidden'
		});
		$('#wm-tiles').css({
			'width': (colsTiled + 2) * wmW * param.scale,
			'height': (rowsTiled + 2) * wmH * param.scale,
			'left': 0,
			'top': 0,
		});

		$('#wm-tiles').empty();
		var $imgs = $();

		for (var i = 0; i < colsTiled * rowsTiled; i++) {
			// console.log(wmW * param.scale);
			var img = $('<img/>');
			img.attr({
				'src': $('#wm__img').attr('src'),
				'class': 'wm__tile'
			});
			img.css({
				'display': 'block',
				'width': wmW * param.scale,
				'height': wmH * param.scale,
				'margin-right': param.vMargin,
				'margin-bottom': param.hMargin,
				'float': 'left'
			});
			img.appendTo($('#wm-tiles'));
		}
		$imgs.appendTo($('#wm-tiles'));
		$('#wm-tiles').css('opacity', param.currOpacity);
		refreshMarginVal();
	}

	// обработчик кнопок изменения полей
	function onChangeMargin(e) {
		e.preventDefault();
		switch (e.target.id) {
			case 'h-margin-plus':
				param.vMargin = param.vMargin + param.scale;
				break;
			case 'v-margin-plus':
				param.hMargin = param.hMargin + param.scale;
				break;
			case 'h-margin-minus':
				param.vMargin = param.vMargin - param.scale;
				break;
			case 'v-margin-minus':
				param.hMargin = param.hMargin - param.scale;
				break
		}
		refreshMarginVal();
	}

	// обновление инпутов полей
	function refreshMarginVal() {
		$vMarginVal.val(parseInt(param.hMargin));
		$hMarginVal.val(parseInt(param.vMargin));
		$lineHMargin.height(param.vMargin);
		$lineVMargin.width(param.hMargin);
		$('#wm-tiles img').css({
			'marginRight': param.hMargin * param.scale,
			'marginBottom': param.vMargin * param.scale,
		});
	}

	// замостить
	function tile(e) {
		e.preventDefault();
		if (!images.checkUploadImg()) return;
		$('.controls__switch-group-but').removeClass('active');
		$(this).addClass('active');
		$('#mode').val('tile');
		$('#one').hide();
		$('#four').show();
		$wm.css('left', -9999);
		$('#wm-tiles-work').show();
		$('.four-watermark__col-link').addClass('disabled');
	}

	// размостить
	function untile(e) {
		e.preventDefault();
		if (!images.checkUploadImg()) return;
		$('.controls__switch-group-but').removeClass('active');
		$(this).addClass('active');
		$('#mode').val('untail');
		$('#four').hide();
		$('#one').show();
		$('#wm-tiles-work').hide();
		$wm.css('left', param.currPos.left);
		$('.four-watermark__col-link').removeClass('disabled');
	}

	// обработчик смены прозрачности
	function onOpacityChange(e, ui) {
		images.checkUploadImg();
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
		if (!images.checkUploadImg()) return;
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
				param.currPos.left = param.fixedPositions.lt.left;
				param.currPos.top = param.fixedPositions.lt.top;
				break
			case 'ct':
				param.currPos.left = param.fixedPositions.ct.left;
				param.currPos.top = param.fixedPositions.ct.top;
				break
			case 'rt':
				param.currPos.left = param.fixedPositions.rt.left;
				param.currPos.top = param.fixedPositions.rt.top;
				break
			case 'lm':
				param.currPos.left = param.fixedPositions.lm.left;
				param.currPos.top = param.fixedPositions.lm.top;
				break
			case 'cm':
				param.currPos.left = param.fixedPositions.cm.left;
				param.currPos.top = param.fixedPositions.cm.top;
				break
			case 'rm':
				param.currPos.left = param.fixedPositions.rm.left;
				param.currPos.top = param.fixedPositions.rm.top;
				break
			case 'lb':
				param.currPos.left = param.fixedPositions.lb.left;
				param.currPos.top = param.fixedPositions.lb.top;
				break
			case 'cb':
				param.currPos.left = param.fixedPositions.cb.left;
				param.currPos.top = param.fixedPositions.cb.top;
				break
			case 'rb':
				param.currPos.left = param.fixedPositions.rb.left;
				param.currPos.top = param.fixedPositions.rb.top;
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
		$('#wm').stop().animate({
			left: param.currPos.left * param.scale,
			top: param.currPos.top * param.scale
		}, 200);
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
		var
			width = $('#result-box').width(),
			height = $('#result-box').height();

		if (param.bgWidth >= param.bgHeight) {
			param.scale = width / param.bgWidth;
		} else {
			param.scale = height / param.bgHeight;
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
		draggable = false;
		param.currPos.left = 0;
		param.currPos.top = 0;
		param.vMargin = 0;
		param.hMargin = 0;
		refreshPosVal();
		refreshMarginVal();
		untile();
	}

	function getParams() {
		return param;
	}

	return {
		init: function() {
			initPlugins();
			addEventListeners();
			$('.preloader').hide();
		},
		setParams: setParams,
		scaleImg: scaleImg,
		getParams: getParams,
		reset: reset,
		createTiled: createTiled
	};

}());