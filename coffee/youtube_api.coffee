fs = require('fs')
youtubedl = require('youtube-dl')

class Youtube
  @downloadVideo: (link, callback) ->
    video = youtubedl link, ['--format=18'], { cwd: __dirname }
    videoInfo = null
    video.on 'info', (info) ->
      console.log('filename: ' + info.filename)
      videoInfo = info
    video.on 'end', ->
      fileName = 'library/videos/' + videoInfo.filename.replace(/[^a-z0-9]/gi, '_').toLowerCase().replace("_mp4", ".mp4")
      fs.rename 'library/_temp.mp4', fileName
      callback video, fileName
    video.pipe(fs.createWriteStream('library/_temp.mp4'))

global.Youtube = Youtube
