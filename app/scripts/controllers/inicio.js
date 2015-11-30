'use strict';

/**
 * @ngdoc function
 * @name farmaciasWebApp.controller:InicioControl
 * @description
 * # InicioControl
 * Controller of the farmaciasWebApp
 */
angular.module('farmaciasWebApp')
  .controller('InicioControl', ['loadImg', function (loadImg) {

	var imagenesInicio = ['banner.jpg', 'descarga_app.jpg'];	
  	loadImg.loadImgs($('.loadImg'), imagenesInicio);

  	var imgMain = ['principal_1.jpg', 'principal_3.jpg'];
  	var imagenesBarra = ['analisis_icon.png', 'consultorios_icon.png', 'opticas_icon.png'];

	function coinFlip() {
		var imagen = imgMain[Math.round(Math.random())];
		var url = 'images/' + imagen;
		document.getElementById('mainImg').style.backgroundImage = 'url(' + url + ')';

		setInterval( function () {
			var imagen2 = imgMain[Math.round(Math.random())];
			var url2 = 'images/' + imagen2;
			document.getElementById('mainImg').style.backgroundImage = 'url(' + url2 + ')';
		}, 15000);	
	}

	coinFlip();

  }]);
