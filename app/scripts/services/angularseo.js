'use strict';

/**
 * @ngdoc service
 * @name farmaciasWebApp.angularSeo
 * @description
 * # angularSeo
 * Service in the farmaciasWebApp.
 */
angular.module('farmaciasWebApp')
    .service('angularSeo',['$rootScope', '$stateParams', '_', 'prettyUrlSpc', 'productoSrv', function($rootScope, $stateParams, _, prettyUrlSpc, productoSrv) {
        this.onStateChange = function(toState) {
        	switch(toState.name){
        		case 'inicio':
        			$rootScope.pageTitulo = 'Inicio';
        		break;
        		case 'localiza':
        			$rootScope.pageTitulo = 'Localiza tu unidad';
        		break;
                case 'localiza.url':
                    $rootScope.pageTitulo = 'Localiza tu unidad';
                break;
        		case 'medicamentos':
        			$rootScope.pageTitulo = 'Medicamentos';
        		break;
        		case 'medicamentos.detalle':
        			$rootScope.pageTitulo = 'Medicamentos';
        			var datos = productoSrv.getProduct();
        			if(datos.NombreProducto){
        				$rootScope.pageTitulo = datos.NombreProducto + ' | Medicamentos';
        			}
        		break;        		
        		case 'higiene':
        			$rootScope.pageTitulo = 'Higiene y perfumería';
        		break;
        		case 'higiene.detalle':
        			$rootScope.pageTitulo = 'Higiene y perfumería';
        			var datos = productoSrv.getProduct();
        			if(datos.NombreProducto){
        				$rootScope.pageTitulo = datos.NombreProducto + ' | Higiene y perfumería';
        			}
        		break;
        		case 'curacion':
        			$rootScope.pageTitulo = 'Material de curación';
        		break;
        		case 'curacion.detalle':
        			$rootScope.pageTitulo = 'Material de curación';
        			var datos = productoSrv.getProduct();
        			if(datos.NombreProducto){
        				$rootScope.pageTitulo = datos.NombreProducto + ' | Material de curación';
        			}
        		break;        		
        		case 'vitaminas':
        			$rootScope.pageTitulo = 'Vitaminas y suplementos';
        		break;
        		case 'vitaminas.detalle':
        			$rootScope.pageTitulo = 'Vitaminas y suplementos';
        			var datos = productoSrv.getProduct();
        			if(datos.NombreProducto){
        				$rootScope.pageTitulo = datos.NombreProducto + ' | Vitaminas y suplementos';
        			}
        		break;        		
        		case 'calidad':
        			$rootScope.pageTitulo = 'Control de calidad';
        		break;
        		case 'contacto':
        			$rootScope.pageTitulo = 'Contacto';
        		break;
        		case 'promociones':
        			$rootScope.pageTitulo = 'Lo nuevo';
        		break;
        		case 'bienestar':
        			$rootScope.pageTitulo = 'Bienestar';
        		break;
        		case 'nuevos':
        			$rootScope.pageTitulo = 'Productos nuevos';
        		break;
                case 'bolsa':
                    $rootScope.pageTitulo = 'Bolsa de Trabajo';
                break;                
        		case 'nuevos.detalle':
        			$rootScope.pageTitulo = 'Productos nuevos';
        			var datos = productoSrv.getProduct();
        			if(datos.NombreProducto){
        				$rootScope.pageTitulo = datos.NombreProducto + ' | Productos nuevos';
        			}
        		break;
        		case 'nota':
        			$rootScope.pageTitulo = 'Siminotas';
        			if(!_.isEmpty($stateParams)){
        				var getState = setTimeout(espera, 500);
        			}
        		break;
        		case 'busquedaGrupo':
        			$rootScope.pageTitulo = 'Búsqueda';
        			if(!_.isEmpty($stateParams)){
        				var getState = setTimeout(esperaB, 500);
        			}
        		break;
        		case 'busquedaGrupo.detalle':
        			$rootScope.pageTitulo = 'Búsqueda';
        			var datos = productoSrv.getProduct();
        			if(datos.NombreProducto){
        				$rootScope.pageTitulo = datos.NombreProducto + ' | Búsqueda';
        			}
        		break;        		
        	}
        };

    	function espera() {
    		var resultado = prettyUrlSpc.deconfig($stateParams.notaId);
    		resultado = prettyUrlSpc.capitalize(resultado);
    		$rootScope.pageTitulo = resultado + ' | Siminotas';
    	};
    	function esperaB() {
    		var resultado = prettyUrlSpc.deconfig($stateParams.termino);
    		resultado = prettyUrlSpc.capitalize(resultado);
    		$rootScope.pageTitulo = resultado + ' | Búsqueda';
    	};
    }]);
