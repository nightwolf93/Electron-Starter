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
        $('.add-torrent-input').change(function(e) {
          var file, path;
          file = this.files[0];
          path = file.path;
          return TorrentService.addToQueue(path);
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
        console.log('Started');
        return TorrentService.initialize();
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

(function() {
  var TorrentInstance, TorrentService, WebTorrent;

  WebTorrent = require('webtorrent');

  TorrentService = (function() {
    function TorrentService() {}

    TorrentService.initialize = function() {
      TorrentService.Client = new WebTorrent();
      return TorrentService.Queue = [];
    };

    TorrentService.addToQueue = function(torrentId) {
      return TorrentService.Client.add(torrentId, function(torrent) {
        var instance;
        instance = new TorrentInstance(torrent);
        return TorrentService.Queue.push(instance);
      });
    };

    return TorrentService;

  })();

  TorrentInstance = (function() {
    function TorrentInstance(torrent1) {
      this.torrent = torrent1;
      this.dom = null;
      this.buildTemplate();
      console.log('Client is downloading:', this.torrent);
      this.torrent.on('wire', (function(_this) {
        return function(wire, addr) {
          return console.log('connected to peer with address ' + addr);
        };
      })(this));
      this.torrent.on('download', (function(_this) {
        return function() {
          _this.dom.find('.progress-bar').css('width', (_this.torrent.progress * 100) + '%');
          _this.dom.find('.progress-text').text((_this.torrent.progress * 100).toFixed(2) + '%');
          _this.dom.find('.download-speed').text(filesize(_this.torrent.downloadSpeed()) + "/s");
          return console.log(_this.torrent);
        };
      })(this));
      this.torrent.on('done', (function(_this) {
        return function() {
          _this.dom.find('.progress-bar').css('width', '100%');
          _this.dom.find('.progress-text').text('100%');
          console.log('torrent finished downloading');
          return _this.torrent.files.forEach(function(file) {
            return console.log(file);
          });
        };
      })(this));
    }

    TorrentInstance.prototype.buildTemplate = function() {
      var html;
      html = Templates["torrent-row"]({
        name: this.torrent.name,
        size: filesize(this.torrent.length),
        progress: 0,
        downloadSpeed: 0,
        uploadSpeed: 0
      });
      return this.dom = $(html).appendTo("#torrent-list");
    };

    return TorrentInstance;

  })();

  window.TorrentService = TorrentService;

}).call(this);
