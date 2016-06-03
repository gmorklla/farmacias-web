'use strict';

/**
 * @ngdoc function
 * @name farmaciasWebApp.controller:LocalizaCtrl
 * @description
 * # LocalizaCtrl
 * Controller of the farmaciasWebApp
 */
angular.module('farmaciasWebApp')
    .controller('localizaCtrl', ['MapSrv', 'loadLocations', 'locationSrv', 'prettyUrlSpc', 'getShortUrl', 'loadData', '$scope', '$rootScope', '$filter', '$timeout', '$stateParams', '$state', '$location', function(MapSrv, loadLocations, locationSrv, prettyUrlSpc, getShortUrl, loadData, $scope, $rootScope, $filter, $timeout, $stateParams, $state, $location) {

        var directionsDisplay;
        var directionsService;
        var map;
        var infoWindow;
        var service;
        var markers = [];
        var usuario;
        var geocoder;
        var infoBubble2;
        // Checa si ya se tiene el tipo de unidad que se quiere buscar
        if ($state.$current.name === 'localiza.url') {
            $rootScope.ubicaType = parseInt($stateParams.tipo);
        }
        // Si ya se tiene el tipo de unidad, determina el ícono que se usará, de otra manera se usa el tipo 1 y su respectivo ícono
        if ($rootScope.ubicaType) {
            $scope.tipoDeBusqueda = $rootScope.ubicaType;
            switch ($scope.tipoDeBusqueda) {
                case 1:
                    $scope.icono = 'images/farmaciasMapIcon.png';
                    break;
                case 2:
                    $scope.icono = 'images/analisisMapIcon.png';
                    break;
                case 3:
                    $scope.icono = 'images/consultoriosMapIcon.png';
                    break;
                case 4:
                    $scope.icono = 'images/dentalesMapIcon.png';
                    break;
            }
        } else {
            $scope.tipoDeBusqueda = 1;
            $scope.icono = 'images/farmaciasMapIcon.png';
        }
        // Elementos del select
        $scope.items = [
            { id: 1, label: 'Farmacias' },
            { id: 2, label: 'Análisis Clínicos' },
            { id: 3, label: 'Consultorios' },
            { id: 4, label: 'Consultorios Dentales' }
        ];

        $scope.selected = $scope.items[0];
        // Función que se llama cuando se cambia de tipo de búsqueda entre los tipos de unidad
        $scope.cambiaBusqueda = function(tipo) {
            $scope.horas.value1 = false;
            if (tipo) {
                $scope.tipoDeBusqueda = tipo;
            } else {
                $scope.tipoDeBusqueda = $scope.selected.id;
            }

            switch ($scope.tipoDeBusqueda) {
                case 1:
                    $scope.icono = 'images/farmaciasMapIcon.png';
                    if ($rootScope.locationData.farmacias) {
                        $scope.getInfo(1);
                    } else {
                        $scope.getInfo(0);
                    }
                    break;
                case 2:
                    $scope.icono = 'images/analisisMapIcon.png';
                    if ($rootScope.locationData.analisis) {
                        $scope.getInfo(1);
                    } else {
                        $scope.getInfo(0);
                    }
                    break;
                case 3:
                    $scope.icono = 'images/consultoriosMapIcon.png';
                    if ($rootScope.locationData.consultorios) {
                        $scope.getInfo(1);
                    } else {
                        $scope.getInfo(0);
                    }
                    break;
                case 4:
                    $scope.icono = 'images/dentalesMapIcon.png';
                    if ($rootScope.locationData.dentales) {
                        $scope.getInfo(1);
                    } else {
                        $scope.getInfo(0);
                    }
                    break;
            }
        };

        var input = (document.getElementById('searchId')); // Define input que se usa dentro de google maps para búsquedas predictivas
        // Función init
        $scope.init = function(lat, lng, zoom) {
            
            // FadeIn para el loader gráfico
            $("#loadingMeds, #loadingMeds2, .loadScreen").fadeIn("slow");

            //var address = document.getElementById('searchId').value;            

            $scope.posActual = {
                lat: lat,
                lng: lng
            }; // Se define latitud y longitud con html5 geoposition

            directionsDisplay = new google.maps.DirectionsRenderer({
                suppressMarkers: true
            }); // Método de google maps que se usa para mostrar indicaciones de navegación
            // Método de google maps que se usa para crear objeto con lat y lng
            var myLatlng = new google.maps.LatLng(lat, lng);
            usuario = myLatlng;

            var datosGeo = {
                'latitude': lat,
                'longitude': lng
            };
            // Método de google maps que se usa para crear objeto con lat y lng
            $scope.usuarioMarker = new google.maps.LatLng(lat, lng);

            var marker = new google.maps.Marker({
                position: myLatlng,
                map: map,
                icon: $scope.icono,
                animation: google.maps.Animation.DROP
            });
            // Usa servicio 'loadLocations.locations' para cargar los datos de las unidades
            var loc = loadLocations.locations($scope.tipoDeBusqueda);

            loc.then(function(datos) {
                var farmacias = JSON.parse(datos.data.d);
                locationSrv.addLocationData(farmacias, $scope.tipoDeBusqueda);
                console.log(farmacias);
                /*for (var key in farmacias[0]) {
                    console.info(key + ' ', farmacias[0][key]);
                }*/
                $scope.datosUbicacion = farmacias;
                // Checa si el estado es 'localiza.url' para usar o no los parámetros que se establecen en el url
                if ($state.$current.name === 'localiza.url' || $state.$current.name === 'localiza.urlNoLat') {
                    var pruebaCoords1 = isNaN(parseFloat($stateParams.calle));
                    var pruebaCoords2 = isNaN(parseFloat($stateParams.colonia));
                    var pruebaCoords3 = isNaN(parseFloat($stateParams.ciudad));
                    // Parámetros de coordenadas y de ID de unidad
                    if(!pruebaCoords1 && !pruebaCoords2 && !pruebaCoords3){
                        $scope.sencillo = true;
                        datosGeo.latitude = parseFloat($stateParams.calle);
                        datosGeo.longitude = parseFloat($stateParams.colonia);
                        var myLatlng = new google.maps.LatLng(datosGeo.latitude, datosGeo.longitude);
                        var infowindow;

                        marker = new google.maps.Marker({
                            position: myLatlng,
                            map: map,
                            icon: $scope.icono,
                            animation: google.maps.Animation.DROP
                        });

                        $scope.ruta(myLatlng);

                        var rutaMob = "http://maps.google.com/maps?saddr=" + usuario.lat() + "," + usuario.lng() + "&daddr=" + myLatlng.lat() + "," + myLatlng.lng();

                        google.maps.event.addListener(marker, 'click', function() {
                            if (infowindow) {
                                infowindow.close();
                            }

                            var infoMarker = this;

                            // Usa servicio 'loadLocations.idLocation' para obtener información de la unidad a través de su ID
                            var localizaId = loadLocations.idLocation($stateParams.ciudad);

                            localizaId.then(function(datos) {
                                $scope.datosLocaliza = JSON.parse(datos.data.d);
                                infowindow = new google.maps.InfoWindow({
                                    content: "<div class='direccion'><span>UNIDAD:</span> " + $scope.datosLocaliza[0].unidad + " </div> <div class='direccion visible-xs'><hr><p><a href='" + rutaMob + "'>VER RUTA EN GOOGLE MAPS</a></p></div>"
                                });
                                $scope.ruta(infoMarker.position); // Método que se usa para trazar ruta al punto de interés
                                $scope.puntoDeInteres = infoMarker.position;
                                infowindow.open(map, infoMarker); // Infowindow dentro del mapa, especial para cada marker
                            }, function(e) {
                                console.error(e);
                            });
                        });
                        markers.push(marker);
                        map.setZoom(13); // Se establece zoom del mapa
                        google.maps.event.clearListeners(map, 'dragend'); // Se quita el listener dragend dentro de la vista de una sola unidad
                        $("#loadingMeds, #loadingMeds2, .loadScreen").fadeOut("slow");

                    } else if(!pruebaCoords1 && !pruebaCoords2){ // Opción de búsqueda con coordenadas de interés pero sin ID de unidad
                        datosGeo.latitude = parseFloat($stateParams.calle);
                        datosGeo.longitude = parseFloat($stateParams.colonia);
                        var myLatlng = new google.maps.LatLng(datosGeo.latitude, datosGeo.longitude); // Objeto LatLng que se obtiene con las coordenadas que se pasaron a través de los parámetros
                        marker.setIcon(({
                            url: 'images/userLocIcon.png'
                        })); // Ícono de la ubicación del usuario o centro de mapa
                        marker.setPosition(myLatlng);
                        $scope.usuarioMarker = myLatlng;
                        $scope.posActual.lat = $scope.usuarioMarker.lat();
                        $scope.posActual.lng = $scope.usuarioMarker.lng();
                        marker.setVisible(true);
                        markers.push(marker);
                        // Método de google maps que se usa para obtener dirección de un punto a través de sus coordenadas
                        geocoder = new google.maps.Geocoder();
                        geocoder.geocode({
                            latLng: marker.position
                        }, function(responses) {
                            if (responses && responses.length > 0) {
                                // Procesa datos para que angular los actualice en la vista
                                $timeout(function() {
                                    //console.info(responses[0]);
                                    $scope.shareDirection = responses[0].formatted_address;
                                });
                                /*$timeout(function() {
                                    $scope.$digest();
                                });*/
                            } else {
                              console.log('Cannot determine address at this location.');
                            }
                        });
                        // Función que se usa para obtener las unidades más cercanas al punto indicado
                        $scope.obtenDistancias(datosGeo.latitude, datosGeo.longitude, $scope.datosUbicacion);
                        // Farmacia más cercana de acuerdo a la función anterior
                        var farmaciaMasCercana = new google.maps.LatLng($scope.distancias[0].Latitud, $scope.distancias[0].Longitud);
                        // Trazo de ruta a la farmacia más cercana
                        $scope.ruta(farmaciaMasCercana);
                        // Mapa estático que se usa cuando se comparte una dirección a través del módulo de administración
                        $scope.mapImgShare = "http://maps.google.com/maps/api/staticmap?sensor=false&center=" + $scope.posActual.lat + "," + $scope.posActual.lng + "&zoom=14&size=512x512&markers=icon:http://farmaciasdesimilares.com.mx/propuesta/images/userLocIcon.png|" + $scope.posActual.lat + "," + $scope.posActual.lng + "&markers=icon:http://farmaciasdesimilares.com.mx/propuesta/images/farmaciasMapIcon.png|" + $scope.distancias[0].Latitud + "," + $scope.distancias[0].Longitud;

                    } else if($stateParams.calle === null && $stateParams.colonia === null && $stateParams.ciudad === null){
                        // Función que se usa para obtener las unidades más cercanas al punto indicado
                        $scope.obtenDistancias(datosGeo.latitude, datosGeo.longitude, $scope.datosUbicacion);
                        // Farmacia más cercana de acuerdo a la función anterior
                        var farmaciaMasCercana = new google.maps.LatLng($scope.distancias[0].Latitud, $scope.distancias[0].Longitud);
                        // Trazo de ruta a la farmacia más cercana
                        $scope.ruta(farmaciaMasCercana);
                    } else { // Opción de búsqueda a través de términos, no de coordenadas

                        marker = new google.maps.Marker({
                            map: map,
                            animation: google.maps.Animation.DROP
                        });
                        // Se usa el servicio 'prettyUrlSpc.deconfig' para quitar guiones
                        var direccion = prettyUrlSpc.deconfig($stateParams.calle) + ', ' + prettyUrlSpc.deconfig($stateParams.colonia) + ', ' + prettyUrlSpc.deconfig($stateParams.ciudad);
                        // Método de google maps que se usa para obtener dirección de un punto a través de los términos de búsqueda
                        geocoder = new google.maps.Geocoder();
                        geocoder.geocode({
                            'address': direccion
                        }, function(results, status) {
                            if (status === google.maps.GeocoderStatus.OK) {
                                // Procesa datos para que angular los actualice en la vista
                                $timeout(function() {
                                    //console.info(results[0].geometry.location);
                                    map.setCenter(results[0].geometry.location);
                                    marker.setIcon( /** @type {google.maps.Icon} */ ({
                                        url: 'images/userLocIcon.png'
                                    }));
                                    marker.setPosition(results[0].geometry.location);
                                    $scope.usuarioMarker = results[0].geometry.location;
                                    $scope.posActual.lat = $scope.usuarioMarker.lat();
                                    $scope.posActual.lng = $scope.usuarioMarker.lng();
                                    marker.setVisible(true);
                                    markers.push(marker);

                                    $scope.obtenDistancias(map.getCenter().lat(), map.getCenter().lng(), $scope.datosUbicacion);
                                    var farmaciaMasCercana = new google.maps.LatLng($scope.distancias[0].Latitud, $scope.distancias[0].Longitud);
                                    $scope.ruta(farmaciaMasCercana);
                                });
                                /*$timeout(function() {
                                    $scope.$digest();
                                });*/
                                $scope.shareDirection = results[0].formatted_address;
                                $scope.mapImgShare = "http://maps.google.com/maps/api/staticmap?sensor=false&center=" + $scope.posActual.lat + "," + $scope.posActual.lng + "&zoom=14&size=512x512&markers=icon:http://farmaciasdesimilares.com.mx/propuesta/images/userLocIcon.png|" + $scope.posActual.lat + "," + $scope.posActual.lng + "&markers=icon:http://farmaciasdesimilares.com.mx/propuesta/images/farmaciasMapIcon.png|" + $scope.distancias[0].Latitud + "," + $scope.distancias[0].Longitud;

                            } else {
                                alert('Geocode was not successful for the following reason: ' + status);
                            }
                        });

                    }
                } else { // Opción sin parámetros, por lo que se usarán los datos de geolocation proporcionados
                    // Función que se usa para obtener las unidades más cercanas al punto indicado
                    $scope.obtenDistancias(datosGeo.latitude, datosGeo.longitude, $scope.datosUbicacion);
                    // Farmacia más cercana de acuerdo a la función anterior
                    var farmaciaMasCercana = new google.maps.LatLng($scope.distancias[0].Latitud, $scope.distancias[0].Longitud);
                    // Trazo de ruta a la farmacia más cercana
                    $scope.ruta(farmaciaMasCercana);
                }

            }, function(e) {
                var data = e.data;
                for (var key in data) {
                    console.log(key + ' ', data[key]);
                }
                var status = e.status;
                console.info(status);
            });
            // Función que carga los datos de las unidades que se quieren consultar cuando se cambia de tipo
            $scope.getInfo = function(siNo) {
                // Checa si ya se tienen los datos en la memoria para no realizar consulta extra
                if (siNo) {
                    var farmacias;
                    switch ($scope.tipoDeBusqueda) {
                        case 1:
                            farmacias = $rootScope.locationData.farmacias;
                            break;
                        case 2:
                            farmacias = $rootScope.locationData.analisis;
                            break;
                        case 3:
                            farmacias = $rootScope.locationData.consultorios;
                            break;
                        case 4:
                            farmacias = $rootScope.locationData.dentales;
                            break;
                    }
                    // Actualiza los datos que deben mostrarse
                    $scope.datosUbicacion = farmacias;
                    // Función que se usa para obtener las unidades más cercanas al punto indicado
                    $scope.obtenDistancias($scope.posActual.lat, $scope.posActual.lng, $scope.datosUbicacion);
                    // Farmacia más cercana de acuerdo a la función anterior
                    var farmaciaMasCercana = new google.maps.LatLng($scope.distancias[0].Latitud, $scope.distancias[0].Longitud);
                    // Trazo de ruta a la farmacia más cercana
                    $scope.ruta(farmaciaMasCercana);
                } else {
                    // Usa servicio 'loadLocations.locations' para cargar los datos de las unidades
                    var loc = loadLocations.locations($scope.tipoDeBusqueda);

                    loc.then(function(datos) {
                        var farmacias = JSON.parse(datos.data.d);
                        locationSrv.addLocationData(farmacias, $scope.tipoDeBusqueda);
                        // Actualiza los datos que deben mostrarse
                        $scope.datosUbicacion = farmacias;
                        // Función que se usa para obtener las unidades más cercanas al punto indicado
                        $scope.obtenDistancias($scope.posActual.lat, $scope.posActual.lng, $scope.datosUbicacion);
                        // Farmacia más cercana de acuerdo a la función anterior
                        var farmaciaMasCercana = new google.maps.LatLng($scope.distancias[0].Latitud, $scope.distancias[0].Longitud);
                        // Trazo de ruta a la farmacia más cercana
                        $scope.ruta(farmaciaMasCercana);
                    }, function(e) {
                        var data = e.data;
                        for (var key in data) {
                            console.log(key + ' ', data[key]);
                        }
                        var status = e.status;
                        console.info(status);
                    });
                }

            };
            // Array que se usa para guardar puntos donde se quieren colocar markers
            var markers = [];
            // Método de google maps con el que se crea el mapa, con sus respectivas propiedades y estilos
            map = new google.maps.Map(document.getElementById('map'), {
                center: myLatlng,
                zoom: zoom,
                maxZoom: 20,
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
            // Call setMap() on the renderer to bind it to the passed map
            directionsDisplay.setMap(map);
            // Decide donde colocar las indicaciones de ruta
            if ($('#right-panel').css('display') === 'none') {
                directionsDisplay.setPanel(document.getElementById('right-panel2'));
            } else {
                directionsDisplay.setPanel(document.getElementById('right-panel'));
            }
            // Define el elemento que se usa para colocar las opciones del mapa
            var opcionesMapa = (document.getElementById('opcionesMapa'));
            map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
            map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(opcionesMapa);
            // Método de google maps que se usa para crear una nueva instancia de objeto autocomplete
            var autocomplete = new google.maps.places.Autocomplete(input);
            autocomplete.bindTo('bounds', map);
            var componentRestrictions = {
                country: 'mx'
            };
            autocomplete.setComponentRestrictions(componentRestrictions);
            // Listener de autocomplete
            google.maps.event.addListener(autocomplete, 'place_changed', function() {
                // Procesa datos para que angular los actualice en la vista
                $timeout(function() {
                    var place = autocomplete.getPlace();
                    // Si usan autocomplete, se usa la información que proporciona dicho servicio
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
                        // Imagen del marcador del usuario
                        marker.setIcon(({
                            url: 'images/userLocIcon.png'
                        }));
                        // Posición del marcador del usuario
                        marker.setPosition(place.geometry.location);
                        $scope.usuarioMarker = place.geometry.location;
                        // Actualiza lat de posición actual
                        $scope.posActual.lat = $scope.usuarioMarker.lat();
                        // Actualiza lng de posición actual
                        $scope.posActual.lng = $scope.usuarioMarker.lng();
                        marker.setVisible(true);

                        markers.push(marker);
                        // Función que se usa para obtener las unidades más cercanas al punto indicado
                        $scope.obtenDistancias(map.getCenter().lat(), map.getCenter().lng(), $scope.datosUbicacion);
                        // Farmacia más cercana de acuerdo a la función anterior
                        var farmaciaMasCercana = new google.maps.LatLng($scope.distancias[0].Latitud, $scope.distancias[0].Longitud);
                        // Trazo de ruta a la farmacia más cercana
                        $scope.ruta(farmaciaMasCercana);
                        // Si no se actualiza automáticamente, este timeout se encarga procesar la información luego de que termine el último ciclo iniciado
                        /*$timeout(function() {
                            $scope.$digest();
                        });*/

                    } else { // Opción cuando no se elige una de las opciones del autocomplete
                        markers = [];
                        deleteMarkers();
                        // Términos que se usarán para la búsqueda
                        var address = document.getElementById('searchId').value;
                        // Método de google maps que se usa para obtener dirección de un punto a través de los términos de búsqueda
                        geocoder = new google.maps.Geocoder();
                        geocoder.geocode({
                            'address': address
                        }, function(results, status) {
                            if (status === google.maps.GeocoderStatus.OK) {
                                map.setCenter(results[0].geometry.location);
                                // Imagen del marcador del usuario
                                marker.setIcon( /** @type {google.maps.Icon} */ ({
                                    url: 'images/userLocIcon.png'
                                }));
                                // Posición del marcador del usuario
                                marker.setPosition(results[0].geometry.location);
                                $scope.usuarioMarker = results[0].geometry.location;
                                // Actualiza lat de posición actual
                                $scope.posActual.lat = $scope.usuarioMarker.lat();
                                // Actualiza lng de posición actual
                                $scope.posActual.lng = $scope.usuarioMarker.lng();
                                marker.setVisible(true);
                                markers.push(marker);
                                // Función que se usa para obtener las unidades más cercanas al punto indicado
                                $scope.obtenDistancias(map.getCenter().lat(), map.getCenter().lng(), $scope.datosUbicacion);
                                // Farmacia más cercana de acuerdo a la función anterior
                                var farmaciaMasCercana = new google.maps.LatLng($scope.distancias[0].Latitud, $scope.distancias[0].Longitud);
                                // Trazo de ruta a la farmacia más cercana
                                $scope.ruta(farmaciaMasCercana);
                                // Si no se actualiza automáticamente, este timeout se encarga procesar la información luego de que termine el último ciclo iniciado
                                /*$timeout(function() {
                                    $scope.$digest();
                                });*/

                            } else {
                                alert('Geocode was not successful for the following reason: ' + status);
                            }
                        });
                    }
                });
            });
            // Método de google maps para iniciar infowindow
            infoWindow = new google.maps.InfoWindow();
            service = new google.maps.places.PlacesService(map);
            var marker = new google.maps.Marker({
                position: myLatlng,
                map: map,
                animation: google.maps.Animation.DROP,
                draggable: true,
                optimized: false,
                zIndex:0,
                title: 'Esta es tu ubicación',
                icon: 'images/userLocIcon.png',
            });
            // Listener del evento click en el marcador del usuario
            marker.addListener('click', function (event) {
                //console.log(marker);
            });
            markers.push(marker);
            // Estable contenido del infowindow del usuario
            var infowindow = new google.maps.InfoWindow({
                content: '<div class="prueba">Usted está aquí<hr style="margin-top:0"><span style="color:#449d44">Haz click en una unidad para desplegar su información</span></div>'
            });
            // Abre infowindow de usuario
            infowindow.open(map, marker);
            // Listener del evento dragend del marcador de usuario para actualizar datos de unidades
            google.maps.event.addListener(marker, 'dragend', function(event) {
                $scope.obtenDistancias(event.latLng.lat(), event.latLng.lng(), $scope.datosUbicacion);
                $scope.usuarioMarker = new google.maps.LatLng(event.latLng.lat(), event.latLng.lng());
                $scope.posActual.lat = $scope.usuarioMarker.lat();
                $scope.posActual.lng = $scope.usuarioMarker.lng();
                var farmaciaMasCercana = new google.maps.LatLng($scope.distancias[0].Latitud, $scope.distancias[0].Longitud);
                $scope.ruta(farmaciaMasCercana);
                map.setCenter($scope.usuarioMarker);
                $scope.puntoDeInteres = farmaciaMasCercana;
            });  
            // Listener del evento dragend dentro del mapa para actualizar datos de unidades              
            google.maps.event.addListener(map, 'dragend', function(event) {
                marker.setPosition(new google.maps.LatLng(map.getCenter().lat(), map.getCenter().lng()));
                $scope.obtenDistancias(map.getCenter().lat(), map.getCenter().lng(), $scope.datosUbicacion);
                $scope.usuarioMarker = new google.maps.LatLng(map.getCenter().lat(), map.getCenter().lng());
                $scope.posActual.lat = $scope.usuarioMarker.lat();
                $scope.posActual.lng = $scope.usuarioMarker.lng();
                var farmaciaMasCercana = new google.maps.LatLng($scope.distancias[0].Latitud, $scope.distancias[0].Longitud);
                $scope.ruta(farmaciaMasCercana);
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
        // Tipo de navegación empleado
        $scope.selectedMode = 'DRIVING';
        // Función que se usa para estableces la ruta hacia la unidad más cercana al punto de interés
        $scope.ruta = function(destino) {
            var origen = usuario;
            if ($scope.usuarioMarker) {
                origen = $scope.usuarioMarker;
            }
            // Método de google maps que se usa para crear objeto con lat y lng del destino de la ruta
            var destinoF = new google.maps.LatLng(destino.lat(), destino.lng());
            // Propiedades del objeto request que se pasará al servicio de google para obtener el trazo de la ruta
            var request = {
                origin: origen,
                destination: destinoF,
                travelMode: google.maps.TravelMode[$scope.selectedMode]
            };
            // Servicio de google maps que se usa para obtener la ruta
            directionsService = new google.maps.DirectionsService();
            directionsService.route(request, function(response, status) {
                if (status === google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setOptions({
                        preserveViewport: true
                    });
                    // Servicio de google maps para desplegar las indicaciones de la ruta obtenida
                    directionsDisplay.setDirections(response);

                    if ($('#right-panel').css('display') === 'none') {
                        $('#right-panel2').css('display', 'block');
                        $('#right-panel2').addClass('pt-page-moveFromTopFade');
                    } else {
                        $('#right-panel').css('display', 'block');
                        $('#right-panel').addClass('pt-page-moveFromTopFade');
                    }
                    // Centra el mapa a la mitad de la ruta trazada
                    map.setCenter(response.routes[0].bounds.getCenter());
                }
            });

        };
        // Función para obtener las distancias a cada unidad y elegir las más cercanas
        $scope.obtenDistancias = function(lat, lng, data) {
            // Se borran los marcadores previos
            deleteMarkers();
            // Array para almacenar todas las unidades en orden de acuerdo a la distancia
            $scope.distancias = [];
            // Loop para recorrer todas las unidades y determinar la distancia a la que se ubican
            for (var i = 0; i < data.length; i++) {
                // Link que abre la aplicación de google maps trazando la ruta hacia la unidad seleccionada
                var rutaMob = "http://maps.google.com/maps?saddr=" + usuario.lat() + "," + usuario.lng() + "&daddr=" + data[i].latitud + "," + data[i].longitud;
                // Usa servicio 'MapSrv.getDistance' para obtener la distancia entre el punto de interés y la unidad
                var distancia = MapSrv.getDistance(lat, lng, data[i].latitud, data[i].longitud);
                // Coloca la unidad en el array 'distancias' con su respectiva información
                $scope.distancias.push({
                    "Latitud": data[i].latitud,
                    "Longitud": data[i].longitud,
                    "Nombre": data[i].unidad,
                    "Distancia": distancia,
                    "Ruta": rutaMob,
                    "Id": data[i].idunidad,
                    "Horas": data[i].abierto24hrs
                });
            }
            // If/else dependiendo si se quieren mostrar todas las unidades o sólo las de 24hrs
            if ($scope.horas.value1) {
                // El array distancias se filtra usando la distancia
                $scope.distancias = $filter('orderBy')($scope.distancias, 'Distancia');
                // El array distancias se filtra y muestra sólo 24 hrs
                $scope.distancias = $filter('filter')($scope.distancias, $scope.horas.value1);
                // El array distancias se filtra limitando las unidades mostradas de acuardo al inputUnidades
                $scope.distancias = $filter('limitTo')($scope.distancias, $scope.inputUnidades);
            } else {
                // El array distancias se filtra usando la distancia
                $scope.distancias = $filter('orderBy')($scope.distancias, 'Distancia');
                // El array distancias se filtra limitando las unidades mostradas de acuardo al inputUnidades
                $scope.distancias = $filter('limitTo')($scope.distancias, $scope.inputUnidades);
            }
            // Loop para recorrer las unidades que ya se filtraron y colocarles su respectiva información
            for (var j = 0; j < $scope.distancias.length; j++) {
                // Método de google maps que se usa para crear objeto con lat y lng de la unidad por la que se itera 
                var myLatlng = new google.maps.LatLng($scope.distancias[j].Latitud, $scope.distancias[j].Longitud);
                // Link que abre la aplicación de google maps trazando la ruta hacia la unidad seleccionada
                var rutaMob = "http://maps.google.com/maps?saddr=" + usuario.lat() + "," + usuario.lng() + "&daddr=" + myLatlng.lat() + "," + myLatlng.lng();
                // Variable que contendrá la información que se presentará en el infowindow de la unidad por la que se itera
                var infowindow;
                // Marcador de la unidad
                var marker = new google.maps.Marker({
                    position: myLatlng,
                    map: map,
                    icon: $scope.icono,
                    animation: google.maps.Animation.DROP,
                    title: $scope.distancias[j].Nombre,
                    distancia: ($scope.distancias[j].Distancia).toFixed(2),
                    id: $scope.distancias[j].Id
                });
                // Listener que escucha el evento click del marcador
                google.maps.event.addListener(marker, 'click', function() {
                    if (infowindow) {
                        infowindow.close();
                    }

                    var infoMarker = this;

                    //console.log(infoMarker.id);
                    // Usa servicio 'loadLocations.idLocation' para obtener información de la unidad a través de su ID
                    var localizaId = loadLocations.idLocation(infoMarker.id);

                    localizaId.then(function(datos) {
                        $scope.datosLocaliza = JSON.parse(datos.data.d);
                        /*console.info('Success');
                        console.log($scope.datosLocaliza);*/
                        infowindow = new google.maps.InfoWindow({
                            content: "<div class='direccion'><span>UNIDAD:</span> " + infoMarker.title + " </div> <div class='direccion visible-xs'><hr><p><a href='" + rutaMob + "'>VER RUTA EN GOOGLE MAPS</a></p></div>"
                        });
                        $scope.ruta(infoMarker.position);
                        $scope.puntoDeInteres = infoMarker.position;
                        infowindow.open(map, infoMarker);
                        // Si no se actualiza automáticamente, este timeout se encarga procesar la información luego de que termine el último ciclo iniciado
                        $timeout(function() {
                            $scope.$digest();
                        });                        
                    }, function(e) {
                        console.error(e);
                    });
                    //$scope.locationById(this.id);
                });
                markers.push(marker);
                // FadeOut para el loader gráfico
                $("#loadingMeds, #loadingMeds2, .loadScreen").fadeOut("slow");
            }

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

        function muestraPos(pos) {
            var areaLat = pos.coords.latitude,
                areaLng = pos.coords.longitude,
                areaZoom = 16;
            // Checa si ya se cargó la librería de google, si no la carga y luego ejecuta la función init para cargar el mapa    
            if (!angular.isObject(window.google)) {
                console.error('No');
                $.getScript( "https://maps.googleapis.com/maps/api/js?libraries=places&language=es&key=AIzaSyBy2XNERytdPndsS6LXGqcTsl0THYlJ54I" )
                  .done(function( script, textStatus ) {
                    console.log( textStatus );
                    google.maps.event.addDomListener(window, 'load', $scope.init(areaLat, areaLng, areaZoom));           
                  })
                  .fail(function( jqxhr, settings, exception ) {
                    console.error(settings);
                });            
            } else {
                console.info('Si');
                google.maps.event.addDomListener(window, 'load', $scope.init(areaLat, areaLng, areaZoom));
            }
        }

        function errorHandler(e){
            console.error(e);
            // Checa si ya se cargó la librería de google, si no la carga y luego ejecuta la función init para cargar el mapa
            if (!angular.isObject(window.google)) {
                console.error('No');
                $.getScript( "https://maps.googleapis.com/maps/api/js?libraries=places&language=es&key=AIzaSyBy2XNERytdPndsS6LXGqcTsl0THYlJ54I" )
                  .done(function( script, textStatus ) {
                    console.log( textStatus );
                    google.maps.event.addDomListener(window, 'load', $scope.init(19.4352685, -99.1576836, 8));            
                  })
                  .fail(function( jqxhr, settings, exception ) {
                    console.error(settings);
                });            
            } else {
                console.info('Si');
                google.maps.event.addDomListener(window, 'load', $scope.init(19.4352685, -99.1576836, 8));
            }
            /*var locationWoGeo = loadData.httpReq('http://ipinfo.io');
            locationWoGeo.then(function (datos) {
                var latLng = datos.data.loc;
                var res = latLng.split(",");
                // Checa si ya se cargó la librería de google, si no la carga y luego ejecuta la función init para cargar el mapa
                if (!angular.isObject(window.google)) {
                    console.error('No');
                    $.getScript( "https://maps.googleapis.com/maps/api/js?libraries=places&language=es&key=AIzaSyBy2XNERytdPndsS6LXGqcTsl0THYlJ54I" )
                      .done(function( script, textStatus ) {
                        console.log( textStatus );
                        $.getScript( "https://google-maps-utility-library-v3.googlecode.com/svn/trunk/infobubble/src/infobubble.js" )
                          .done(function( script, textStatus ) {
                            console.log( textStatus );
                            google.maps.event.addDomListener(window, 'load', $scope.init(parseInt(res[0]), parseInt(res[1]), 16));
                          })
                          .fail(function( jqxhr, settings, exception ) {
                            console.error(settings);
                        });            
                      })
                      .fail(function( jqxhr, settings, exception ) {
                        console.error(settings);
                    });            
                } else {
                    console.info('Si');
                    google.maps.event.addDomListener(window, 'load', $scope.init(parseInt(res[0]), parseInt(res[1]), 16));
                }

            }, function(e) {
                console.log(e);
                google.maps.event.addDomListener(window, 'load', $scope.init(19.3910038, -99.2836982, 16));
            });*/
        }

        // Intenta utilizar geolocation HTML5
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(muestraPos, errorHandler);
        }   

        // Inicializa variable de número de unidades mostradas
        $scope.inputUnidades = 100;

        // Monitorea el número de unidades que se quiere mostrar
        $scope.$watch('inputUnidades', function() {
            if ($scope.inputUnidades) {
                try {
                    if ($scope.usuarioMarker.lat() && $scope.inputUnidades >= 1) {
                        $scope.obtenDistancias($scope.usuarioMarker.lat(), $scope.usuarioMarker.lng(), $scope.datosUbicacion);
                    }
                } catch (err) {
                    console.log(err.message);
                }
            }
        });

        // Variable que sirve para mostrar u ocultar unidades de 24 horas
        $scope.horas = {
            value1: false
        };

        // Monitorea el cambio en la variable que indica si se quiere o no mostrar unidades de 24 horas
        $scope.$watch('horas.value1', function() {
            try {
                if ($scope.usuarioMarker.lat() && $scope.inputUnidades > 10) {
                    $scope.obtenDistancias($scope.usuarioMarker.lat(), $scope.usuarioMarker.lng(), $scope.datosUbicacion);
                    var farmaciaMasCercana = new google.maps.LatLng($scope.distancias[0].Latitud, $scope.distancias[0].Longitud);
                    $scope.ruta(farmaciaMasCercana);
                }
            } catch (err) {
                console.log(err.message);
            }
        });

        // Función para mostrar u ocultar unidades de 24 horas
        $scope.checkToogle = function() {
            $scope.horas.value1 = !$scope.horas.value1;
        };

        // Función que pasa los términos de búsqueda por filtros para luego navegar a la url que contendrá los detalles de búsqueda
        $scope.urlBusca = function() {
            var calleF = prettyUrlSpc.prettyUrl($scope.termino1);
            var coloniaF = prettyUrlSpc.prettyUrl($scope.termino2);
            var ciudadF;
            if($scope.termino3) {
                ciudadF = prettyUrlSpc.prettyUrl($scope.termino3);
            } else {
                ciudadF = '';
            }
            $state.go('localiza.url', { 
                tipo: $scope.tipoDeBusqueda,
                calle: calleF,
                colonia: coloniaF,
                ciudad: ciudadF
            });
        }


        // Referencia a base de datos en Firebase
        var ref = new Firebase("https://farmaciasdesimilares.firebaseio.com/");

        // Variable que sirve para mostrar u ocultar alerta de login
        $scope.logInError = false;
        // Inicializa variable email de login
        $scope.email = '';
        // Inicializa variable password de login
        $scope.password = '';

        // Función que se usa para Login
        $scope.login = function () {
            ref.authWithPassword({
              email    : $scope.email,
              password : $scope.password
            }, function(error, authData) {
              if (error) {
                loginErrorHandler(error);                    
              } else {
                loginSuccessHanlder(authData);
              }
            });
        }


        // Función que maneja error en login
        function loginErrorHandler(error) {
            $scope.logInError = true;
            console.log(error.code);
            if (error.code === 'INVALID_PASSWORD') {
                $scope.loginErrorMsg = 'Esa no es tu contraseña';
            } else if (error.code === 'INVALID_USER') {
                $scope.loginErrorMsg = 'Ese usuario no existe';
            } else if (error.code === 'INVALID_EMAIL') {
                $scope.loginErrorMsg = 'Ese email no es válido';
            }
            digiere();
        }

        // Función que maneja login exitoso
        function loginSuccessHanlder(authData) {
            //console.info(authData);
        };


        // Función para logout
        $scope.logout = function () {
            ref.unauth();
        };

        // Función callback para el estado de la autenticación
        function authDataCallback(authData) {
          if (authData) {
            $scope.usuario = authData.password.email;
            console.log("User " + authData.uid + " is logged in with " + authData.password.email);
            digiere();
            verificaDatosEnFirebase();
          } else {
            $scope.usuario = null;
            console.log("User is logged out");
          }
        }

        // Verifica que el usuario esté en la Firebase/users
        function verificaDatosEnFirebase() {
            var user = $scope.usuario.slice(0, $scope.usuario.indexOf("@"));
            var usuarioAVerificar = 'users/' + user;
            ref.child(usuarioAVerificar).on("value", function(snapshot) {
                if (!snapshot.val()) {
                    registraUsuario(usuarioAVerificar);
                } else {
                    $scope.usuario = snapshot.val().full_name;
                    digiere();
                    console.log(snapshot.val());
                }
            });            
        }

        // Función para registrar nombre de usuario en la base
        function registraUsuario(usuarioAVerificar) {
            var person = prompt("Por favor escribe tu", "Anónimo");
            var usersRef = ref.child(usuarioAVerificar);
            usersRef.set({
                full_name: person
            });            
        }

        // Función para guardar los post
        $scope.guardaPost = function(modo) {
            console.info(modo);
            var postsRef = ref.child("posts");

            postsRef.push().set({
                autor: $scope.usuario,
                url: $scope.urlShare,
                canal: modo
            });
        }

        // Monitorea el estado del usuario | conectado o desconectado y llama función callback para manejar los cambios de estado
        ref.onAuth(authDataCallback);

        // Variable link que se compartirá basado en la url absoluta
        $scope.urlShare = $location.absUrl();

        var shortUrl = getShortUrl.httpReq($scope.urlShare);

        shortUrl.then(function(datos) {
            //console.log(datos.data.id);
            $scope.urlShareShort = datos.data.id;
            digiere();
        }, function(e) {
            console.error(e);
        });

        // Variable que sirve para mostrar u ocultar módulo para compartir links
        $scope.showOps = false;
        // Variable que sirve para mostrar u ocultar alerta de copiado
        $scope.copiado = false;
        // Función para mostrar u ocultar módulo para compartir links
        $scope.muestraOps = function () {
            $scope.showOps = !$scope.showOps;
        }

        // Función que copia en portapapeles el link para compartir
        $scope.copiaLink = function () {
            digiere();
            var urlField = document.querySelector('#urlForShare');
            // Selecciona el contenido del elemento
            urlField.select();

            console.info(document.querySelector('#urlForShare'));

            try {  
                // Después de haber seleccionado el texto, ejecuta el comando para copiar  
                var successful = document.execCommand('copy');  
                var msg = successful ? 'successful' : 'unsuccessful';  
                if(msg === 'successful'){
                    $scope.copiado = true;
                    $scope.guardaPost('Copiado');
                    $timeout(function(){ $scope.copiado = false; }, 3000);
                }
                console.log('Copy email command was ' + msg);  
            } catch(err) {  
                console.log('Oops, unable to copy');
            }
        };

        // Procesa datos que angular todavía no ha digerido
        function digiere() {
            if(!$scope.$$phase) {
                $scope.$digest();
            }                
        }

        // Inicializa tooltips de bootstrap
        $(function () {
          $('[data-toggle="tooltip"]').tooltip()
        })        

    }]);
