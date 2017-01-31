'use strict';

/**
 * @ngdoc function
 * @name farmaciasWebApp.controller:RentaCtrl
 * @description
 * # RentaCtrl
 * Controller of the farmaciasWebApp
 */
angular.module('farmaciasWebApp')
    .controller('RentaCtrl', ['RentaSrv', '$scope', '$log', 'jQuery', 'banner', 'loadData', '$state', function(RentaSrv, $scope, $log, $, banner, loadData, $state) {
        $scope.enviado = 0;
        $scope.previoRegistro = false;
        $scope.recibido = true;

        $('[data-toggle="tooltip"]').tooltip();

        $scope.estadoPSeleccionado = function() {

            $scope.userMun = true;

            var datos = RentaSrv.municipios($scope.estadoP);

            datos.then(function(datos) {
                var obj = JSON.parse(datos.data.d);
                console.log(obj);
                $scope.itemsForMunicipioP = obj.lista;
                $scope.userMun = false;
            }, function(e) {
                $log.error(e);
            });

        }

        $scope.estadoSeleccionado = function() {

            $scope.localMun = true;

            var datos = RentaSrv.municipios($scope.estado);

            datos.then(function(datos) {
                var obj = JSON.parse(datos.data.d);
                $scope.itemsForMunicipio = obj.lista;
                $scope.localMun = false;
            }, function(e) {
                $log.error(e);
            });

        }

        $scope.municipioSeleccionado = function() {

            $scope.localMun = true;

            var datos = RentaSrv.cp($scope.estado, $scope.municipioL.Id_Municipio);

            datos.then(function(datos) {
                var obj = JSON.parse(datos.data.d);
                $scope.itemsForCodPos = obj.descripcion;
                $scope.localMun = false;
            }, function(e) {
                $log.error(e);
            });

        }

        $scope.codPosSeleccionado = function() {

            $scope.localMun = true;

            var datos = RentaSrv.colonia($scope.estado, $scope.municipioL.Id_Municipio, $scope.codPos.CodigoPostal);

            datos.then(function(datos) {
                var obj = JSON.parse(datos.data.d);
                $scope.itemsForColonia = obj.lista;
                $scope.localMun = false;
            }, function(e) {
                $log.error(e);
            });

        }

        $scope.guardarDatosRenta = function(data) {

            $scope.localMun = true;

            if (data.notas == undefined) {
                data.notas = '';
            }

            var datos = RentaSrv.guardarDatos(data);

            datos.then(function(datos) {
                $scope.localMun = false;
                var obj = JSON.parse(datos.data.d);
                console.log(obj);
                if (obj.resultado == true) {
                    $scope.enviado = 1;
                    $scope.scrollToTop();
                } else {
                    $scope.scrollToTop();
                    $scope.recibido = false;
                    if (obj.descripcion == 'Ya existe el correo electrónico proporcionado') {
                        $scope.mensajeError = obj.descripcion;
                    } else {
                        $scope.mensajeError = 'Parece que hubo un error en los datos ingresados. Por favor, vuelve a intentarlo o comunícate al 01 800 911 6666';
                    }
                }

            }, function(e) {
                $log.error(e);
            });

        }

        $scope.realizaBusqueda = false;

        $scope.verificaEmailFn = function() {            

            if ($scope.email) {

                $scope.realizaBusqueda = true;
                $scope.buscaCorreo = true;

                var datos = RentaSrv.verificaEmail($scope.email);

                datos.then(function(datos) {
                    $scope.buscaCorreo = false;
                    var obj = JSON.parse(datos.data.d);

                    if (obj.resultado == true) {
                        $log.info(obj.resultado);
                        $scope.previoRegistro = true;
                        yaRegistrado();
                    } else {
                        $log.info('No existe previo registro');
                        $scope.previoRegistro = false;
                    }

                }, function(e) {
                    $log.error(e);
                });
            }
        }

        function yaRegistrado() {
            $scope.username   = '..........';
            $scope.tel        = '..........';
            $scope.telMov     = '..........';
            $scope.direccion  = '..........';
            $scope.estadoP    = '..........';
            $scope.municipioP = '..........';
        }

        $scope.comprueba = function() {
            console.log($scope.username, $scope.tel, $scope.telMov, $scope.direccion, $scope.estadoP, $scope.municipioP);
        }

        // Usa servicio 'ContactSrv.postRentaInfo' para mandar información de renta de local
        $scope.postRentaInfo = function() {

            console.clear();

            var forma;

            if ($scope.previoRegistro == true) {
                forma = {
                    'correo'              : $scope.email,
                    'nombre'              : 'nombre',
                    'telefonoF'           : '5555555555',
                    'telefonoM'           : '5555555555',
                    'direccion'           : 'direccion',
                    'estadoP'             : 0,
                    'delegacionMunicipioP': 0,
                    'calle'               : $scope.calle,
                    'numeroE'             : $scope.numExt,
                    'numeroI'             : $scope.numInt,
                    'calle1'              : $scope.entre1,
                    'calle2'              : $scope.entre2,
                    'estadoL'             : $scope.estado,
                    'delegacionMunicipioL': $scope.municipioL.Id_Municipio,
                    'codigoPostal'        : $scope.codPos.CodigoPostal,
                    'colonia'             : $scope.colonia.Id_Asentamiento,
                    'metrosFrente'        : $scope.metrosFrente,
                    'metrosFondo'         : $scope.metrosFondo,
                    'supTotal'            : $scope.superficie,
                    'importeRenta'        : $scope.importeRenta,
                    'notas'               : $scope.notas
                };
            } else {
                forma = {
                    'correo'              : $scope.email,
                    'nombre'              : $scope.username,
                    'telefonoF'           : $scope.tel,
                    'telefonoM'           : $scope.telMov,
                    'direccion'           : $scope.direccion,
                    'estadoP'             : $scope.estadoP,
                    'delegacionMunicipioP': $scope.municipioP.Id_Municipio,
                    'calle'               : $scope.calle,
                    'numeroE'             : $scope.numExt,
                    'numeroI'             : $scope.numInt,
                    'calle1'              : $scope.entre1,
                    'calle2'              : $scope.entre2,
                    'estadoL'             : $scope.estado,
                    'delegacionMunicipioL': $scope.municipioL.Id_Municipio,
                    'codigoPostal'        : $scope.codPos.CodigoPostal,
                    'colonia'             : $scope.colonia.Id_Asentamiento,
                    'metrosFrente'        : $scope.metrosFrente,
                    'metrosFondo'         : $scope.metrosFondo,
                    'supTotal'            : $scope.superficie,
                    'importeRenta'        : $scope.importeRenta,
                    'notas'               : $scope.notas
                };
            }

            $log.info(forma);
            
            $scope.guardarDatosRenta(forma);            

            $scope.email        = '';
            $scope.username     = '';
            $scope.tel          = '';
            $scope.telMov       = '';
            $scope.direccion    = '';
            $scope.estadoP      = '';
            $scope.MunicipioP   = '';
            $scope.calle        = '';
            $scope.numExt       = '';
            $scope.numInt       = '';
            $scope.entre1       = '';
            $scope.entre2       = '';
            $scope.estado       = '';
            $scope.municipioL   = '';
            $scope.codPos       = '';
            $scope.colonia      = '';
            $scope.metrosFrente = '';
            $scope.metrosFondo  = '';
            $scope.superficie   = '';
            $scope.importeRenta = '';
            $scope.notas        = '';
            $scope.rentaForm.$setUntouched();

        };

        $scope.scrollToTop = function() {
            $('html, body').animate({
                scrollTop: $("html").offset().top
            }, 1000);
        };

        banner.random();

        // Get data service
        function getData() {
            // Usa servicio 'loadData.httpReq' para obtener datos
            var datos = loadData.httpReq('data/data.json');

            datos.then(function(datos) {
                $scope.data = datos.data.data;
                console.info($scope.data);
            }, function(e) {
                console.log(e);
            });
        }

        if ($state.$current.name === 'renta.detalle') {
            getData();
        }

        $scope.llenaCampos = function() {
            var mail = 'prueba' + Math.floor(Math.random() * 10000) + '@prueba.com';
            $scope.email        = mail;
            $scope.username     = 'Prueba';
            $scope.tel          = '5555555555';
            $scope.telMov       = '5555555555';
            $scope.direccion    = 'Desconocida';
            $scope.calle        = 'Alguna';
            $scope.numExt       = 123;
            $scope.numInt       = 123;
            $scope.entre1       = 'Una';
            $scope.entre2       = 'Otra';
            $scope.metrosFrente = 20;
            $scope.metrosFondo  = 20;
            $scope.superficie   = 100;
            $scope.importeRenta = 10000;
            $scope.notas        = 'Notas adicionales...';
        }

    }]);
