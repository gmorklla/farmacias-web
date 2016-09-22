'use strict';

/**
 * @ngdoc function
 * @name farmaciasWebApp.controller:InicioControl
 * @description
 * # InicioControl
 * Controller of the farmaciasWebApp
 */
angular.module('farmaciasWebApp')
	.controller('InicioCtrl', ['loadImg', 'deviceDetector', '$scope', '$window', function(loadImg, deviceDetector, $scope, $window) {

		var imagenesInicio = ['banner-main-catalogo.jpg', 'banner-main-2.jpg'];
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

		$scope.mandaEvento = function () {
            $window.ga('send', {
              hitType: 'event',
              eventCategory: 'Banner Compra, Registra y Gana',
              eventAction: 'Click',
              eventLabel: 'Ir a compra, registra y gana'
            });
            if(deviceDetector.isMobile()){
                window.open("https://farmaciasdesimilares.com/PromoOlimpiadas2016/Registra.aspx");
            }           		
		}

	}]);