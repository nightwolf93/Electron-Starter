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
    ]
    indexController = new IndexController(@app)
    @app.run ($rootScope, $templateCache) ->
      console.log 'Started app'
      UI.initialize()
      Database.initialize()

$ ->
  main = new Main()

window.Main = Main
