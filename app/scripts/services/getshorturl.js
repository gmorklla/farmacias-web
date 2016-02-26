'use strict';

/**
 * @ngdoc service
 * @name farmaciasWebApp.gerShortUrl
 * @description
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
