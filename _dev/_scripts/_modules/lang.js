var lang = (function() {

	// словарь
	// ключ - селектор элемента,
	// значение - языковой элемент,
	// для placeholder селектор должен начинатся с 'input'
	var
		lang = {
			'.result__title': {
				rus: "Генератор водяных знаков",
				eng: "Watermark generator"
			},
			'.controls__title': {
				rus: "Настройки",
				eng: "Settings"
			},
			'#title-source-bg': {
				rus: "Исходное изображение",
				eng: "Original image"
			},
			'#title-source-wm': {
				rus: "Водяной знак",
				eng: "Watermark"
			},
			'#opacity-field': {
				rus: "Прозрачность",
				eng: "Transparency"
			},
			'#title-position': {
				rus: "Положение",
				eng: "Place"
			},
			'#but-reset': {
				rus: "Сброс",
				eng: "Reset"
			},
			'#but-send': {
				rus: "Скачать",
				eng: "Download"
			},
			'input[name=name-main]': {
				rus: "Загрузите исходное изображение",
				eng: "Upload original image"
			},
			'input[name=name-watermark]': {
				rus: "Загрузите водяной знак",
				eng: "Upload watermark"
			},
			'.copy__p': {
				rus: "2015, Это мой сайт, пожалуйста, не копируйте и не воруйте его",
				eng: "2015, This is my site, please do not copy or steal"
			},
			'--needfile': {
				rus: "Вы должны загрузить изображение",
				eng: "You must upload an image"
			},
			'--maxfilesize': {
				rus: "Максимальный размер файла ",
				eng: "Maximum file size "
			},
			'--mb': {
				rus: "Mб",
				eng: "Mb"
			},
			'--onlypicture': {
				rus: "Загрузить можно только изображение - jpg, png, gif",
				eng: "You can upload only - jpg, png, gif"
			},
			'--cantload': {
				rus: "Невозможно загрузить файл",
				eng: "Unable to upload file"
			}
			

		},
        language = $.cookie('language');
        // если не задан язык ставим Русский по умолчанию
        if (!language){
            language = 'rus';
            $.cookie('language', language, { expires: 7 });
            setLang(language);
        }
        else{
            $.cookie('name');
            setLang(language);
        }

	function addEventListeners() {
		$('[class ^= language__link]').on('click', onSwitchLang);
	}

	// переключение языка.
	// кнопка переключения языка должна иметь
	// класс, начинающийся на 'language__link'
	// и заканчиваться на <lng>, где <lng> это - это язык,
	// обозначеный в объекте lang
	function onSwitchLang(e) {
		var	language = $(this).attr('class').substr(-3);

		e.preventDefault();
        if($(this).hasClass('language__link__active')) {
        	return;
        }
		setLang(language);
        $('.error').hide();
	}

	function setLang(language) {
        $.cookie('language', language, { expires: 7 });
		currLang = language;
		for (var selector in lang) {
			if (selector.substr(0, 5) === 'input') {
				$(selector).attr('placeholder', lang[selector][language]);
			}
			if (selector.substr(0, 2) === '--') {
				continue;
			}
			$(selector).text(lang[selector][language]);
		}
		$('.language__link').removeClass('language__link__active');
        $('.language__link__' + currLang).addClass('language__link__active');
	}

	function getMsgText(msgId) {
		var message = lang['--' + msgId][currLang];

		if (!message) return 'Unkhnow Error';
		return message;
	}

	function getLang() {
		return currLang;
	}

	return {
		init: function() {
			addEventListeners();
			setLang(currLang);
		},
		setLang: setLang,
		getLang: getLang,
		getMsgText: getMsgText
	}
}());


