class IndexController
  constructor: (@app) ->
    @app.controller 'IndexCtrl', ($scope) ->
      $("[data-menu='add-video']").click ->
        UI.openPopover "add-video-popover", {}

      $('body').on 'click', '[data-action="close-popover"]', ->
        UI.closePopover()

      $('body').on 'click', '[data-action="add-video"]', ->
        UI.closePopover()
        Youtube.downloadVideo $('[data-input="add-video"]').val(), (video, fileName) =>
          file = new YoutubeFile(video, fileName)
          file.fromDownload()
          FileManager.addFile file
          refreshTable()

      loadFromDatabase = () ->
        FileManager.Files = []
        Database.DB.find {type:"file"}, (err, files) =>
          for f in files
            yfile = new YoutubeFile null, f.filePath
            yfile.fromDatabase f
            FileManager.addFile yfile
          refreshTable()

      refreshTable = () ->
        console.log 'Refresh table ..'
        html = Templates["playlist"]({files: FileManager.Files})
        $("#main-content").html html

      loadFromDatabase()

window.IndexController = IndexController
