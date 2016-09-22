'use strict';

/**
 * @ngdoc service
 * @name farmaciasWebApp.fbShare
 * @description: obtiene lista de videos de youtube
 * # fbShare
 * Service in the farmaciasWebApp.
 */
angular.module('farmaciasWebApp')
    .service('fbShare', ['$window', 'prettyUrlSpc', function($window, prettyUrlSpc) {       
        this.fbSetup = function() {
            // Funcion para compartir a través de fb
            $window.fbAsyncInit = function() {
                FB.init({
                    cookie: true, // enable cookies to allow the server to access 
                    appId: '398798393664417',
                    xfbml: true,
                    version: 'v2.5'
                });

                console.info('FB!');

            };            
            // Load the SDK asynchronously
            (function(d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s);
                js.id = id;
                js.src = "//connect.facebook.net/es_LA/all.js";
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));            
        };
        this.compartir = function (datos) {
            var url = 'https://farmaciasdesimilares.com/#!/siminotas/' + prettyUrlSpc.prettyUrl(datos.url);
            var img = 'https://farmaciasdesimilares.com/images/siminotas/' + prettyUrlSpc.prettyUrl(datos.url) + '.jpg';
            FB.ui({
                method: 'feed',
                name: datos.titulo + ' ' + datos.subtitulo,
                caption: 'Siminotas',
                description: datos.shareText,
                link: url,
                picture: img
            }, 
            function(response) {
                console.log('publishStory response: ', response);
            });
            return false;            
        }

    }]);
