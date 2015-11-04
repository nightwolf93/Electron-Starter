(function() {
  var IndexController;

  IndexController = (function() {
    function IndexController(app) {
      this.app = app;
      this.app.controller('IndexCtrl', function($scope) {
        $(".bubble-red").click(function() {
          var remote;
          remote = require('remote');
          return remote.getCurrentWindow().close();
        });
        $(".bubble-orange").click(function() {
          var remote;
          remote = require('remote');
          return remote.getCurrentWindow().minimize();
        });
        $('.add-torrent-input').change(function() {
          return console.log('change');
        });
        return $('[data-menu="add-torrent"]').click(function() {
          return $('.add-torrent-input').click();
        });
      });
    }

    return IndexController;

  })();

  window.IndexController = IndexController;

}).call(this);

(function() {
  var Main;

  Main = (function() {
    function Main() {
      var indexController;
      this.app = angular.module('perplexe', ["ngRoute"]);
      this.app.config([
        "$routeProvider", function($routeProvider, $scope) {
          return $routeProvider.when('/', {
            templateUrl: 'partials/index.html',
            controller: 'IndexCtrl'
          });
        }
      ]);
      indexController = new IndexController(this.app);
      this.app.run(function($rootScope, $templateCache) {
        return console.log('Started');
      });
    }

    return Main;

  })();

  $(function() {
    var main;
    return main = new Main();
  });

  window.Main = Main;

}).call(this);
