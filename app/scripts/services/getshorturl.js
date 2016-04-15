'use strict';

/**
 * @ngdoc service
 * @name farmaciasWebApp.gerShortUrl
 * @description: servicio que usa google api url shortener para recortar url que se usarán en redes sociales
 * # gerShortUrl
 * Service in the farmaciasWebApp.
 */
angular.module('farmaciasWebApp')
    .service('getShortUrl', ['$http', function($http) {
        return {
            httpReq: function(url) {
                return $http.post('https://www.googleapis.com/urlshortener/v1/url?key=AIzaSyB_JIsaXkFIo51uyD6WgifZd2f6FJDx2V8', "{'longUrl':'" + url + "'}");
            }
        };
    }]);
