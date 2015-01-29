/**
 * Created by FreeWay on 26.01.15.
 */
'use strict';

var socialShare = (function() {

    var
        shareWindowWidth = 650, // Ширина окна шаринга
        shareWindowHeight = 500, // Высота окна шаринга
        marginLeft = screen.availWidth / 2 - shareWindowWidth / 2,
        marginTop = screen.availHeight / 2 - shareWindowHeight / 2,
        serviceLink = location.origin,
        title = document.title,
        text = window.document.description,
        img = "http://" + window.location.host + "/img/small-square.png",
        url;

    function addEventListener() {
        $('#vk').on('click', vk);
        $('#fb').on('click', fb);
        $('#twitter').on('click', twitter);
    }

    function vk(e) {
        e.preventDefault();
        url = 'http://vk.com/share.php?';
        url += 'url=' + encodeURIComponent(serviceLink);
        url += '&title=' + encodeURIComponent(title);
        url += '&description=' + encodeURIComponent(text);
        url += '&image=' + encodeURIComponent(img);
        url += '&noparse=true';
        popup(url);
    }
    //odnoklassniki: function(purl, text) {
    //    url  = 'http://www.odnoklassniki.ru/dk?st.cmd=addShare&st.s=1';
    //    url += '&st.comments=' + encodeURIComponent(text);
    //    url += '&st._surl='    + encodeURIComponent(purl);
    //    Share.popup(url);
    //},
    function fb(e) {
        e.preventDefault();
        url = 'http://www.facebook.com/sharer.php?s=100';
        url += '&p[title]=' + encodeURIComponent(title);
        //url += '&p[summary]=' + encodeURIComponent(text);
        url += '&p[url]=' + encodeURIComponent(serviceLink);
        url += '&p[images][0]=' + encodeURIComponent(img);
        popup(url);
    }

    function twitter(e) {
        e.preventDefault();
        url = 'http://twitter.com/share?';
        url += 'text=' + encodeURIComponent(title);
        url += '&url=' + encodeURIComponent(serviceLink);
        url += '&counturl=' + encodeURIComponent(serviceLink);
        popup(url);
    }
    //mailru: function(purl, ptitle, pimg, text) {
        //    url  = 'http://connect.mail.ru/share?';
        //    url += 'url='          + encodeURIComponent(purl);
        //    url += '&title='       + encodeURIComponent(ptitle);
        //    url += '&description=' + encodeURIComponent(text);
        //    url += '&imageurl='    + encodeURIComponent(pimg);
        //    Share.popup(url)
        //},

    function popup(linkUrl) {
        window.open(linkUrl,'_blank','toolbar=0,status=0,width=650,height=500,left=' + marginLeft + ', top=' + marginTop);
    }

    return {
        init: function() {
            addEventListener();
        }
    };
}());