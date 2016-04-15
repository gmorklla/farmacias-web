'use strict';

/**
 * @ngdoc service
 * @name farmaciasWebApp.banner
 * @description: obtiene lista de videos de youtube
 * # banner
 * Service in the farmaciasWebApp.
 */
angular.module('farmaciasWebApp')
    .service('banner', function() {
        var ads = {
            "ads": [{
                "banner": "banner-analgesia",
                "url": "#/lo-nuevo",
                "target": "_self"
            }, {
                "banner": "banner-buen-lunes",
                "url": "#/lo-nuevo",
                "target": "_self"
            }, {
                "banner": "banner-cndee",
                "url": "http://serfelizsisepuede.com.mx/#/inicio",
                "target": "_blank"
            }, {
                "banner": "banner-simiaventuras",
                "url": "https://play.google.com/store/apps/details?id=com.farmaciassimilares.simiaventuras",
                "target": "_blank"
            }, {
                "banner": "banner-simi-tv-radio",
                "url": "http://www.siminforma.com.mx/",
                "target": "_blank"
            }, {
                "banner": "banner-simicarrera",
                "url": "http://www.simicarreras.com.mx/",
                "target": "_blank"
            }, {
                "banner": "nuevos_genericos",
                "url": "#/lo-nuevo",
                "target": "_self"
            }]
        }
        this.random = function() {
            var numR = Math.floor( (Math.random() * (ads.ads.length) ) );
            var elemento = document.getElementById('banner');
            var elementoURL = document.getElementById('bannerLink');
            var img = "images/" + ads.ads[numR].banner + ".jpg";
            elemento.src = img;
            elementoURL.href = ads.ads[numR].url;
            elementoURL.setAttribute('target', ads.ads[numR].target);
        };

    });
