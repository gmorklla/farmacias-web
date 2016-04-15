'use strict';

/**
 * @ngdoc service
 * @name farmaciasWebApp.loadImg
 * @description: carga imágenes
 * # loadImg
 * Service in the farmaciasWebApp.
 */
angular.module('farmaciasWebApp')
    .service('loadImg', function() {
        this.loadImgs = function(places, imagenes) {
            $(places, imagenes).each(function(i, ele) {
                var downloadingImage = new Image();
                var imgHeight;
                downloadingImage.onload = function() {
                    $(ele).attr('src', this.src);
                    imgHeight = $(ele).height() + 'px';
                    $(ele).parent().parent().parent().parent().css({
                        'marginBottom': '5px',
                        'height': imgHeight
                    });
                    $(ele).parent().parent().siblings().css('display', 'none');
                };
                downloadingImage.src = "images/" + imagenes[i];
                $(ele).css('marginLeft', 0);
            });
        };
    });
