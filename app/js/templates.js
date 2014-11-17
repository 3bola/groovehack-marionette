this["T"] = this["T"] || {};
this["T"]["header"] = this["T"]["header"] || {};
this["T"]["header"]["item"] = this["T"]["header"]["item"] || {};
this["T"]["header"]["item"]["tmpl"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<a href=\"#"
    + escapeExpression(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"url","hash":{},"data":data}) : helper)))
    + "\">"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</a>";
},"useData":true});
this["T"]["header"]["tmpl"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<h1 id=\"logo\">Groovehack</h1>\n<nav>\n  <ul></ul>\n</nav>";
  },"useData":true});
this["T"]["sets"] = this["T"]["sets"] || {};
this["T"]["sets"]["list"] = this["T"]["sets"]["list"] || {};
this["T"]["sets"]["list"]["item"] = this["T"]["sets"]["list"]["item"] || {};
this["T"]["sets"]["list"]["item"]["tmpl"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<a href=\"#\">"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</a>";
},"useData":true});
this["T"]["sets"]["list"]["panel"] = this["T"]["sets"]["list"]["panel"] || {};
this["T"]["sets"]["list"]["panel"]["tmpl"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "";
},"useData":true});
this["T"]["sets"]["list"]["tmpl"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<ul></ul>";
  },"useData":true});
this["T"]["sets"]["tmpl"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<section id=\"list-panel\"></section>\n<section id=\"list-list\"></section>";
  },"useData":true});
this["T"]["welcome"] = this["T"]["welcome"] || {};
this["T"]["welcome"]["tmpl"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<h1>Welcome</h1>";
  },"useData":true});