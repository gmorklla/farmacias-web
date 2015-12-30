'use strict';

/**
 * @ngdoc function
 * @name farmaciasWebApp.controller:LocalizaCtrl
 * @description
 * # LocalizaCtrl
 * Controller of the farmaciasWebApp
 */
angular.module('farmaciasWebApp')
	.controller('localizaCtrl', ['MapSrv', 'loadData', '$scope', '$filter', function(MapSrv, loadData, $scope, $filter) {

		var directionsDisplay;
		var directionsService = new google.maps.DirectionsService();
		var map;
		var infoWindow;
		var service;
		var markers = [];
		var usuario;
		var geocoder = new google.maps.Geocoder();

		$scope.init = function(lat, lng, zoom) {

			directionsDisplay = new google.maps.DirectionsRenderer({
				suppressMarkers: true
			});
			var myLatlng = new google.maps.LatLng(lat, lng);
			usuario = myLatlng;

			var datosGeo = {
				'latitude': lat,
				'longitude': lng
			};

			$scope.usuarioMarker = new google.maps.LatLng(lat, lng);

			var datos = loadData.httpReq('data/locationMin.json');

			datos.then(function(datos) {
				$scope.datosUbicacion = datos.data;
				$scope.obtenDistancias(datosGeo.latitude, datosGeo.longitude, $scope.datosUbicacion);
			}, function(e) {
				console.log(e);
			});

			var markers = [];
			map = new google.maps.Map(document.getElementById('map'), {
				center: myLatlng,
				zoom: zoom,
				maxZoom: 16,
				mapTypeControlOptions: {
					mapTypeIds: []
				},
				panControl: false,
				zoomControl: true,
				zoomControlOptions: {
					style: google.maps.ZoomControlStyle.LARGE,
					position: google.maps.ControlPosition.RIGHT_CENTER
				},
				styles: [{
					"featureType": "landscape",
					"stylers": [{
						visibility: 'simplified'
					}, {
						"hue": "#FFA800"
					}, {
						"saturation": 0
					}, {
						"lightness": 0
					}, {
						"gamma": 1
					}]
				}, {
					"featureType": "road.highway",
					"stylers": [{
						"hue": "#53FF00"
					}, {
						"saturation": -73
					}, {
						"lightness": 40
					}, {
						"gamma": 1
					}]
				}, {
					"featureType": "road.arterial",
					"stylers": [{
						"hue": "#FBFF00"
					}, {
						"saturation": 0
					}, {
						"lightness": 0
					}, {
						"gamma": 1
					}]
				}, {
					"featureType": "road.local",
					"stylers": [{
						"hue": "#00FFFD"
					}, {
						"saturation": 0
					}, {
						"lightness": 30
					}, {
						"gamma": 1
					}]
				}, {
					"featureType": "water",
					"stylers": [{
						"hue": "#00BFFF"
					}, {
						"saturation": 6
					}, {
						"lightness": 8
					}, {
						"gamma": 1
					}]
				}, {
					"featureType": "poi",
					"stylers": [{
						"hue": "#679714"
					}, {
						"saturation": 33.4
					}, {
						"lightness": -25.4
					}, {
						"gamma": 1
					}]
				}]
			});

			directionsDisplay.setMap(map);
			directionsDisplay.setPanel(document.getElementById('right-panel'));
			var input = (document.getElementById('searchId'));
			var opcionesMapa = (document.getElementById('opcionesMapa'));
			map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
			map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(opcionesMapa);

			var autocomplete = new google.maps.places.Autocomplete(input);
			autocomplete.bindTo('bounds', map);
			var componentRestrictions = {
				country: 'mx'
			};
			autocomplete.setComponentRestrictions(componentRestrictions);

			google.maps.event.addListener(autocomplete, 'place_changed', function() {
				var place = autocomplete.getPlace();
				if (place.geometry) {
					// For each place, get the icon, place name, and location.
					markers = [];
					// If the place has a geometry, then present it on a map.
					if (place.geometry.viewport) {
						map.fitBounds(place.geometry.viewport);
					} else {
						map.setCenter(place.geometry.location);
						map.setZoom(9);
					}
					marker.setIcon(({
						url: 'images/userLocIcon.png'
					}));
					marker.setPosition(place.geometry.location);
					$scope.usuarioMarker = place.geometry.location;
					marker.setVisible(true);

					markers.push(marker);

					$scope.obtenDistancias(map.getCenter().lat(), map.getCenter().lng(), $scope.datosUbicacion);
					$scope.$digest();

				} else {
					markers = [];
					deleteMarkers();
					var address = document.getElementById('searchId').value;
					geocoder.geocode({
						'address': address
					}, function(results, status) {
						if (status === google.maps.GeocoderStatus.OK) {
							map.setCenter(results[0].geometry.location);
							marker.setIcon( /** @type {google.maps.Icon} */ ({
								url: 'images/userLocIcon.png'
							}));
							marker.setPosition(results[0].geometry.location);
							$scope.usuarioMarker = place.geometry.location;
							marker.setVisible(true);
							markers.push(marker);

							$scope.obtenDistancias(map.getCenter().lat(), map.getCenter().lng(), $scope.datosUbicacion);
							$scope.$digest();

						} else {
							alert('Geocode was not successful for the following reason: ' + status);
						}
					});
				}

			});

			infoWindow = new google.maps.InfoWindow();
			service = new google.maps.places.PlacesService(map);
			var marker = new google.maps.Marker({
				position: myLatlng,
				map: map,
				animation: google.maps.Animation.DROP,
				draggable: true,
				title: 'Esta es tu ubicación',
				icon: 'images/userLocIcon.png',
			});
			marker.addListener('click', toggleBounce);
			markers.push(marker);

					var infowindow = new google.maps.InfoWindow({
						content: '<div class="prueba">Usted está aquí</div>'
					});
					infowindow.open(map, marker);			

			google.maps.event.addListener(marker, 'dragend', function(event) {
				$scope.obtenDistancias(event.latLng.lat(), event.latLng.lng(), $scope.datosUbicacion);
				$scope.usuarioMarker = new google.maps.LatLng(event.latLng.lat(), event.latLng.lng());
				var farmaciaMasCercana = new google.maps.LatLng($scope.distancias[0].Latitud, $scope.distancias[0].Longitud);
				$scope.ruta(farmaciaMasCercana);
				map.setCenter($scope.usuarioMarker);
				$scope.puntoDeInteres = farmaciaMasCercana;
			});

			function toggleBounce() {
				if (marker.getAnimation() !== null) {
					marker.setAnimation(null);
				} else {
					marker.setAnimation(google.maps.Animation.BOUNCE);
				}				
			}

			$('#mapaFinal').css('opacity', 1);
			$('#mapaFinal').addClass('pt-page-moveFromTopFade');

		};

		$scope.selectedMode = 'DRIVING';

		$scope.ruta = function(destino) {
			var origen = usuario;
			if ($scope.usuarioMarker) {
				origen = $scope.usuarioMarker;
			}
			var destinoF = new google.maps.LatLng(destino.lat(), destino.lng());
			var request = {
				origin: origen,
				destination: destinoF,
				travelMode: google.maps.TravelMode[$scope.selectedMode]
			};
			directionsService.route(request, function(response, status) {
				if (status === google.maps.DirectionsStatus.OK) {
					directionsDisplay.setOptions({
						preserveViewport: true
					});
					directionsDisplay.setDirections(response);
					$('#right-panel').css('display', 'block');
					$('#right-panel').addClass('pt-page-moveFromTopFade');
				}
			});

			/*			google.maps.event.addListener(directionsDisplay, 'directions_changed', function() {
							console.log('Callback');
						});*/

		};

		$scope.obtenDistancias = function(lat, lng, data) {
			deleteMarkers();
			$scope.distancias = [];
			for (var i = 0; i < data.length; i++) {
				var rutaMob = "http://maps.google.com/maps?saddr=" + usuario.lat() + "," + usuario.lng() + "&daddr=" + data[i].LATITUD + "," + data[i].LONGITUD;
				var distancia = MapSrv.getDistance(lat, lng, data[i].LATITUD, data[i].LONGITUD);
				$scope.distancias.push({
					"Latitud": data[i].LATITUD,
					"Longitud": data[i].LONGITUD,
					"Nombre": data[i].NOMBREL,
					"Distancia": distancia,
					"Ruta": rutaMob
				});
			}
			$scope.distancias = $filter('orderBy')($scope.distancias, 'Distancia');
			$scope.distancias = $filter('limitTo')($scope.distancias, $scope.inputUnidades);

			for (var j = 0; j < $scope.distancias.length; j++) {

				var myLatlng = new google.maps.LatLng($scope.distancias[j].Latitud, $scope.distancias[j].Longitud);

				var rutaMob = "http://maps.google.com/maps?saddr=" + usuario.lat() + "," + usuario.lng() + "&daddr=" + myLatlng.lat() + "," + myLatlng.lng();

				/*				var myinfowindow = new google.maps.InfoWindow({
									content: "<span>DISTANCIA:</span> " + ($scope.distancias[j].Distancia).toFixed(2) + " km </div> <div class='direccion visible-xs'><hr><p><a href='" + rutaMob + "'>VER RUTA EN GOOGLE MAPS</a></p></div>"
								});*/

				var infowindow;

				var marker = new google.maps.Marker({
					position: myLatlng,
					map: map,
					icon: 'images/icon.png',
					animation: google.maps.Animation.DROP,
					title: $scope.distancias[j].Nombre,
					distancia: ($scope.distancias[j].Distancia).toFixed(2)
				});

				google.maps.event.addListener(marker, 'click', function() {
					if (infowindow) infowindow.close();
					infowindow = new google.maps.InfoWindow({
						content: "<div class='direccion'><span>UNIDAD:</span> " + this.title + " <br><span>DISTANCIA:</span> " + this.distancia + " km </div> <div class='direccion visible-xs'><hr><p><a href='" + rutaMob + "'>VER RUTA EN GOOGLE MAPS</a></p></div>"
					});
					$scope.ruta(this.position);
					$scope.puntoDeInteres = this.position;
					infowindow.open(map, this);
				});
				markers.push(marker);
			}
		};

		$scope.codeLatLng = function(latlng, info) {
			geocoder.geocode({
				'location': latlng
			}, function(results, status) {
				if (status === google.maps.GeocoderStatus.OK) {
					$scope.direccion = results[1].formatted_address;
					var nuevoContent = "<div class='direccion'><span>DIRECCIÓN:</span> " + $scope.direccion + "</br>" + info.content;
					setTimeout(info.setContent(nuevoContent), 50);
				} else {
					window.alert('Geocoder failed due to: ' + status);
				}
			});
		};

		// Sets the map on all markers in the array.
		function setAllMap(map) {
			for (var i = 0; i < markers.length; i++) {
				markers[i].setMap(map);
			}
		}

		// Removes the markers from the map, but keeps them in the array.
		function clearMarkers() {
			setAllMap(null);
		}

		function deleteMarkers() {
			clearMarkers();
			markers = [];
		}

		$scope.send = function() {
			alert($scope.place.name + ' : ' + $scope.place.lat + ', ' + $scope.place.lng);
		};

		function muestraPos(pos) {
			var areaLat = pos.coords.latitude,
				areaLng = pos.coords.longitude,
				areaZoom = 14;
			google.maps.event.addDomListener(window, 'load', $scope.init(areaLat, areaLng, areaZoom));
		}

		// Try HTML5 geolocation
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(muestraPos);
		}

		$scope.inputUnidades = 10;

		$scope.$watch('inputUnidades', function() {
			$scope.obtenDistancias($scope.usuarioMarker.lat(), $scope.usuarioMarker.lng(), $scope.datosUbicacion);
		});

	}]);