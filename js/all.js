(function() {
  var Database;

  Database = (function() {
    function Database() {}

    Database.initialize = function() {
      var Datastore;
      Datastore = require('nedb');
      Database.DB = new Datastore({
        filename: "./data/data.db",
        autoload: true
      });
      return console.log("Connected to database");
    };

    Database.saveFile = function(file) {
      return Database.DB.insert({
        fileName: file.fileName,
        filePath: file.filePath,
        musicPath: file.musicFilePath,
        musicName: file.musicFileName
      }, function() {});
    };

    return Database;

  })();

  window.Database = Database;

}).call(this);

(function() {
  var FileManager, YoutubeFile;

  FileManager = (function() {
    function FileManager() {}

    FileManager.addFile = function(file) {
      return FileManager.Files.push(file);
    };

    return FileManager;

  })();

  FileManager.Files = [];

  window.FileManager = FileManager;

  YoutubeFile = (function() {
    function YoutubeFile(video, filePath) {
      this.video = video;
      this.filePath = filePath;
      this.createDate = moment().format();
      this.fileName = this.filePath.split('/')[2];
      this.musicFilePath = './library/musics/' + this.fileName.replace(".mp4", ".mp3");
      this.musicFileName = this.fileName.replace(".mp4", ".mp3");
      console.log("New video : ", this.video, this.fileName);
      this.convertToMp3();
    }

    YoutubeFile.prototype.convertToMp3 = function() {
      var command, ffmpeg;
      ffmpeg = require('fluent-ffmpeg');
      command = new ffmpeg(this.filePath);
      command.setFfmpegPath("./lib/ffmpeg/bin/ffmpeg.exe");
      command.setFfprobePath("./lib/ffmpeg/bin/ffprobe.exe");
      command.setFlvtoolPath("./lib/ffmpeg/bin/ffplay.exe");
      command.withAudioCodec('libmp3lame').toFormat('mp3');
      Database.saveFile(this);
      return command.saveToFile(this.musicFilePath, (function(_this) {
        return function(stdout, stderr) {
          return console.log('done');
        };
      })(this));
    };

    return YoutubeFile;

  })();

  window.YoutubeFile = YoutubeFile;

}).call(this);

(function() {
  var IndexController;

  IndexController = (function() {
    function IndexController(app) {
      this.app = app;
      this.app.controller('IndexCtrl', function($scope) {
        var refreshTable;
        $("[data-menu='add-video']").click(function() {
          return UI.openPopover("add-video-popover", {});
        });
        $('body').on('click', '[data-action="close-popover"]', function() {
          return UI.closePopover();
        });
        $('body').on('click', '[data-action="add-video"]', function() {
          Youtube.downloadVideo($('[data-input="add-video"]').val(), (function(_this) {
            return function(video, fileName) {
              var file;
              file = new YoutubeFile(video, fileName);
              FileManager.addFile(file);
              return refreshTable();
            };
          })(this));
          return UI.closePopover();
        });
        refreshTable = function() {
          var html;
          console.log('Refresh table ..');
          html = Templates["playlist"]({
            files: FileManager.Files
          });
          return $("#main-content").html(html);
        };
        return refreshTable();
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
        console.log('Started app');
        UI.initialize();
        return Database.initialize();
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
  var UI;

  UI = (function() {
    function UI() {}

    UI.initialize = function() {
      $(".bubble-red").click(function() {
        var remote;
        remote = require('remote');
        return remote.getCurrentWindow().close();
      });
      return $(".bubble-orange").click(function() {
        var remote;
        remote = require('remote');
        return remote.getCurrentWindow().minimize();
      });
    };

    UI.openPopover = function(tplName, parameters) {
      var html;
      $("#overlay-black").css('pointer-events', 'auto');
      html = Templates[tplName](parameters);
      TweenMax.fromTo("#overlay-black", 0.5, {
        opacity: 0
      }, {
        opacity: 1
      });
      TweenMax.fromTo("#overlay-black .popover", 0.5, {
        marginTop: "-300px"
      }, {
        marginTop: 0
      });
      return $("#overlay-black .popover").html(html);
    };

    UI.closePopover = function() {
      TweenMax.fromTo("#overlay-black", 0.5, {
        opacity: 1
      }, {
        opacity: 0
      });
      TweenMax.fromTo("#overlay-black .popover", 1, {
        marginTop: 0
      }, {
        marginTop: "-300px"
      });
      return $("#overlay-black").css('pointer-events', 'none');
    };

    return UI;

  })();

  window.UI = UI;

}).call(this);

(function() {
  var Youtube, fs, youtubedl;

  fs = require('fs');

  youtubedl = require('youtube-dl');

  Youtube = (function() {
    function Youtube() {}

    Youtube.downloadVideo = function(link, callback) {
      var video, videoInfo;
      video = youtubedl(link, ['--format=18'], {
        cwd: __dirname
      });
      videoInfo = null;
      video.on('info', function(info) {
        console.log('filename: ' + info.filename);
        return videoInfo = info;
      });
      video.on('end', function() {
        var fileName;
        fileName = 'library/videos/' + videoInfo.filename.replace(/[^a-z0-9]/gi, '_').toLowerCase().replace("_mp4", ".mp4");
        fs.rename('library/_temp.mp4', fileName);
        return callback(video, fileName);
      });
      return video.pipe(fs.createWriteStream('library/_temp.mp4'));
    };

    return Youtube;

  })();

  global.Youtube = Youtube;

}).call(this);
