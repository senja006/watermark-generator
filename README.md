<h2>Сервис генерации водяных знаков</h2>
<h3> Домашнее задание №3</h3>
<a href="http://loftschool.ru">Школа веб-разработки <b>Loftschool</p></a>

<img src="http://wmgen.danratnikov.ru/img/watermark3.jpg" style="width: 600px" />
<p><a href="http://wmgen.danratnikov.ru/">http://wmgen.danratnikov.ru/</a></p>
<h3><i>Что получилось</i></h3>
<p>Самый лучший в настоящее время сервис генерации водяных знаков. Его отличетельной особенностями являются:</p>
<ul>
	<li>Умопомрачительный дизайн</li>
	<li>Невероятная скорость работы</li>
	<li>Богатейший функционал</li>
	<li>Удобный интерфейс</li>
	<li>Стабильность </li>
</ul>
<p>К этому можно добавить стопроцентную конфиденциальность - загружаемые и выгружаемые изображения не хранятся на нашем сервере и никуда не отправляются</p>
<p>Сервис позволяет накладывать два изображения произвольного формата с сохранение, либо изменением прозрачности</p>
<h3><i>Над проектом работали:</i></h3>
<ul>
  <li>Сергей '<a href="https://github.com/senja006/">senja006</a>' Яркевич - <code>Тимлид</code>, <code>PHP</code>, <code>JavaScript</code></li>
  <li>Алексей '<a href="https://github.com/freewayspb">freewayspb</a>' Чырва  - <code>Верстка</code>, <code>JavaScript</code>, <code>PHP</code></li>
  <li>Данил '<a href="https://github.com/danratnikov">danratnikov</a>' Ратников  - <code>JavaScript</code></li>
</ul>
<h3><i>Реализованный функционал:</i></h3>
<ul>
	<li>Загрузка исходных изображений произвольного формата</li>
	<li>Два режима работы с изображениями:</li>
	<br/>
	<ul>
			<li>Работа с одиночным водяным знаком</li>
			<li>Режим <code>"Замостить"</code> - повторение водяного знака по всему исходному изображению</li>
	</ul>
	<li>Изменение прозрачности в обоих режимах работы</li>
	<li>Изменение позиции одиночного водяного знака двумя методами:</li>
	<br/>
	<ul>
			<li>Метод <code>drag'n'drop</code></li>
			<li>Нажатие соответствующих элементов интерфейса</li>
	</ul>
	<li>Изменение отступов между водяными знаками в режиме <code>"Замостить"</code> </li>
	<li>Возможность смены языка интерфейса <code>Русский</code> - <code>English</code> </li>
	<li>Возможность поделится ссылкой в социальных сетях <code>Facebook</code>, <code>Twitter</code>, <code>ВКонтакте</code></li>
	<li>Печать готового изображения на отдельном листе</li>
</ul>

<h3><i>Использованые инструменты:</i></h3>
<ul>
	<li>Редактор кода <a href="http://www.sublimetext.com/2">Sublime Text 2</a></li>
	<li>Графический редактор <a href="http://www.adobe.com/ru/products/photoshop.html">Adobe Photoshop CC 2014</a></li>
	<li>Система контроля версий <a href="http://github.com">GitHub.com</a></li>
	<li>HTML препроцессор <a href="http://jade-lang.com">Jade</a></li>
	<li>CSS препроцессор <a href="http://lesscss.org/">Less</a></li>
	<li>Потоковый сборщик проекта  <a href="http://gulpjs.com">Gulp</a> и его плагины:</li>
		<ul>
			<li><a href="https://www.npmjs.com/package/gulp-jade">gulp-jade</a></li>
			<li><a href="https://www.npmjs.com/package/gulp-less">gulp-less</a></li>
			<li><a href="https://www.npmjs.com/package/gulp-uglify">gulp-uglify</a></li>
			<li><a href="https://www.npmjs.com/package/gulp-minify-css">gulp-minify-css</a></li>
			<li><a href="https://www.npmjs.com/package/gulp-notify">gulp-notify</a></li>
			<li><a href="https://www.npmjs.com/package/gulp-concat">gulp-concat</a></li>
			<li><a href="https://www.npmjs.com/package/gulp-connect">gulp-connect</a></li>
			<li><a href="https://www.npmjs.com/package/gulp-imagemin">gulp-imagemin</a></li>
			<li><a href="https://www.npmjs.com/package/gulp-rename">gulp-rename</a></li>
			<li><a href="https://www.npmjs.com/package/gulp-clean">gulp-clean</a></li>
			<li><a href="https://www.npmjs.com/package/gulp-autoprefixer">gulp-autoprefixer</a></li>
	</ul>
	<li>Веб-сервер <a href="http://apache.org/"> Apache 2.2</a></li>
	<li>Серверные скрипты написаны на  <a href="http://php.net/">PHP 5.4</a></li>
