class IndexController
  constructor: (@app) ->
    @app.controller 'IndexCtrl', ($scope) ->
      $(".bubble-red").click ->
        remote = require('remote')
        remote.getCurrentWindow().close()
      $(".bubble-orange").click ->
        remote = require('remote')
        remote.getCurrentWindow().minimize()

      # Menu item
      $('.add-torrent-input').change (e) ->
        file = @files[0]
        path = file.path
        TorrentService.addToQueue path

      $('[data-menu="add-torrent"]').click ->
        $('.add-torrent-input').click()

window.IndexController = IndexController
