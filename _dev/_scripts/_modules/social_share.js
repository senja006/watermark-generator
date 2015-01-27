/**
 * Created by FreeWay on 26.01.15.
 */

var socialShare = (function () {

    var
        share_window_width = 650, // Ширина окна шаринга
        share_window_height = 500, // Высота окна шаринга
        marginleft = screen.availWidth/2 - share_window_width/2,
        margintop = screen.availHeight/2 - share_window_height/ 2,
        $surl = document.location.origin,
        $stitle = document.title,
        $stext = document.description,
        $simg = "http://" + window.location.host + "/img/small-square.png";

    //Отслеживание нажатий на кнопки
    $('#vk').on('click', function () {
        Share.vk($surl,$stitle,$stext,$simg)
    });
    $('#fb').on('click', function () {
        Share.facebook($surl,$stitle,$stext,$simg)
    });
    $('#twitter').on('click', function () {
        Share.twitter($surl,$stitle)
    });

    Share = {

        vk: function (purl, ptitle, pimg, text) {
            url = 'http://vk.com/share.php?';
            url += 'url=' + encodeURIComponent(purl);
            url += '&title=' + encodeURIComponent(ptitle);
            url += '&description=' + encodeURIComponent(text);
            url += '&image=' + encodeURIComponent(pimg);
            url += '&noparse=true';
            Share.popup(url);
        },
        //odnoklassniki: function(purl, text) {
        //    url  = 'http://www.odnoklassniki.ru/dk?st.cmd=addShare&st.s=1';
        //    url += '&st.comments=' + encodeURIComponent(text);
        //    url += '&st._surl='    + encodeURIComponent(purl);
        //    Share.popup(url);
        //},
        facebook: function (purl, ptitle, pimg, text) {
            url = 'http://www.facebook.com/sharer.php?s=100';
            url += '&p[title]=' + encodeURIComponent(ptitle);
            url += '&p[summary]=' + encodeURIComponent(text);
            url += '&p[url]=' + encodeURIComponent(purl);
            url += '&p[images][0]=' + encodeURIComponent(pimg);
            Share.popup(url);
        },
        twitter: function (purl, ptitle) {
            url = 'http://twitter.com/share?';
            url += 'text=' + encodeURIComponent(ptitle) + encodeURIComponent(purl);
            url += '&url=' + encodeURIComponent(purl);
            url += '&counturl=' + encodeURIComponent(purl);
            Share.popup(url);
        },
        //mailru: function(purl, ptitle, pimg, text) {
        //    url  = 'http://connect.mail.ru/share?';
        //    url += 'url='          + encodeURIComponent(purl);
        //    url += '&title='       + encodeURIComponent(ptitle);
        //    url += '&description=' + encodeURIComponent(text);
        //    url += '&imageurl='    + encodeURIComponent(pimg);
        //    Share.popup(url)
        //},

        popup: function (url) {
            window.open(url, '_blank', 'toolbar=0,status=0,width=650,height=500,left=' + marginleft + ', top=' + margintop + '');
        }
    };
}());