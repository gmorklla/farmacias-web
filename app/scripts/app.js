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
          templateUrl: 'views/siminotas.html'
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
        templateUrl: 'views/medicamentos.html'
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
  }]);
