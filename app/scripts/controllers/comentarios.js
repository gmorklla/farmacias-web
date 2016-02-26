'use strict';

/**
 * @ngdoc function
 * @name farmaciasWebApp.controller:CommentCtrl
 * @description
 * # CommentCtrl
 * Controller of the farmaciasWebApp
 */
angular.module('farmaciasWebApp')
	.controller('CommentCtrl', ['LoadCommentsSrv', '$scope', '$log', '$stateParams', function(LoadCommentsSrv, $scope, $log, $stateParams) {

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
			default:
				url = notaAct;
		};

		$scope.getComments(url, '10000', '100');

		$scope.scrollToTop = function() {
			$('html, body').animate({
				scrollTop: $("#comentariosTitle").offset().top
			}, 1000);
		};

		$scope.postLike = function(item) {
			item.C_like++;

			var comentarios = LoadCommentsSrv.httpLike(item.clave);

			comentarios.then(function(datos) {
				$scope.likes = JSON.parse(datos.data.d);
			}, function(e) {
				console.log(e);
			});
		};

		$scope.postDislike = function(item) {
			item.C_dislike++;

			var comentarios = LoadCommentsSrv.httpDislike(item.clave);

			comentarios.then(function(datos) {
				$scope.likes = JSON.parse(datos.data.d);
			}, function(e) {
				console.log(e);
			});
		};

		$scope.openModal = function(item) {
			$('#exampleModal').modal();
			if (typeof item === 'number') {
				$scope.claveComentarioPadre = item;
			} else {
				$scope.claveComentarioPadre = 0;
			}
		};

		$scope.closeModal = function () {
			$('#exampleModal').modal('hide');
			$scope.commentName = '';
			$scope.commentText = '';			
			$scope.commentForm.$setUntouched();
		};

		$scope.postComment = function() {
			console.log($scope.claveComentarioPadre);
			console.log($scope.commentName);
			console.log($scope.commentText);
			console.log(url);

/*			var comentarios = LoadCommentsSrv.httpComment($scope.commentName, $scope.commentText, url, $scope.claveComentarioPadre);

			comentarios.then(function(datos) {
				$scope.likes = JSON.parse(datos.data.d);
			}, function(e) {
				console.log(e);
			});*/
			
			$('#exampleModal').modal('hide');
			$scope.commentName = '';
			$scope.commentText = '';
			$scope.commentForm.$setUntouched();

		};

	}]);