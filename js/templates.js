this["Templates"] = this["Templates"] || {};
this["Templates"]["add-video-popover"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<h3>Ajouter une vidéo</h3>\r\n<input type=\"text\" class=\"input-large\" data-input=\"add-video\" placeholder=\"URL de votre vidéo ..\" />\r\n<div style=\"text-align: right; margin-top: 5px;\">\r\n  <div class=\"button\" data-action=\"close-popover\">Annuler</div>\r\n  <div class=\"button\" data-action=\"add-video\">Ajouter</div>\r\n</div>\r\n";
},"useData":true});
this["Templates"]["playlist"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "    <tr class=\"table-item\">\r\n      <td class=\"td-1\"><i class=\"fa fa-youtube-play\" style=\"font-size: 35px;\"></i></td>\r\n      <td>"
    + alias3(((helper = (helper = helpers.fileName || (depth0 != null ? depth0.fileName : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"fileName","hash":{},"data":data}) : helper)))
    + "</td>\r\n      <td>"
    + alias3(((helper = (helper = helpers.createDate || (depth0 != null ? depth0.createDate : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"createDate","hash":{},"data":data}) : helper)))
    + "</td>\r\n      <!--\r\n      <td>\r\n        <div class=\"progress-bar\" style=\"width: 100%;\"></div>\r\n        <div class=\"centered-text progress-text\">100%</div>\r\n      </td>\r\n      -->\r\n    </tr>\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<table class=\"playlist-table ptable\" style=\"width: 100%; height: 100%;\" cellspacing=\"0\" cellpadding=\"0\">\r\n  <tr>\r\n    <th style=\"width: 10%;\"> </th>\r\n    <th style=\"width: 70%;\"><i class=\"fa fa-sort\"></i> Nom</th>\r\n    <th style=\"width: 20%;\"><i class=\"fa fa-sort\"></i> Date d'ajout</th>\r\n  </tr>\r\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.files : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "</table>\r\n\r\n<style>\r\n\r\n  .table-item:hover .td-1 {\r\n    color: white;\r\n  }\r\n\r\n  .td-1 {\r\n    font-size: 35px;\r\n    text-align: center;\r\n    color: #757B7E;\r\n    transition: 0.2s;\r\n  }\r\n\r\n</style>\r\n";
},"useData":true});