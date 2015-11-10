this["Templates"] = this["Templates"] || {};
this["Templates"]["add-video-popover"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<h3>Ajouter une vidéo</h3>\n<input type=\"text\" class=\"input-large\" data-input=\"add-video\" placeholder=\"URL de votre vidéo ..\" />\n<div style=\"text-align: right; margin-top: 5px;\">\n  <div class=\"button\" data-action=\"close-popover\">Annuler</div>\n  <div class=\"button\" data-action=\"add-video\">Ajouter</div>\n</div>\n";
},"useData":true});
this["Templates"]["loading"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper;

  return "<center>\n  "
    + this.escapeExpression(((helper = (helper = helpers.message || (depth0 != null ? depth0.message : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"message","hash":{},"data":data}) : helper)))
    + "\n  <br />\n  <img src=\"./content/svg/ring.svg\" style=\"width: 65px; margin-top: 15px;\" />\n</center>\n\n<script>\n\n</script>\n";
},"useData":true});
this["Templates"]["playlist"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "    <tr data-id=\""
    + alias3(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"index","hash":{},"data":data}) : helper)))
    + "\" class=\"table-item\">\n      <td class=\"td-1\">\n        <i class=\"fa fa-play bt-play\" style=\"font-size: 25px; margin-right: 5px;\"></i>\n        <i class=\"fa fa-plus\" style=\"font-size: 25px;\"></i>\n      </td>\n      <td>\n        "
    + alias3(((helper = (helper = helpers.musicFileName || (depth0 != null ? depth0.musicFileName : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"musicFileName","hash":{},"data":data}) : helper)))
    + "\n        <br />\n        <span style=\"opacity: 0.2; font-size: 9px;\">"
    + alias3(((helper = (helper = helpers.createDate || (depth0 != null ? depth0.createDate : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"createDate","hash":{},"data":data}) : helper)))
    + "</span>\n      </td>\n      <!--\n      <td>\n        <div class=\"progress-bar\" style=\"width: 100%;\"></div>\n        <div class=\"centered-text progress-text\">100%</div>\n      </td>\n      -->\n    </tr>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<table class=\"playlist-table ptable\" style=\"width: 100%; height: 100%;\" cellspacing=\"0\" cellpadding=\"0\">\n  <tr>\n    <th style=\"width: 10%;\"> </th>\n    <th style=\"width: 90%;\"><i class=\"fa fa-sort\"></i> Nom</th>\n  </tr>\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.files : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "</table>\n\n<style>\n\n  i:hover {\n    color: white;\n  }\n\n  i {\n    cursor: pointer;\n  }\n\n  .td-1 {\n    font-size: 35px;\n    text-align: center;\n    color: #757B7E;\n    transition: 0.2s;\n  }\n\n</style>\n\n<script>\n\n$(\".table-item .bt-play\").click(function() {\n  var file = FileManager.Files[$(this).parent().parent().data('id')];\n  var sound = new Howl({\n    urls: [file.musicFilePath],\n  }).play();\n  $(\"#music-player .seek-control .title\").text(file.musicFileName);\n  setInterval(function(){\n    var pg = $(\".seek-control .progress-bar\");\n    var duration = sound._duration;\n    var currentPos = sound.pos();\n\n    var pgProgressPos = currentPos / duration * 100;\n    console.log(pgProgressPos);\n\n    $(\".seek-control .seek-bt \").css('left', pgProgressPos * (pg.width() / 100) + \"px\");\n  }, 200);\n  //open = require(\"open\");\n  //open(file.musicFilePath);\n});\n\n</script>\n";
},"useData":true});