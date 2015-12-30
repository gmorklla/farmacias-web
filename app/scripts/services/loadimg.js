'use strict';

/**
 * @ngdoc service
 * @name farmaciasWebApp.loadImg
 * @description
 * # loadImg
 * Service in the farmaciasWebApp.
 */
angular.module('farmaciasWebApp')
	.service('loadImg', function() {
		this.loadImgs = function(places, imagenes) {
			$(places, imagenes).each(function(i, ele) {
				var downloadingImage = new Image();
				downloadingImage.onload = function() {
					$(ele).attr('src', this.src);
				};
				downloadingImage.src = "images/" + imagenes[i];
				$(ele).css('marginLeft', 0);
			});
		};
	});