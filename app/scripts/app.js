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
        templateUrl: 'views/nav.html'
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
        templateUrl: 'views/nav.html'
        },          
        'home@': {
        templateUrl: 'views/detalle.html',
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
        templateUrl: 'partials/nav.html'
        },            
        'home@': {
        templateUrl: 'partials/localiza.html'
        },
        'barra@': {
          template: '',
          controller: 'BarraControl',
        },
        'siminotas@': {
          template: ''
        },        
        'footer': {
        templateUrl: 'partials/footer.html'
        }
          },
      ncyBreadcrumb: {
                label: 'Localiza tu unidad'
            }
    });    
  }])
  .run(['$rootScope', function($rootScope) {

    $rootScope.$on('$stateChangeStart', 
      function(event, toState, toParams, fromState, fromParams){
        var scriptTag = document.getElementById("youtubeTag");
        console.log(scriptTag);
        if (!scriptTag) {
          // Load the IFrame Player API code asynchronously.
          var tag = document.createElement('script');
          tag.src = "https://www.youtube.com/iframe_api";
          tag.id = "youtubeTag"
          var firstScriptTag = document.getElementsByTagName('script')[0];
          firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
          console.log('Youtube!!!');
        }

    });

  }]);
