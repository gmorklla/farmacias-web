'use strict';

/**
 * @ngdoc service
 * @name farmaciasWebApp.promoOrCombo
 * @description
 * # promoOrCombo
 * Service in the farmaciasWebApp.
 */
angular.module('farmaciasWebApp')
    .service('PromoOrComboSrv', ['$log', '$rootScope', '$filter', function($log, $rootScope, $filter) {
        this.getPromoCombo = function(datos) {
            var oferta = JSON.parse(datos.data.d);

            if(oferta[0].oferta[0]) {
                if (oferta[0].oferta[0].TIPOPROMOCION === 'OFERTA') {
                    var ofertaTxtF = {
                        "ofertas": []
                    }
                    $rootScope.tipoDeOferta = 'Oferta';
                    for (var i = 0; i < oferta[0].oferta.length; i++) {
                        var ahorro = (parseInt(oferta[0].oferta[i].PRODUCTOS) * parseInt(oferta[0].PRECIO_VENTA)) - parseInt(oferta[0].oferta[i].PRECIOOFERTASINIVA);
                        $log.log(ahorro);
                        ofertaTxtF.ofertas.push({
                            id: oferta[0].ID,
                            description: oferta[0].oferta[i].DESCRIPCIONBASE,
                            cantidad: oferta[0].oferta[i].PRODUCTOS,
                            precio: $filter("currency")(oferta[0].oferta[i].PRECIOOFERTASINIVA),
                            ahorro: $filter("currency")(ahorro)
                        });
                    }
                    $log.log('Before service return: ' + ofertaTxtF);
                    return ofertaTxtF;
                } else if (oferta[0].oferta[0].TIPOPROMOCION === 'COMBO') {
                    var ofertaTxtF = {
                        "ofertas": []
                    }
                    $rootScope.tipoDeOferta = 'Combo';
                    $log.info($rootScope.tipoDeOferta);
                    var combo = [];
                    var precioCombo;
                    for (var j = 0; j < oferta[0].oferta.length; j++) {
                        if (j === 0) {
                            combo.push({
                                nombre: oferta[0].oferta[j].DESCRIPCIONBASE,
                                id: oferta[0].oferta[j].PRODUCTOBASE
                            });
                        } else {
                            combo.push({
                                nombre: oferta[0].oferta[j].DESCRIPCIONBASE,
                                id: oferta[0].oferta[j].PRODUCTOBASE
                            });
                            precioCombo = oferta[0].oferta[j].PREVTAOFERTACONIVA;
                        }
                    }
                    ofertaTxtF.ofertas.push({
                        producto1: combo[0],
                        producto2: combo[1],
                        precio: $filter("currency")(precioCombo)
                    });
                    $log.log(combo);
                    return ofertaTxtF;
                }
            } else{
            	$log.info('Sin oferta');
            }

        };
    }]);
