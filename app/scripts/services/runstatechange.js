'use strict';

/**
 * @ngdoc service
 * @name farmaciasWebApp.runstatechange
 * @description
 * # runstatechange
 * Service in the farmaciasWebApp.
 */
angular.module('farmaciasWebApp')
    .service('runstatechange', ['$rootScope', '$window', '$state', 'youTubeList', function($rootScope, $window, $state, youTubeList) {
        this.onStateChange = function(toState, fromState) {
            $('.notasAlternas').fadeOut("slow");
            $window.scrollTo(0, 0);

            if (toState.name === "inicio") {
                $rootScope.ocultarBarra = false;
                var scriptTag = document.getElementById("youtubeTag");
                if (!scriptTag) {
                    youTubeList.insertTag();
                }
            } else {
                $rootScope.ocultarBarra = true;
            }

            $rootScope.prevState = fromState.name;
        };
        this.onScroll = function() {
            var navegacion = $('#navegacion'),
                infoPromo = $('#infoPromo'),
                targetScroll = $('#contenido').position().top,
                currentScroll = $('html').scrollTop() || $('body').scrollTop();

            navegacion.toggleClass('fixedPos', currentScroll >= targetScroll);
            infoPromo.toggleClass('fixedPos2', currentScroll >= targetScroll);
            if (currentScroll >= targetScroll) {
                $('.navbar-default').css({
                    'width': '100%',
                    'left': '0',
                    'borderRadius': '0'
                });
                if ($state.$current.name === 'nota') {
                    $('.notasAlternas').fadeIn("slow");
                }
            } else {
                $('.navbar-default').css('borderTopLeftRadius', '15px').css('borderTopRightRadius', '15px');
                if ($state.$current.name === 'nota') {
                    $('.notasAlternas').fadeOut("slow");
                }
            }
        }
    }]);
