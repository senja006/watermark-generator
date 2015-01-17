/**
 * Created by FreeWay on 15.01.15.
 */
$(document).ready(function(){
    $( "#opacity" ).slider({
        range: "min",
        min: 50
        //value : 0,//Значение, которое будет выставлено слайдеру при загрузке
        //min : -150,// Минимально возможное значение на ползунке
        //max : 150,//Максимально возможное значение на ползунке
        //step : 1,//Шаг, с которым будет двигаться ползунок
        //create: function( event, ui ) {
        //    val = $( "#slider" ).slider("value");//При создании слайдера, получаем его значение в перемен. val
        //    $( "#contentSlider" ).html( val );//Заполняем этим значением элемент с id contentSlider
        //},
        //slide: function( event, ui ) {
        //    $( "#contentSlider" ).html( ui.value );//При изменении значения ползунка заполняем элемент с id contentSlider
        //
        //}
    });
});
