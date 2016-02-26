'use strict';

/**
 * @ngdoc filter
 * @name farmaciasWebApp.filter:dateFilter
 * @function
 * @description
 * # dateFilter
 * Filter in the farmaciasWebApp.
 */
angular.module('farmaciasWebApp')
    .filter('dateFilter', function() {
        return function(fecha) {
            var x = fecha.indexOf("(") + 1;
            var y = fecha.indexOf(")");
            var res = parseInt(fecha.substring(x, y));
            var d = new Date(res);
            return d;
        };
    })
    .filter('capitaliza',['prettyUrlSpc', function(prettyUrlSpc) {
        return function(texto) {
            var textF = prettyUrlSpc.deconfig(texto);
            return textF.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
        };
    }])    
    .filter('dateFilterFormat', function() {
        return function(fecha) {
            var x = fecha.indexOf("(") + 1;
            var y = fecha.indexOf(")");
            var res = parseInt(fecha.substring(x, y));
            var d = new Date(res);
            var options = {
                weekday: "long",
                year: "numeric",
                month: "short",
                day: "numeric"
            };
            return d.toLocaleDateString("es-ES", options);
        };
    });    
