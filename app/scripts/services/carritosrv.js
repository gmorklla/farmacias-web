'use strict';

/**
 * @ngdoc service
 * @name farmaciasWebApp.CarritoSrv
 * @description
 * # CarritoSrv
 * Service in the farmaciasWebApp.
 */
angular.module('farmaciasWebApp')
    .service('CarritoSrv', ['$rootScope', '$localStorage', function($rootScope, $localStorage) {

        $rootScope.$storage = $localStorage.$default({
            array: []
        });

        $rootScope.guardaEnCarrito = function(id, precio, nombre) {

            $rootScope.productoAgregado = id;

            var productoAdd = {
                id: id,
                precio: precio,
                nombre: nombre
            };

            if ($rootScope.muestraCarrito) {
                var margen = $('#carritoShow').css('height');
                $('.alertaAdd').css('bottom', margen);
            } else {
                $('.alertaAdd').css('bottom', 0);
            }

            var producto = $.grep($rootScope.$storage.array, function(pro) {
                return pro.id === productoAdd.id;
            });

            if (producto.length !== 0) {
                var indice = $rootScope.$storage.array.indexOf(producto[0]);
                $rootScope.$storage.array[indice].cantidad += 1;
                $rootScope.muestraTotal();
            } else {
                productoAdd.cantidad = 1;
                $rootScope.$storage.array.push(productoAdd);
                $rootScope.muestraTotal();
            }

            $rootScope.showAddedProduct = true;

            setTimeout(function() {
                $rootScope.showAddedProduct = false;
                $rootScope.$digest();
            }, 1000);

        };

        $rootScope.quitaDeCarrito = function(item) {
            $rootScope.$storage.array.splice(item, 1);
            $rootScope.muestraTotal();
        };

        $rootScope.sumaPro = function(item) {
            $rootScope.$storage.array[item].cantidad += 1;
            $rootScope.muestraTotal();
        };

        $rootScope.restaPro = function(item) {
            if ($rootScope.$storage.array[item].cantidad > 1) {
                $rootScope.$storage.array[item].cantidad -= 1;
                $rootScope.muestraTotal();
            }
        };

        $rootScope.muestraTotal = function() {
            $rootScope.total = 0;
            for (var i = 0; i < $rootScope.$storage.array.length; i++) {
                $rootScope.total += ($rootScope.$storage.array[i].precio * $rootScope.$storage.array[i].cantidad);
            }
        };

        $rootScope.muestraTotal();

    }]);