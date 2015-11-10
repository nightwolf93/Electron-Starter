class VideosController
  constructor: (@app) ->
    @app.controller 'VideosCtrl', ($scope) ->
      console.log 'videosCtrl'

window.VideosController = VideosController
