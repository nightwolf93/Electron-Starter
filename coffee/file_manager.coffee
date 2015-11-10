class FileManager
  @addFile: (file) ->
    FileManager.Files.push file

FileManager.Files = []
window.FileManager = FileManager

class YoutubeFile
  constructor: (@video, @filePath) ->
    console.log 'New youtube file'

  fromDatabase: (obj) ->
    @createDate = obj.createDate
    @fileName = obj.fileName
    @musicFilePath = obj.musicPath
    @musicFileName = obj.musicName

  fromDownload: ->
    @createDate = moment().format()
    @fileName = @filePath.split('/')[2]
    @musicFilePath = './library/musics/' + @fileName.replace(".mp4", ".mp3")
    @musicFileName = @fileName.replace(".mp4", ".mp3")
    console.log "New video : ", @video, @fileName
    @convertToMp3()

  convertToMp3: ->
    ffmpeg = require('fluent-ffmpeg');
    command = new ffmpeg(@filePath);
    if process.platform != 'darwin'
      command.setFfmpegPath("./lib/ffmpeg/bin/ffmpeg.exe")
      command.setFfprobePath("./lib/ffmpeg/bin/ffprobe.exe")
      command.setFlvtoolPath("./lib/ffmpeg/bin/ffplay.exe")
    else
      command.setFfmpegPath("./lib/ffmpeg/bin/ffmpeg")
      command.setFfprobePath("./lib/ffmpeg/bin/ffprobe")
      command.setFlvtoolPath("./lib/ffmpeg/bin/ffplay")
    command.withAudioCodec('libmp3lame').toFormat('mp3')
    Database.saveFile @
    UI.closePopover()
    command.saveToFile @musicFilePath, (stdout, stderr) =>
      console.log 'done'

window.YoutubeFile = YoutubeFile
