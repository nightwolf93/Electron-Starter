class Main
  constructor: ->
    @app = angular.module('perplexe', ["ngRoute"])
    # Setup routes
    @app.config ["$routeProvider", ($routeProvider, $scope) ->
      $routeProvider
        .when '/', {
          templateUrl: 'partials/index.html',
          controller: 'IndexCtrl'
        }
        .when '/music', {
          templateUrl: 'partials/index.html',
          controller: 'IndexCtrl'
        }
        .when '/video', {
          templateUrl: 'partials/videos.html',
          controller: 'VideosCtrl'
        }
    ]
    indexController = new IndexController(@app)
    videosController = new VideosController(@app)
    @app.run ($rootScope, $templateCache) ->
      console.log 'Started app'
      UI.initialize()
      Database.initialize()

$ ->
  main = new Main()

window.Main = Main
