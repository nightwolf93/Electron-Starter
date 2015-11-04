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
      $('.add-torrent-input').change ->
        console.log 'change'
      $('[data-menu="add-torrent"]').click ->
        $('.add-torrent-input').click()

window.IndexController = IndexController
