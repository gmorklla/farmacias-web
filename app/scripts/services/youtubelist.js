'use strict';

/**
 * @ngdoc service
 * @name farmaciasWebApp.youTubeList
 * @description
 * # youTubeList
 * Service in the farmaciasWebApp.
 */
angular.module('farmaciasWebApp')
	.service('youTubeList', function() {
		this.getVids = function() {
			var listaVideos = [];
			return $.get(
				"https://www.googleapis.com/youtube/v3/playlistItems", {
					part: 'snippet',
					maxResults: 50,
					playlistId: 'UU_rxdnyzupsXt6xmzw4MuLw',
					key: 'AIzaSyB_JIsaXkFIo51uyD6WgifZd2f6FJDx2V8'
				},
				function(data) {

					$.each(data.items, function(i, item) {
						var video = {
							titulo: item.snippet.title,
							id: item.snippet.resourceId.videoId,
							thumb: item.snippet.thumbnails.default.url
						};
						listaVideos.push(video);
					});
					//console.log(listaVideos);
				}
			).then(function() {
				return listaVideos;
			}, function(e) {
				return e;
			});
		};
		this.insertTag = function() {
			// Load the IFrame Player API code asynchronously.
			var tag = document.createElement('script');
			tag.src = "https://www.youtube.com/iframe_api";
			tag.id = "youtubeTag";
			var firstScriptTag = document.getElementsByTagName('script')[0];
			firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
		};

	});