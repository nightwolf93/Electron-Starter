class IndexController
  constructor: (@app) ->
    @app.controller 'IndexCtrl', ($scope) ->
      $scope.message = "lol"

window.IndexController = IndexController
