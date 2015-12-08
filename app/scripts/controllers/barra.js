'use strict';

/**
 * @ngdoc function
 * @name farmaciasWebApp.controller:BarraControl
 * @description
 * # BarraControl
 * Controller of the farmaciasWebApp
 */
angular.module('farmaciasWebApp')
  .controller('BarraCtrl', ['loadImg', function (loadImg) {
  	var imagenesBarra = ['analisis_icon.png', 'consultorios_icon.png', 'opticas_icon.png'];
  	loadImg.loadImgs($('.loadImgBarra'), imagenesBarra);
  }]);
