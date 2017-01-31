'use strict';

/**
 * @ngdoc service
 * @name farmaciasWebApp.angularSeo
 * @description: Define los títulos de las páginas de manera dinámica
 * # angularSeo
 * Service in the farmaciasWebApp.
 */
angular.module('farmaciasWebApp')
    .service('angularSeo',['$rootScope', '$stateParams', '_', 'prettyUrlSpc', 'productoSrv', function($rootScope, $stateParams, _, prettyUrlSpc, productoSrv) {
        this.onStateChange = function(toState, toParams) {
            var descripcionG = 'Somos la cadena farmacéutica líder en ventas y distribución en México y América Latina. Aquí encontrarás genéricos de calidad a los mejores precios. ¡Compruébalo!';
        	switch(toState.name){
        		case 'inicio':
        			$rootScope.pageTitulo = 'Inicio';
                    $rootScope.pageDescription = descripcionG;
        		break;
        		case 'localiza':
        			$rootScope.pageTitulo = 'Localiza tu farmacia';
                    $rootScope.pageDescription = 'Farmacias Similares siempre cerca de ti. Encuentra la farmacia más cercana a tu ubicación.';
        		break;
                case 'localiza.url':
                    $rootScope.pageTitulo = 'Localiza tu farmacia';
                    $rootScope.pageDescription = 'Farmacias Similares siempre cerca de ti. Encuentra la farmacia más cercana a tu ubicación.';
                break;
        		case 'medicamentos':
        			$rootScope.pageTitulo = 'Medicamentos';
                    $rootScope.pageDescription = 'Tenemos más de 100 nuevos genéricos. ¡Pregunta por el tuyo!';
        		break;
        		case 'medicamentos.detalle':
                    var dato = prettyUrlSpc.deconfig(toParams.medicamentoId);
                    $rootScope.pageTitulo = dato.toUpperCase() + ' | Medicamentos';
                    $rootScope.pageDescription = 'En Farmacias Similares contamos con ' + dato + ' y más de 100 nuevos genéricos. ¡Pregunta por el tuyo!';
        		break;        		
        		case 'higiene':
        			$rootScope.pageTitulo = 'Higiene y perfumería';
                    $rootScope.pageDescription = 'Encuentra los productos de higiene y perfumería que estás buscando en Farmacias Similares.';
        		break;
        		case 'higiene.detalle':
        			var dato = prettyUrlSpc.deconfig(toParams.medicamentoId);
                    $rootScope.pageTitulo = dato.toUpperCase() + ' | Higiene y perfumería';
                    $rootScope.pageDescription = 'En Farmacias Similares contamos con ' + dato + ' y más productos de higiene y perfumería que seguro te encantarán.';
        		break;
        		case 'curacion':
        			$rootScope.pageTitulo = 'Material de curación';
                    $rootScope.pageDescription = 'Encuentra el material de curación que estás buscando. En Farmacias Similares tenemos lo que estás buscando.';
        		break;
        		case 'curacion.detalle':
                    var dato = prettyUrlSpc.deconfig(toParams.medicamentoId);
                    $rootScope.pageTitulo = dato.toUpperCase() + ' | Material de curación';
                    $rootScope.pageDescription = 'En Farmacias Similares contamos con ' + dato + ' y otros materiales de curación. Ven a Farmacias Similares y pregunta por lo que estás buscando.';        			
        		break;        		
        		case 'vitaminas':
        			$rootScope.pageTitulo = 'Vitaminas y suplementos';
                    $rootScope.pageDescription = 'Si buscas vitaminas y suplementos ven a Farmacias Similares y sorpréndete con la variedad, calidad y excelente precio de nuestras vitaminas y suplementos.';
        		break;
        		case 'vitaminas.detalle':
        			var dato = prettyUrlSpc.deconfig(toParams.medicamentoId);
                    $rootScope.pageTitulo = dato.toUpperCase() + ' | Vitaminas y suplementos';
                    $rootScope.pageDescription = 'En Farmacias Similares contamos con ' + dato + ' y muchas más vitaminas y suplementos. Ven a Farmacias Similares y ¡vitamina tu vida!'; 
        		break;
                case 'herbolario':
                    $rootScope.pageTitulo = 'Rincón herbolario';
                    $rootScope.pageDescription = 'Nuestra cultura no es ajena a la herbolaria. La medicina tradicional mexicana tiene sus orígenes en el uso de plantas para tratar diversos padecimientos, algo que ha perdurado desde las civilizaciones prehispánicas, hasta la actualidad.';
                break;
                case 'herbolario.detalle':
                    var dato = prettyUrlSpc.deconfig(toParams.medicamentoId);
                    $rootScope.pageTitulo = dato.toUpperCase() + ' | Rincón herbolario';
                    $rootScope.pageDescription = 'En Farmacias Similares contamos con ' + dato + ' y muchos más productos. Ven a Farmacias Similares y ¡vitamina tu vida!'; 
                break;        		
        		case 'calidad':
        			$rootScope.pageTitulo = 'Control de calidad';
                    $rootScope.pageDescription = 'Los Genéricos que se ofrecen en Farmacias Similares cuentan con las condiciones de calidad que la ley señala a un precio más bajo, siempre en beneficio de la economía familiar.';
        		break;
                case 'historia':
                    $rootScope.pageTitulo = 'Historia';
                    $rootScope.pageDescription = 'Farmacias Similares, perteneciente al Grupo Por un País Mejor, fue constituida el 8 de Septiembre de 1997, con la finalidad de ofrecer productos y servicios de salud a los estratos más desprotegidos del país.';
                break;
                case 'simitel':
                    $rootScope.pageTitulo = 'Simitel';
                    $rootScope.pageDescription = 'En Simitel 01 800 911 6666 podemos brindarte información de Farmacias Similares, laboratorios, o costos de estudios clínicos, ayuda psicológica profesional, asesoría nutricional o médica y mucho más.';
                break;                
        		case 'contacto':
        			$rootScope.pageTitulo = 'Contacto';
                    $rootScope.pageDescription = 'Ponte en contacto con nosotros, te brindaremos la atención rápida y oportuna que mereces.';
        		break;
        		case 'promociones':
        			$rootScope.pageTitulo = 'Lo nuevo';
                    $rootScope.pageDescription = 'Conoce las nuevas promociones que tenemos en Farmacias Similares para ti.';
        		break;
        		case 'vivir-mejor':
        			$rootScope.pageTitulo = 'Vivir Mejor';
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
                    var dato = prettyUrlSpc.deconfig(toParams.notaId);
                    dato = prettyUrlSpc.capitalize(dato);
                    $rootScope.pageTitulo = dato + ' | Siminotas';
                    $rootScope.pageDescription = 'Todo lo que quieres saber acerca de ' + dato ;
        		break;
        		case 'busquedaGrupo':
                    //var dato = toParams.termino;
                    //dato = prettyUrlSpc.capitalize(dato);
                    //$rootScope.pageTitulo = dato + ' | Búsqueda';
                    $rootScope.pageTitulo = 'Búsqueda';
                    $rootScope.pageDescription = 'En Farmacias Similares contamos con más de 100 nuevos genéricos. ¡Pregunta por el tuyo!';
        		break;
        		case 'busquedaGrupo.detalle':
        			$rootScope.pageTitulo = 'Búsqueda';
        			var datos = productoSrv.getProduct();
        			if(datos.NombreProducto){
        				$rootScope.pageTitulo = datos.NombreProducto + ' | Búsqueda';
        			}
        		break;
                case 'facturacion':
                    $rootScope.pageTitulo = 'Facturación Electrónica';
                break;
                case 'facturacion.faqs':
                    $rootScope.pageTitulo = 'Preguntas Frecuentes | Facturación Electrónica';
                break;                                 
        	}
        };
    }]);
