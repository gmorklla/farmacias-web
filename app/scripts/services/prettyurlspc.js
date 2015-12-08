'use strict';

/**
 * @ngdoc service
 * @name farmaciasWebApp.prettyUrlSpc
 * @description
 * # prettyUrlSpc
 * Service in the farmaciasWebApp.
 */
angular.module('farmaciasWebApp')
  .service('prettyUrlSpc', function () {
	this.prettyUrl = function(source) {
		var find = " ";
		var find2 = "/";
		var fuente = source;
		var indices = [];
		var str = "";
		for (var i = 0; i < fuente.length; ++i) {
			if ( fuente.substring(i, i + find.length) === find || fuente.substring(i, i + find2.length) === find2 ) {
				indices.push(i+2);
				str += ("-" );
				str += (fuente[i+1].toUpperCase() );
				//str.push(fuente[i+1]);
				i++;
			} else {
				str += fuente[i];
				//str.push(fuente[i]);
			}
		}
		return str.toLowerCase();
	};
	
	this.deconfig =  function (source) {
		var find = "-";
		var fuente = source;
		var indices = [];
		var str = "";
		for (var i = 0; i < fuente.length; ++i) {
			if ( fuente.substring(i, i + find.length) === find ) {
				indices.push(i+2);
				str += (" " );
				str += (fuente[i+1]);
				//str.push(fuente[i+1]);
				i++;
			} else {
				str += fuente[i];
				//str.push(fuente[i]);
			}
		}
		return str;	
	};	
  });
