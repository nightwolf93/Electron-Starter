class IndexController
  constructor: (@app) ->
    @app.controller 'IndexCtrl', ($scope) ->
      $("[data-menu='add-video']").click ->
        UI.openPopover "add-video-popover", {}

      $('body').on 'click', '[data-action="close-popover"]', ->
        UI.closePopover()

      $('body').on 'click', '[data-action="add-video"]', ->
        Youtube.downloadVideo $('[data-input="add-video"]').val(), (video, fileName) =>
          file = new YoutubeFile(video, fileName)
          FileManager.addFile file
          refreshTable()
        UI.closePopover()

      refreshTable = () ->
        console.log 'Refresh table ..'
        html = Templates["playlist"]({files: FileManager.Files})
        $("#main-content").html html

      refreshTable()

window.IndexController = IndexController
