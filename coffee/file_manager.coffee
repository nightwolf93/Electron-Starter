class FileManager
  @addFile: (file) ->
    FileManager.Files.push file

FileManager.Files = []
window.FileManager = FileManager

class YoutubeFile
  constructor: (@video, @filePath) ->
    @createDate = moment().format()
    @fileName = @filePath.split('/')[2]
    @musicFilePath = './library/musics/' + @fileName.replace(".mp4", ".mp3")
    @musicFileName = @fileName.replace(".mp4", ".mp3")
    console.log "New video : ", @video, @fileName
    @convertToMp3()

  convertToMp3: ->
    ffmpeg = require('fluent-ffmpeg');
    command = new ffmpeg(@filePath);
    command.setFfmpegPath("./lib/ffmpeg/bin/ffmpeg.exe")
    command.setFfprobePath("./lib/ffmpeg/bin/ffprobe.exe")
    command.setFlvtoolPath("./lib/ffmpeg/bin/ffplay.exe")
    command.withAudioCodec('libmp3lame').toFormat('mp3')
    Database.saveFile @
    command.saveToFile @musicFilePath, (stdout, stderr) =>
      console.log 'done'

window.YoutubeFile = YoutubeFile
