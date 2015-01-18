<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="UTF-8">
    <title>Watermark generator</title>
    <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
    <link rel="icon" href="/favicon.ico" type="image/x-icon" />
    <link rel="stylesheet" href="css/main.css">
  </head>
  <body>
    <div class="wrapper">
      <h1>Генератор водяных знаков</h1>
      <div class="container">
        <div class="result" id="result">
          <div id="bg__wrapper">
            <!-- <img id="bg__img" src="img/bg-source-simple.png"/> -->
          </div>
          <div class="drag" id="watermark">
            <!-- <img id="drag__img" src="img/watermark-simple.png"/> -->
          </div>
        </div>
      </div>
      <div class="controls">
        <form id="form-control" method="post" enctype="multipart/form-data">
          <h2>Настройки</h2>
          <div class="source">
            <div class="ctrl-images block">
              <h3>Исходное изображение</h3>
              <input type="file" class="ctrl__input" id="img-source" accept="image/*" name="file_bg">
              <h3>Водяной знак</h3>
              <input type="file" class="ctrl__input" id="img-watermark" accept="image/*" name="file_wm">
            </div>
          </div>
          <div class="options">
            <div class="position cf block">
              <h3>Положение</h3>
              <div class="pos__pad">
                <ul class="position__buttons cf">
                  <li class="position__btn"><a href="" class="position__b-link" id="lt"></a></li>
                  <li class="position__btn"><a href="" class="position__b-link" id="ct"></a></li>
                  <li class="position__btn"><a href="" class="position__b-link" id="rt"></a></li>
                  <li class="position__btn"><a href="" class="position__b-link" id="lm"></a></li>
                  <li class="position__btn"><a href="" class="position__b-link" id="cm"></a></li>
                  <li class="position__btn"><a href="" class="position__b-link" id="rm"></a></li>
                  <li class="position__btn"><a href="" class="position__b-link" id="lb"></a></li>
                  <li class="position__btn"><a href="" class="position__b-link" id="cb"></a></li>
                  <li class="position__btn"><a href="" class="position__b-link" id="rb"></a></li>
                </ul>
              </div>
              <div class="pos__adjust cf">
                <label class="pos__row cf">X
                  <input class="pos__spin" name="value" id="xVal" name="file_bg">
                </label>
                <label class="pos__row cf">Y
                  <input class="pos__spin" name="value" id="yVal" name="file_wm">
                </label>
              </div>
            </div>
            <div class="opacity block">
              <h3>Прозрачность</h3>
              <input type="range" id="opacity" name="opacity"/>
              <p id="opacity-val">0.5</p>
            </div>
            <div class="buttons cf block">
              <input class="control__btn control__btn__clear" type="button" value="Сброс" id="but-reset">
              <input class="control__btn control__btn__send" type="submit" value="Скачать" id="but-send">
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  <div class="service">
    <ul class="list">
      <li class="list__item list__item__rus"></li>
      <li class="list__item list__item__eng"></li>
    </ul>
    <ul class="list">
      <li class="list__item list__item__fb"></li>
      <li class="list__item list__item__tw"></li>
      <li class="list__item list__item__vk"></li>
    </ul>
  </div>
  <div class="modal">
    <div class="modal-error"></div>
  </div>
  <script src="js/jquery-1.11.0.min.js"></script>
  <script src="https://code.jquery.com/ui/1.11.1/jquery-ui.min.js"></script>
  <script src="js/watermark.js"></script>
  <script src="js/images.js"></script>
  <script src="js/main.js"></script>
</body>
</html>

