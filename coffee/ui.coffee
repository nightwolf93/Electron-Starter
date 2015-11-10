class UI
  @initialize: ->
    $(".bubble-green").click ->
      remote = require('remote')
      remote.getCurrentWindow().maximize()
    $(".bubble-red").click ->
      remote = require('remote')
      remote.getCurrentWindow().close()
    $(".bubble-orange").click ->
      remote = require('remote')
      remote.getCurrentWindow().minimize()

  @openPopover: (tplName, parameters) ->
    $("#overlay-black").css 'pointer-events', 'auto'
    html = Templates[tplName](parameters)
    TweenMax.fromTo "#overlay-black", 0.5, {opacity: 0}, {opacity: 1}
    TweenMax.fromTo "#overlay-black .popover", 0.5, {marginTop: "-300px"}, {marginTop: 0}
    $("#overlay-black .popover").html html

  @closePopover: ->
    TweenMax.fromTo "#overlay-black", 0.5, {opacity: 1}, {opacity: 0}
    TweenMax.fromTo "#overlay-black .popover", 1, {marginTop: 0}, {marginTop: "-300px"}
    $("#overlay-black").css 'pointer-events', 'none'

window.UI = UI
