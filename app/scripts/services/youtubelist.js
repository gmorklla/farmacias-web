'use strict';

/**
 * @ngdoc service
 * @name farmaciasWebApp.youTubeList
 * @description
 * # youTubeList
 * Service in the farmaciasWebApp.
 */
angular.module('farmaciasWebApp')
  .service('youTubeList', ['$rootScope', function ($rootScope) {
  	this.getVids = function () {
	  	var listaVideos = []
	  	return new Promise(function (resolve, reject) {
			$.get(
				        "https://www.googleapis.com/youtube/v3/playlistItems",{
				        part : 'snippet', 
				        maxResults : 25,
				        playlistId : 'PLIsp8dpzwfEMSZMM1BtcSk3H0a8yzNP2R',
				        key: 'AIzaSyB_JIsaXkFIo51uyD6WgifZd2f6FJDx2V8'},
				        function(data) {
				            var results;
				            $.each( data.items, function( i, item ) {
				              var video = {
				                titulo: item.snippet.title,
				                id: item.snippet.resourceId.videoId,
				                thumb: item.snippet.thumbnails.default.url
				              }
				              listaVideos.push(video);
				            });
				            //console.log(listaVideos);
				        }
	         		).then(function (datos) {
	         			resolve(listaVideos);
	         		}, function (e) {
	         			reject(e);
	         		});
	  	});	
  	}

  }]);
