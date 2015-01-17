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
        <h2>Управление</h2>
        <div class="ctrl-images">
            <h3>Исходное изображение</h3>
            <input type="file" class="ctrl__input" id="img-source">
            <h3>Водяной знак</h3>
            <input type="file" class="ctrl__input" id="img-watermark">

        </div>
        <div class="opacity">
          <h3>Прозрачность</h3>
          <input type="range" id="opacity"/>
          <p id="opacity-val">0.5</p>
        </div>
        <div class="position cf">
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
          <div class="pos__adjust">
            <label class="pos__row cf">X
                  <input class="pos__spin" name="value" id="xVal">
            </label>
            <label class="pos__row cf">Y
                  <input class="pos__spin" name="value" id="yVal">
            </label>
          </div>
        <div class="buttons cf">
          
          <input class="button" type="submit" value="Загрузить">
        </div>
        </form>
      </div>
    </div>
  </div>
  <script src="js/jquery-1.11.0.min.js"></script>
  <script src="https://code.jquery.com/ui/1.11.1/jquery-ui.min.js"></script>
  <script src="js/watermark.js"></script>
  <script src="js/images.js"></script>
  <script src="js/main.js"></script>
</body>
</html>
