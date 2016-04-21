'use strict';

/**
 * @ngdoc function
 * @name farmaciasWebApp.controller:InicioControl
 * @description
 * # InicioControl
 * Controller of the farmaciasWebApp
 */
angular.module('farmaciasWebApp')
	.controller('InicioCtrl', ['loadImg', function(loadImg) {

		var imagenesInicio = ['banner-main-1.jpg', 'banner-main-2.jpg'];
		loadImg.loadImgs($('.loadImg'), imagenesInicio);

		var imgMain = ['principal_1.jpg', 'principal_3.jpg'];
		// Muestra imagen principal, alternándola de manera aleatoria
		function coinFlip() {
			var imagen = imgMain[Math.round(Math.random())];
			var url = 'images/' + imagen;
			document.getElementById('mainImg').style.backgroundImage = 'url(' + url + ')';

			/*setInterval(function() {
				var imagen2 = imgMain[Math.round(Math.random())];
				var url2 = 'images/' + imagen2;
				if(document.getElementById('mainImg')){
					document.getElementById('mainImg').style.backgroundImage = 'url(' + url2 + ')';
				}
			}, 15000);*/
		}

		coinFlip();

	}]);