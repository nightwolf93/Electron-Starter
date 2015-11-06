WebTorrent = require('webtorrent')

class TorrentService
  @initialize: ->
    TorrentService.Client = new WebTorrent()
    TorrentService.Queue = []
  @addToQueue: (torrentId) ->
    TorrentService.Client.add torrentId, (torrent) ->
      instance = new TorrentInstance(torrent)
      TorrentService.Queue.push instance

class TorrentInstance
  constructor: (@torrent) ->
    @dom = null
    @buildTemplate()
    console.log 'Client is downloading:', @torrent
    @torrent.on 'wire', (wire, addr) =>
      console.log('connected to peer with address ' + addr)
    @torrent.on 'download', =>
      @dom.find('.progress-bar').css 'width', (@torrent.progress * 100) + '%'
      @dom.find('.progress-text').text (@torrent.progress * 100).toFixed(2) + '%'
      @dom.find('.download-speed').text filesize(@torrent.downloadSpeed()) + "/s"
      console.log @torrent
    @torrent.on 'done', =>
      @dom.find('.progress-bar').css 'width', '100%'
      @dom.find('.progress-text').text '100%'
      console.log('torrent finished downloading');
      @torrent.files.forEach (file) =>
         console.log file

  buildTemplate: ->
    html = Templates["torrent-row"]({
        name: @torrent.name
        size: filesize(@torrent.length)
        progress: 0
        downloadSpeed: 0
        uploadSpeed: 0
      })
    @dom = $(html).appendTo("#torrent-list")

window.TorrentService = TorrentService
