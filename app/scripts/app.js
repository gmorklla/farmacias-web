
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
    'ngStorage'
  ])
  .config(['$locationProvider', '$stateProvider', '$urlRouterProvider', '$httpProvider', function ($locationProvider, $stateProvider, $urlRouterProvider, $httpProvider) {
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
        url: "/:medicamentoId",
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
        templateUrl: 'views/contacto.html'
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
        url: "/:medicamentoId",
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
        url: "/:medicamentoId",
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
        url: "/:medicamentoId",
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
  .run(['$rootScope', '$window', 'youTubeList', function($rootScope, $window, youTubeList) {

    var w = window.innerWidth;
    var h = window.innerHeight;
    var elemento = document.getElementById('loading');
    elemento.setAttribute("style","width:" + w + "px");
    elemento.setAttribute("style","height:" + h + "px");

    $rootScope.$on('$stateChangeStart', 
      function(event, toState, toParams, fromState, fromParams){
        clearInterval($rootScope.intervalo);
        $('.carritoPreviewNav').fadeOut( "slow" );
        $window.scrollTo(0, 0);        

        if(toState.name === "inicio"){
          $rootScope.ocultarBarra = false;
          var scriptTag = document.getElementById("youtubeTag");
          if (!scriptTag) {
            youTubeList.insertTag();
          }          
        } else {
          $rootScope.ocultarBarra = true;
        }

        if(toState.name === "localiza"){
          console.log('Localiza');
        }

    });

    $rootScope.$on('$viewContentLoaded', 
      function(){
        $( "#loading" ).fadeOut( "slow" );
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
