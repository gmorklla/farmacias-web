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
		var find3 = " / ";
		var find4 = "  ";
		var find5 = "Ñ";
		var find6 = "  / ";
		var fuente = source;
		var str = "";
		for (var i = 0; i < fuente.length; ++i) {
			if (fuente.substring(i, i + find6.length) === find6){
				str += ("-" );
				str += (fuente[i+find6.length].toUpperCase() );
				//str.push(fuente[i+1]);
				i = i+find6.length;
			} else if (fuente.substring(i, i + find4.length) === find4){
				str += ("-" );
				str += (fuente[i+2].toUpperCase() );
				//str.push(fuente[i+1]);
				i = i+2;
			} else if (fuente.substring(i, i + find3.length) === find3){
				str += ("-" );
				str += (fuente[i+3].toUpperCase() );
				//str.push(fuente[i+1]);
				i = i+3;
			} else if ( fuente.substring(i, i + find.length) === find || fuente.substring(i, i + find2.length) === find2 ) {
				str += ("-" );
				str += (fuente[i+1].toUpperCase() );
				//str.push(fuente[i+1]);
				i++;
			} else if ( fuente.substring(i, i + find5.length) === find5) {
				str += ("N" );
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

	this.capitalize = function (source) {
		var find = "farmacias similares";
		var find2 = "Farmacias similares";
		var find3 = "eternal secret";
		var fuente = source.charAt(0).toUpperCase() + source.substring(1).toLowerCase();
		var str = "";
		for (var i = 0; i < fuente.length; ++i) {
			if (fuente.substring(i, i + find.length) === find || fuente.substring(i, i + find2.length) === find2){
				str += ("Farmacias Similares" );
				str += (fuente[i+find.length].toUpperCase() );
				i = i+find.length;
			} else if (fuente.substring(i, i + find3.length) === find3){
				str += ("Eternal Secret" );
				//str += (fuente[i+find3.length].toUpperCase() );
				i = i+find3.length;
			} else {
				str += fuente[i];
			}
		}		
		return str;
	};

  });
