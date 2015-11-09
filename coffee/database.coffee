class Database
  @initialize: ->
    Datastore = require('nedb')
    Database.DB = new Datastore({ filename: "./data/data.db", autoload: true })
    console.log "Connected to database"

  @saveFile: (file) ->
    Database.DB.insert { fileName: file.fileName, filePath: file.filePath, musicPath: file.musicFilePath, musicName: file.musicFileName }, ->
      

window.Database = Database
