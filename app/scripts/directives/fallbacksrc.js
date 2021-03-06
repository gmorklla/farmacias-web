'use strict';

/**
 * @ngdoc directive
 * @name farmaciasWebApp.directive:fallbackSrc
 * @description: fallback para las imágenes que no se encuentran
 * # fallbackSrc
 */
angular.module('farmaciasWebApp')
    .directive('fallbackSrc', function() {
        var fallbackSrc = {
            link: function postLink(scope, iElement, iAttrs) {
                iElement.bind('error', function() {
                    angular.element(this).attr("src", iAttrs.fallbackSrc);
                });
            }
        }
        return fallbackSrc;
    });
