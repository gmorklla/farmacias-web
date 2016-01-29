'use strict';

/**
 * @ngdoc overview
 * @name farmaciasWebApp
 * @description
 * # farmaciasWebApp
 *
 * Main module of the application.
 */
angular
    .module('farmaciasWebApp', [
        'ui.router',
        'ngAnimate',
        'ngAria',
        'ngCookies',
        'ngMessages',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'angularUtils.directives.dirPagination',
        'angularUtils.directives.uiBreadcrumbs',
        'youtube-embed',
        'ngStorage',
        '720kb.socialshare'
    ])
    .config(['$locationProvider', '$stateProvider', '$urlRouterProvider', '$httpProvider', '$sceDelegateProvider', function($locationProvider, $stateProvider, $urlRouterProvider, $httpProvider, $sceDelegateProvider) {
        $locationProvider.hashPrefix('!');
        $httpProvider.defaults.useXDomain = true;
        $httpProvider.useApplyAsync(true);
        delete $httpProvider.defaults.headers.common['X-Requested-With'];

        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('inicio', {
                url: "/",
                'views': {
                    'nav': {
                        templateUrl: 'views/nav.html',
                        controller: 'NavCtrl',
                        controllerAs: 'nav'
                    },
                    'home': {
                        templateUrl: 'views/inicio.html',
                        controller: 'InicioCtrl',
                        controllerAs: 'inicio'
                    },
                    'barra': {
                        templateUrl: 'views/barra.html',
                        controller: 'BarraCtrl',
                        controllerAs: 'barra'
                    },
                    'siminotas': {
                        templateUrl: 'views/siminotas.html',
                        controller: 'SiminotasCtrl',
                        controllerAs: 'siminotas'
                    },
                    'footer': {
                        templateUrl: 'views/footer.html'
                    }
                },
                data: {
                    pageTitle: 'Home'
                },
                ncyBreadcrumb: {
                    label: 'Farmacias Similares'
                }
            })
            .state('medicamentos', {
                url: "/medicamentos",
                'views': {
                    'nav': {
                        templateUrl: 'views/nav.html',
                        controller: 'NavCtrl',
                        controllerAs: 'nav'
                    },
                    'home@': {
                        templateUrl: 'views/medicamentos.html',
                        controller: 'MedicamentosCtrl',
                        controllerAs: 'medicamentos'
                    },
                    'barra@': {
                        template: '',
                        controller: 'BarraCtrl',
                        controllerAs: 'barra'
                    },
                    'siminotas@': {
                        template: ''
                    },
                    'footer': {
                        templateUrl: 'views/footer.html'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Medicamentos'
                }
            })
            .state('medicamentos.detalle', {
                url: "/:idProducto/:medicamentoId",
                'views': {
                    'nav': {
                        templateUrl: 'views/nav.html',
                        controller: 'NavCtrl',
                        controllerAs: 'nav'
                    },
                    'home@': {
                        templateUrl: 'views/detalle.html',
                        controller: 'DetalleCtrl',
                        controllerAs: 'detalle'
                    },
                    'barra@': {
                        template: '',
                        controller: 'BarraCtrl',
                        controllerAs: 'barra'
                    },
                    'siminotas@': {
                        template: ''
                    },
                    'footer': {
                        templateUrl: 'views/footer.html'
                    }
                },
                ncyBreadcrumb: {
                    label: '{{$stateParams.medicamentoId}}'
                }
            })
            .state('localiza', {
                url: "/localiza",
                'views': {
                    'nav': {
                        templateUrl: 'views/nav.html',
                        controller: 'NavCtrl',
                        controllerAs: 'nav'
                    },
                    'home@': {
                        templateUrl: 'views/localiza.html',
                        controller: 'localizaCtrl',
                        controllerAs: 'localiza'
                    },
                    'barra@': {
                        template: '',
                        controller: 'BarraCtrl',
                        controllerAs: 'barra'
                    },
                    'siminotas@': {
                        template: ''
                    },
                    'footer': {
                        templateUrl: 'views/footer.html'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Localiza tu unidad'
                }
            })
            .state('nota', {
                url: "/siminotas/:notaId",
                'views': {
                    'nav': {
                        templateUrl: 'views/nav.html',
                        controller: 'NavCtrl',
                        controllerAs: 'nav'
                    },
                    'home@': {
                        templateUrl: 'views/nota.html',
                        controller: 'NotaCtrl',
                        controllerAs: 'nota'
                    },
                    'barra@': {
                        template: '',
                        controller: 'BarraCtrl',
                        controllerAs: 'barra'
                    },
                    'siminotas@': {
                        template: ''
                    },
                    'footer': {
                        templateUrl: 'views/footer.html'
                    }
                },
                ncyBreadcrumb: {
                    label: '{{$stateParams.notaId}}'
                }
            })
            .state('calidad', {
                url: "/calidad",
                'views': {
                    'nav': {
                        templateUrl: 'views/nav.html',
                        controller: 'NavCtrl',
                        controllerAs: 'nav'
                    },
                    'home@': {
                        templateUrl: 'views/controlCalidad.html'
                    },
                    'barra@': {
                        template: '',
                        controller: 'BarraCtrl',
                        controllerAs: 'barra'
                    },
                    'siminotas@': {
                        template: ''
                    },
                    'footer': {
                        templateUrl: 'views/footer.html'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Control de Calidad'
                }
            })
            .state('contacto', {
                url: "/contacto",
                'views': {
                    'nav': {
                        templateUrl: 'views/nav.html',
                        controller: 'NavCtrl',
                        controllerAs: 'nav'
                    },
                    'home@': {
                        templateUrl: 'views/contacto.html',
                        controller: 'ContactCtrl',
                        controllerAs: 'contact'
                    },
                    'barra@': {
                        template: '',
                        controller: 'BarraCtrl',
                        controllerAs: 'barra'
                    },
                    'siminotas@': {
                        template: ''
                    },
                    'footer': {
                        templateUrl: 'views/footer.html'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Contacto'
                }
            })
            .state('carrito', {
                url: "/carrito",
                'views': {
                    'nav': {
                        templateUrl: 'views/nav.html',
                        controller: 'NavCtrl',
                        controllerAs: 'nav'
                    },
                    'home@': {
                        templateUrl: 'views/carrito.html',
                        controller: 'CarritoCtrl',
                        controllerAs: 'carrito'
                    },
                    'barra@': {
                        template: '',
                        controller: 'BarraCtrl',
                        controllerAs: 'barra'
                    },
                    'siminotas@': {
                        template: ''
                    },
                    'footer': {
                        templateUrl: 'views/footer.html'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Carrito'
                }
            })
            .state('carrito.detalle', {
                url: "/:detalleId",
                'views': {
                    'nav': {
                        templateUrl: 'views/nav.html',
                        controller: 'NavCtrl',
                        controllerAs: 'nav'
                    },
                    'home@': {
                        templateUrl: 'views/carritoDetalle.html',
                        controller: 'CarritoDetalleCtrl',
                        controllerAs: 'carritoDetalle'
                    },
                    'barra@': {
                        template: '',
                        controller: 'BarraCtrl',
                        controllerAs: 'barra'
                    },
                    'siminotas@': {
                        template: ''
                    },
                    'footer': {
                        templateUrl: 'views/footer.html'
                    }
                },
                ncyBreadcrumb: {
                    label: '{{$stateParams.detalleId}}'
                }
            })
            .state('vitaminas', {
                url: "/vitaminas",
                'views': {
                    'nav': {
                        templateUrl: 'views/nav.html',
                        controller: 'NavCtrl',
                        controllerAs: 'nav'
                    },
                    'home@': {
                        templateUrl: 'views/vitaminas.html',
                        controller: 'VitaminasCtrl',
                        controllerAs: 'vitaminas'
                    },
                    'barra@': {
                        template: '',
                        controller: 'BarraCtrl',
                        controllerAs: 'barra'
                    },
                    'siminotas@': {
                        template: ''
                    },
                    'footer': {
                        templateUrl: 'views/footer.html'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Vitaminas y suplementos'
                }
            })
            .state('vitaminas.detalle', {
                url: "/:idProducto/:medicamentoId",
                'views': {
                    'nav': {
                        templateUrl: 'views/nav.html',
                        controller: 'NavCtrl',
                        controllerAs: 'nav'
                    },
                    'home@': {
                        templateUrl: 'views/detalle.html',
                        controller: 'DetalleCtrl',
                        controllerAs: 'detalle'
                    },
                    'barra@': {
                        template: '',
                        controller: 'BarraCtrl',
                        controllerAs: 'barra'
                    },
                    'siminotas@': {
                        template: ''
                    },
                    'footer': {
                        templateUrl: 'views/footer.html'
                    }
                },
                ncyBreadcrumb: {
                    label: '{{$stateParams.medicamentoId}}'
                }
            })
            .state('higiene', {
                url: "/higiene",
                'views': {
                    'nav': {
                        templateUrl: 'views/nav.html',
                        controller: 'NavCtrl',
                        controllerAs: 'nav'
                    },
                    'home@': {
                        templateUrl: 'views/higiene.html',
                        controller: 'HigieneCtrl',
                        controllerAs: 'higiene'
                    },
                    'barra@': {
                        template: '',
                        controller: 'BarraCtrl',
                        controllerAs: 'barra'
                    },
                    'siminotas@': {
                        template: ''
                    },
                    'footer': {
                        templateUrl: 'views/footer.html'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Higiene y perfumería'
                }
            })
            .state('higiene.detalle', {
                url: "/:idProducto/:medicamentoId",
                'views': {
                    'nav': {
                        templateUrl: 'views/nav.html',
                        controller: 'NavCtrl',
                        controllerAs: 'nav'
                    },
                    'home@': {
                        templateUrl: 'views/detalle.html',
                        controller: 'DetalleCtrl',
                        controllerAs: 'detalle'
                    },
                    'barra@': {
                        template: '',
                        controller: 'BarraCtrl',
                        controllerAs: 'barra'
                    },
                    'siminotas@': {
                        template: ''
                    },
                    'footer': {
                        templateUrl: 'views/footer.html'
                    }
                },
                ncyBreadcrumb: {
                    label: '{{$stateParams.medicamentoId}}'
                }
            })
            .state('curacion', {
                url: "/curacion",
                'views': {
                    'nav': {
                        templateUrl: 'views/nav.html',
                        controller: 'NavCtrl',
                        controllerAs: 'nav'
                    },
                    'home@': {
                        templateUrl: 'views/curacion.html',
                        controller: 'CuracionCtrl',
                        controllerAs: 'curacion'
                    },
                    'barra@': {
                        template: '',
                        controller: 'BarraCtrl',
                        controllerAs: 'barra'
                    },
                    'siminotas@': {
                        template: ''
                    },
                    'footer': {
                        templateUrl: 'views/footer.html'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Material de Curación'
                }
            })
            .state('curacion.detalle', {
                url: "/:idProducto/:medicamentoId",
                'views': {
                    'nav': {
                        templateUrl: 'views/nav.html',
                        controller: 'NavCtrl',
                        controllerAs: 'nav'
                    },
                    'home@': {
                        templateUrl: 'views/detalle.html',
                        controller: 'DetalleCtrl',
                        controllerAs: 'detalle'
                    },
                    'barra@': {
                        template: '',
                        controller: 'BarraCtrl',
                        controllerAs: 'barra'
                    },
                    'siminotas@': {
                        template: ''
                    },
                    'footer': {
                        templateUrl: 'views/footer.html'
                    }
                },
                ncyBreadcrumb: {
                    label: '{{$stateParams.medicamentoId}}'
                }
            })
            .state('busqueda', {
                url: "/:idProducto/:medicamentoId",
                'views': {
                    'nav': {
                        templateUrl: 'views/nav.html',
                        controller: 'NavCtrl',
                        controllerAs: 'nav'
                    },
                    'home@': {
                        templateUrl: 'views/detalle.html',
                        controller: 'DetalleCtrl',
                        controllerAs: 'detalle'
                    },
                    'barra@': {
                        template: '',
                        controller: 'BarraCtrl',
                        controllerAs: 'barra'
                    },
                    'siminotas@': {
                        template: ''
                    },
                    'footer': {
                        templateUrl: 'views/footer.html'
                    }
                },
                ncyBreadcrumb: {
                    label: '{{$stateParams.medicamentoId}}'
                }
            })
            .state('promociones', {
                url: "/promociones",
                'views': {
                    'nav': {
                        templateUrl: 'views/nav.html',
                        controller: 'NavCtrl',
                        controllerAs: 'nav'
                    },
                    'home@': {
                        templateUrl: 'views/promociones.html',
                        controller: 'PromocionesCtrl',
                        controllerAs: 'promociones'                        
                    },
                    'barra@': {
                        template: '',
                        controller: 'BarraCtrl',
                        controllerAs: 'barra'
                    },
                    'siminotas@': {
                        template: ''
                    },
                    'footer': {
                        templateUrl: 'views/footer.html'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Promociones'
                }
            })
            .state('bienestar', {
                url: "/bienestar",
                'views': {
                    'nav': {
                        templateUrl: 'views/nav.html',
                        controller: 'NavCtrl',
                        controllerAs: 'nav'
                    },
                    'home@': {
                        templateUrl: 'views/bienestar.html',
                        controller: 'BienestarCtrl',
                        controllerAs: 'bienestar'                        
                    },
                    'barra@': {
                        template: '',
                        controller: 'BarraCtrl',
                        controllerAs: 'barra'
                    },
                    'siminotas@': {
                        template: ''
                    },
                    'footer': {
                        templateUrl: 'views/footer.html'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Bienestar'
                }
            })
            .state('nuevos', {
                url: "/nuevos",
                'views': {
                    'nav': {
                        templateUrl: 'views/nav.html',
                        controller: 'NavCtrl',
                        controllerAs: 'nav'
                    },
                    'home@': {
                        templateUrl: 'views/nuevos.html',
                        controller: 'NuevosCtrl',
                        controllerAs: 'nuevos'
                    },
                    'barra@': {
                        template: '',
                        controller: 'BarraCtrl',
                        controllerAs: 'barra'
                    },
                    'siminotas@': {
                        template: ''
                    },
                    'footer': {
                        templateUrl: 'views/footer.html'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Nuevos'
                }
            })
            .state('nuevos.detalle', {
                url: "/:idProducto/:medicamentoId",
                'views': {
                    'nav': {
                        templateUrl: 'views/nav.html',
                        controller: 'NavCtrl',
                        controllerAs: 'nav'
                    },
                    'home@': {
                        templateUrl: 'views/detalle.html',
                        controller: 'DetalleCtrl',
                        controllerAs: 'detalle'
                    },
                    'barra@': {
                        template: '',
                        controller: 'BarraCtrl',
                        controllerAs: 'barra'
                    },
                    'siminotas@': {
                        template: ''
                    },
                    'footer': {
                        templateUrl: 'views/footer.html'
                    }
                },
                ncyBreadcrumb: {
                    label: '{{$stateParams.medicamentoId}}'
                }
            })            
            .state('busquedaGrupo', {
                url: "/:termino",
                'views': {
                    'nav': {
                        templateUrl: 'views/nav.html',
                        controller: 'NavCtrl',
                        controllerAs: 'nav'
                    },
                    'home@': {
                        templateUrl: 'views/busquedaGrupo.html',
                        controller: 'BusquedaCtrl',
                        controllerAs: 'busqueda'
                    },
                    'barra@': {
                        template: '',
                        controller: 'BarraCtrl',
                        controllerAs: 'barra'
                    },
                    'siminotas@': {
                        template: ''
                    },
                    'footer': {
                        templateUrl: 'views/footer.html'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Búsqueda'
                }
            })
            .state('busquedaGrupo.busqueda', {
                url: "/:idProducto/:medicamentoId",
                'views': {
                    'nav': {
                        templateUrl: 'views/nav.html',
                        controller: 'NavCtrl',
                        controllerAs: 'nav'
                    },
                    'home@': {
                        templateUrl: 'views/detalle.html',
                        controller: 'DetalleCtrl',
                        controllerAs: 'detalle'
                    },
                    'barra@': {
                        template: '',
                        controller: 'BarraCtrl',
                        controllerAs: 'barra'
                    },
                    'siminotas@': {
                        template: ''
                    },
                    'footer': {
                        templateUrl: 'views/footer.html'
                    }
                },
                ncyBreadcrumb: {
                    label: '{{$stateParams.medicamentoId}}'
                }
            });
    }])
    .run(['$rootScope', '$window', '$state', 'youTubeList', 'runstatechange', function($rootScope, $window, $state, youTubeList, runstatechange) {

        var w = window.innerWidth;
        var h = window.innerHeight;
        var elemento = document.getElementById('loading');
        elemento.setAttribute("style", "width:" + w + "px");
        elemento.setAttribute("style", "height:" + h + "px");

        $rootScope.$on('$stateChangeStart',
            function(event, toState, toParams, fromState, fromParams) {
                //clearInterval($rootScope.intervalo);
                //$('.carritoPreviewNav').fadeOut("slow");
                runstatechange.onStateChange(toState, fromState);

            });

        $rootScope.$on('$viewContentLoaded',
            function() {
                $("#loading").fadeOut("slow");
            });

        $(window).scroll(function() {
            runstatechange.onScroll();
        });

    }]);
