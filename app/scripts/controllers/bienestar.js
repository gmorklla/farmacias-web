'use strict';

/**
 * @ngdoc function
 * @name farmaciasWebApp.controller:BienestarCtrl
 * @description
 * # BienestarCtrl
 * Controller of the farmaciasWebApp
 */
angular.module('farmaciasWebApp')
    .controller('BienestarCtrl', ['loadData', '$scope', '$log', '$sce', 'jQuery', function(loadData, $scope, $log, $sce, $) {
        $scope.title = 'Bienestar';
        $log.info($scope.title);
        // Usa servicio loadData para cargar los datos sobre los videos
        /*var datos = loadData.httpReq('data/bienestar.json');

        datos.then(function(datos) {
            $scope.vids = datos.data.vids;
            var videoC = $scope.vids[3].url;
            $('#bienestar').attr('src', videoC);
        }, function(e) {
            console.log(e);
        });*/
        // Función para cambiar video del reproductor
        $scope.changeVid = function (url) {
        	$('#bienestar').attr('src', url);
            $('html, body').animate({
                scrollTop: $(".productos").offset().top
            }, 1000);        	
        };
        // Permite play/pause con click en imagen
        $('#bienestar').click(function () {
            if(this.paused){
                this.play();
            } else {
                this.pause();
            }
        });

    }]);
