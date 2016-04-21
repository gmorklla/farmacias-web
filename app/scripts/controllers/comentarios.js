'use strict';

/**
 * @ngdoc function
 * @name farmaciasWebApp.controller:CommentCtrl
 * @description
 * # CommentCtrl
 * Controller of the farmaciasWebApp
 */
angular.module('farmaciasWebApp')
	.controller('CommentCtrl', ['LoadCommentsSrv', '$scope', '$log', '$stateParams', 'jQuery', function(LoadCommentsSrv, $scope, $log, $stateParams, $) {
		// Usa servicio 'LoadCommentsSrv.httpReq' para cargar los comentarios correpondientes
		$scope.getComments = function(url, inicio, cuantos) {
			var comentarios = LoadCommentsSrv.httpReq(url, inicio, cuantos);

			comentarios.then(function(datos) {
				$scope.comentarios = JSON.parse(datos.data.d);
			}, function(e) {
				console.log(e);
			});
		};

		var notaAct = $stateParams.notaId;
		var url;

		switch (notaAct) {
			case 'sientete-ligero':
				url = '/temas/Sientete ligero';
				break;
			case 'es-momento-de-lucir-tu-belleza':
				url = '/temas/Eternal Secret';
				break;
			case 'ejercicios-fuera-de-casa':
				url = '/temas/Ejercicios';
				break;
			case 'tips-para-reducir-masa-corporal':
				url = '/temas/Tips para reducir';
				break;
			case 'como-cuidar-las-articulaciones':
				url = '/temas/Como cuidar';
				break;
			case 'suero-colageno-hidrolizado-eternal-secret':
				url = '/temas/Suero Colageno';
				break;
			default:
				url = notaAct;
		}
		// Llama a la función que carga los comentarios
		$scope.getComments(url, '10000', '100');
		// Hace scroll al top de los comentarios para leer los siguientes
		$scope.scrollToTop = function() {
			$('html, body').animate({
				scrollTop: $("#comentariosTitle").offset().top
			}, 1000);
		};
		// Usa servicio 'LoadCommentsSrv.httpLike' para darle like a un comentario
		$scope.postLike = function(item) {
			item.C_like++;

			var comentarios = LoadCommentsSrv.httpLike(item.clave);

			comentarios.then(function(datos) {
				$scope.likes = JSON.parse(datos.data.d);
			}, function(e) {
				console.log(e);
			});
		};
		// Usa servicio 'LoadCommentsSrv.httpDislike' para darle dislike a un comentario
		$scope.postDislike = function(item) {
			item.C_dislike++;

			var comentarios = LoadCommentsSrv.httpDislike(item.clave);

			comentarios.then(function(datos) {
				$scope.likes = JSON.parse(datos.data.d);
			}, function(e) {
				console.log(e);
			});
		};
		// Abre Modal para escribir comentario
		$scope.openModal = function(item) {
			$('#exampleModal').modal();
			if (typeof item === 'number') {
				$scope.claveComentarioPadre = item;
			} else {
				$scope.claveComentarioPadre = 0;
			}
		};
		// Cierra Modal y resetea campos
		$scope.closeModal = function () {
			$('#exampleModal').modal('hide');
			$scope.commentName = '';
			$scope.commentText = '';			
			$scope.commentForm.$setUntouched();
		};
		// Usa servicio 'LoadCommentsSrv.httpComment' para postear comentario
		$scope.postComment = function() {
			console.log($scope.claveComentarioPadre);
			console.log($scope.commentName);
			console.log($scope.commentText);
			console.log(url);

			var comentarios = LoadCommentsSrv.httpComment($scope.commentName, $scope.commentText, url, $scope.claveComentarioPadre);

			comentarios.then(function(datos) {
				$scope.likes = JSON.parse(datos.data.d);
			}, function(e) {
				console.log(e);
			});
			
			$('#exampleModal').modal('hide');
			$scope.commentName = '';
			$scope.commentText = '';
			$scope.commentForm.$setUntouched();

		};

	}]);