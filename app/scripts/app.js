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
    'youtube-embed'
  ])
  .config(['$locationProvider', '$stateProvider', '$urlRouterProvider', '$httpProvider', function ($locationProvider, $stateProvider, $urlRouterProvider, $httpProvider) {
    $locationProvider.hashPrefix('!');
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $urlRouterProvider.otherwise("/");   

    $stateProvider
      .state('inicio', {
          url: "/",
          'views': {
            'nav': {
          templateUrl: 'views/nav.html',
          controller: 'NavControl',
          controllerAs: 'nav'          
          },
          'home': {
          templateUrl: 'views/inicio.html',
          controller: 'InicioControl',
          controllerAs: 'inicio'
          },
          'barra': {
          templateUrl: 'views/barra.html',
          controller: 'BarraControl',
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
          data : { pageTitle: 'Home' },
          ncyBreadcrumb: {
              label: 'Farmacias Similares'
          }
      })
    .state('medicamentos', {
        url: "/medicamentos",
        'views': {
          'nav': {
          templateUrl: 'views/nav.html',
          controller: 'NavControl',
          controllerAs: 'nav'         
        },          
        'home@': {
          templateUrl: 'views/medicamentos.html',
          controller: 'MedicamentosCtrl',
          controllerAs: 'medicamentos'
        },
        'barra@': {
          template: '',
          controller: 'BarraControl',
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
        url: "/:medicamentoId",
        'views': {
          'nav': {
          templateUrl: 'views/nav.html',
          controller: 'NavControl',
          controllerAs: 'nav'         
        },          
        'home@': {
          templateUrl: 'views/detalle.html',
          controller: 'DetalleCtrl',
          controllerAs: 'detalle'        
        },
        'barra@': {
          template: '',
          controller: 'BarraControl',
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
          controller: 'NavControl',
          controllerAs: 'nav'
        },            
        'home@': {
          templateUrl: 'views/localiza.html'
        },
        'barra@': {
          template: '',
          controller: 'BarraControl',
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
          controller: 'NavControl',
          controllerAs: 'nav'
        },          
        'home@': {
          templateUrl: 'views/nota.html',
          controller: 'NotaCtrl',
          controllerAs: 'nota'          
        },
        'barra@': {
          template: '',
          controller: 'BarraControl',
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
          controller: 'NavControl',
          controllerAs: 'nav'        
        },          
        'home@': {
        templateUrl: 'views/controlCalidad.html'
        },
        'barra@': {
          template: '',
          controller: 'BarraControl',
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
          controller: 'NavControl',
          controllerAs: 'nav'        
        },          
        'home@': {
        templateUrl: 'views/contacto.html'
        },
        'barra@': {
          template: '',
          controller: 'BarraControl',
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
  }])
  .run(['$rootScope', '$window', 'youTubeList', function($rootScope, $window, youTubeList) {

    $rootScope.$on('$stateChangeStart', 
      function(event, toState, toParams, fromState, fromParams){

        $window.scrollTo(0, 0);        

        if(toState.name != "inicio"){
          $rootScope.ocultarBarra = true;
        } else {
          $rootScope.ocultarBarra = false;
          var scriptTag = document.getElementById("youtubeTag");
          if (!scriptTag) {
            youTubeList.insertTag();
          }          
        }        

    });

    $(window).scroll(function() {

        var navegacion = $('#navegacion'),
            targetScroll = $('#contenido').position().top,
            currentScroll = $('html').scrollTop() || $('body').scrollTop();

        navegacion.toggleClass('fixedPos', currentScroll >= targetScroll);
        if(currentScroll >= targetScroll){
        $('.navbar-default').css({
          'width':'100%',
          'left':'0',
          'borderRadius':'0'
        });
        }
        else {
        $('.navbar-default').css('borderTopLeftRadius','15px').css('borderTopRightRadius','15px');
        }
    });    

  }]);