</ul>

<h3><i>Установка</i></h3>
<p>Для установки проекта требуется: <a href="http://nodejs.org/">node.js</a>,  <a href="http://nodejs.org/">Node Package Menager(npm)</a>,  Веб-сервер <a href="http://apache.org/"> Apache 2.2</a> и модуль PHP 5.4</p>
<ul>
			<li>Клонировать репозиторий<br/><br/><code>git clone https://github.com/senja006/watermark-generator.git</code></li>
			<br/>
			<li>Перейти в директорию <code>/watermark-generator</code><br/><br/><code>cd watermark-generator</code></li>
			<br/>
			<li>Выполнить установку необходимых npm-пакетов<br/><br/><code>npm install</code><br/></li>
			<br/>
			<li>Собрать проект<br/><br/><code>gulp build</code><br/></li>
			<br/>
			<li>Запустить веб сервер в директории <code>/app</code><br/></li>
	</ul>

<h3><i>Разработка</i></h3>
<p>При разработке использовался потоковый сборщик проектов <code>Gulp</code>. Все рабочие файлы находятся в директории <code>/_dev</code>. проект собирается в директории <code>/app</code>. При помощи команды 
<code>gulp build</code> выполняются: компиляция jade и less файлов их минификация и конкатенация в файлы  <code>/app/js/index.html</code> и <code>/app/css/style.min.css</code> минификация javascript модулей и плагинов JQuery, а также их конкатенация в отдельные файлы <code>app/js/main.min.js</code> и <code>/app/js/plugins.min.js</code>. Оптимизация изображений производится плагином <code>gulp-imagemin</code> c дальнейшим копированием в директорию <code>/app/img</code>. Шрифты копируются в папку <code>/app/fonts</code>. Все серверные скрипты находятся в директории <code>/_dev/</code></p>
<p>Непосредственно для изменения кода необходимо выполнить:<code>gulp</code>,
без параметров, при этом запустятся задачи по-умолчанию. Задача <code>'watch'</code>
будет следить за любым изменением в директории <code>/_dev/</code> и производить неоходимые изменения в <code>/app</code></p>
<h3><i>Сторонние библиотеки</i></h3>
<ul>
	<li><a href="http://jquery.com">JQuery</a></li>
	<li><a href="http://plugins.jquery.com/blueimp-file-upload-jquery-ui/">JQueryFileUploader</a></li>
	<li><a href="http://jqueryui.com/draggable/">JQuery UI Draggable</a></li>
	<li><a href="http://jqueryui.com/slider/">JQuery UI Slider</a></li>
	<li><a href="http://plugins.jquery.com/cookie/">JQuery Cookie</a></li>
</ul>

<p><i>Отдельное спасибо Вове <a href="https://github.com/wowua">wowua</a> Сабанцеву за предоставленный стартовый <a href="https://github.com/wowua/_blank-template">шаблон</a>.</i><p>
