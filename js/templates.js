this["Templates"] = this["Templates"] || {};
this["Templates"]["torrent-row"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<tr class=\"torrent-item\">\r\n  <td>"
    + alias3(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"name","hash":{},"data":data}) : helper)))
    + "</td>\r\n  <td>"
    + alias3(((helper = (helper = helpers.size || (depth0 != null ? depth0.size : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"size","hash":{},"data":data}) : helper)))
    + "</td>\r\n  <td>\r\n    <div class=\"progress-bar\" style=\"width: "
    + alias3(((helper = (helper = helpers.progress || (depth0 != null ? depth0.progress : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"progress","hash":{},"data":data}) : helper)))
    + "%;\"></div>\r\n    <div class=\"centered-text progress-text\">"
    + alias3(((helper = (helper = helpers.progress || (depth0 != null ? depth0.progress : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"progress","hash":{},"data":data}) : helper)))
    + "%</div>\r\n  </td>\r\n  <td class=\"download-speed\">"
    + alias3(((helper = (helper = helpers.downloadSpeed || (depth0 != null ? depth0.downloadSpeed : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"downloadSpeed","hash":{},"data":data}) : helper)))
    + "</td>\r\n  <td>"
    + alias3(((helper = (helper = helpers.uploadSpeed || (depth0 != null ? depth0.uploadSpeed : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"uploadSpeed","hash":{},"data":data}) : helper)))
    + "</td>\r\n</tr>\r\n";
},"useData":true});