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
				eng: "Options"
			},
			'#title-source-bg': {
				rus: "Исходное изображение",
				eng: "Source image"
			},
			'#title-source-wm': {
				rus: "Водяной знак",
				eng: "Watermark image"
			},
			'#opacity-field': {
				rus: "Прозрачность",
				eng: "Opacity"
			},
			'#title-position': {
				rus: "Положение",
				eng: "Position"
			},
			'#but-reset': {
				rus: "Сброс",
				eng: "Clear"
			},
			'#but-send': {
				rus: "Загрузить",
				eng: "Download"
			},
			'input[name=name-main]': {
				rus: "Загрузите изображение",
				eng: "Upload image"
			},
			'input[name=name-watermark]': {
				rus: "Загрузите изображение",
				eng: "Upload image"
			}
		},

		currLang = 'rus';

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
		console.log(language);
		setLang(language);
	}

	function setLang(language) {
		language = language || 'eng';
		currLang = language;
		for (var selector in lang) {
			if (selector.substr(0, 5) === 'input') {
				$(selector).attr('placeholder', lang[selector][language]);
			}
			$(selector).text(lang[selector][language]);
		}
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
		getLang: getLang
	}
}());