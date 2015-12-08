'use strict';

/**
 * @ngdoc directive
 * @name farmaciasWebApp.directive:bsPopover
 * @description
 * # bsPopover
 */
angular.module('farmaciasWebApp')
  .directive('bsPopover', function () {
    return function(scope, element, attrs) {
        element.find("div[rel=popover]").popover({ placement: 'right', html: 'true', trigger: 'hover'});
    };    
  });
