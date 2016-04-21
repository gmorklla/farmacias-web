'use strict';

/**
 * @ngdoc service
 * @name farmaciasWebApp.banner
 * @description: obtiene lista de videos de youtube
 * # banner
 * Service in the farmaciasWebApp.
 */
angular.module('farmaciasWebApp')
    .service('banner', ['loadData', function(loadData) {       
        this.random = function() {
            // Usa servicio loadData para cargar los datos sobre los videos
            var datos = loadData.httpReq('data/banners.json');
            var ads;

            datos.then(function(datos) {
                ads = datos.data.banners;
                var numR = Math.floor( (Math.random() * (ads.length) ) );
                var elemento = document.getElementById('banner');
                var elementoURL = document.getElementById('bannerLink');
                var img = "images/" + ads[numR].banner + ".jpg";
                elemento.src = img;
                elementoURL.href = ads[numR].url;
                elementoURL.setAttribute('target', ads[numR].target);                
            }, function(e) {
                console.log(e);
            });
        };

    }]);
