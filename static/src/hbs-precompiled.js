(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['ad-list-item/ad-list-item'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"ad-list-item "
    + alias4(((helper = (helper = lookupProperty(helpers,"status") || (depth0 != null ? lookupProperty(depth0,"status") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"status","hash":{},"data":data,"loc":{"start":{"line":1,"column":25},"end":{"line":1,"column":35}}}) : helper)))
    + "\">\r\n    <div class=\"info\">\r\n        <span class=\"name\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":3,"column":27},"end":{"line":3,"column":35}}}) : helper)))
    + "</span>\r\n        <span class=\"stats\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"stats") || (depth0 != null ? lookupProperty(depth0,"stats") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"stats","hash":{},"data":data,"loc":{"start":{"line":4,"column":28},"end":{"line":4,"column":37}}}) : helper)))
    + "</span>\r\n    </div>\r\n    <div class=\"indicator\"></div>\r\n</div>";
},"useData":true});
templates['banners/banners'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id=\"page-my-banners\">\r\n    <div class=\"navbar\"></div>\r\n\r\n    <div class=\"contents\">\r\n        <div class=\"ad-list\">\r\n            <h1>Мои объявления</h1>\r\n            <button class=\"primary\">Создать объявление</button>\r\n            <div class=\"list\">\r\n                <p class=\"none-msg\">Нет объявлений</p>\r\n            </div>\r\n        </div>\r\n        <div class=\"main-section\"></div>\r\n    </div>\r\n</div>";
},"useData":true});
templates['button/button'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<button class=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"type") || (depth0 != null ? lookupProperty(depth0,"type") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"type","hash":{},"data":data,"loc":{"start":{"line":1,"column":15},"end":{"line":1,"column":23}}}) : helper)))
    + " "
    + alias4(((helper = (helper = lookupProperty(helpers,"disabled") || (depth0 != null ? lookupProperty(depth0,"disabled") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"disabled","hash":{},"data":data,"loc":{"start":{"line":1,"column":24},"end":{"line":1,"column":36}}}) : helper)))
    + "\">\r\n    "
    + alias4(((helper = (helper = lookupProperty(helpers,"text") || (depth0 != null ? lookupProperty(depth0,"text") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"text","hash":{},"data":data,"loc":{"start":{"line":2,"column":4},"end":{"line":2,"column":12}}}) : helper)))
    + "\r\n</button>";
},"useData":true});
templates['form/form'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\""
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"class") || (depth0 != null ? lookupProperty(depth0,"class") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"class","hash":{},"data":data,"loc":{"start":{"line":1,"column":12},"end":{"line":1,"column":21}}}) : helper)))
    + "\"></div>";
},"useData":true});
templates['input-field/input-field'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"input-field\">\r\n    <input type=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"type") || (depth0 != null ? lookupProperty(depth0,"type") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"type","hash":{},"data":data,"loc":{"start":{"line":2,"column":17},"end":{"line":2,"column":25}}}) : helper)))
    + "\" name=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":2,"column":33},"end":{"line":2,"column":41}}}) : helper)))
    + "\" id=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":2,"column":47},"end":{"line":2,"column":55}}}) : helper)))
    + "\" placeholder=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"placeholder") || (depth0 != null ? lookupProperty(depth0,"placeholder") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"placeholder","hash":{},"data":data,"loc":{"start":{"line":2,"column":70},"end":{"line":2,"column":85}}}) : helper)))
    + "\">\r\n    <p class=\"error-msg\"></p>\r\n</div>";
},"useData":true});
templates['profile/profile'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id=\"page-profile\">\r\n    <div class=\"navbar\"></div>\r\n\r\n    <div class=\"contents\">\r\n        <div class=\"main\">\r\n            <div class=\"button-container\"></div>\r\n        </div>\r\n    </div>\r\n</div>";
},"useData":true});
templates['sign-in/sign-in'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id=\"page-sign-in\" class=\"sign-in-up\">\r\n    <div class=\"container\"></div>\r\n</div>";
},"useData":true});
templates['sign-up/sign-up'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id=\"page-sign-up\" class=\"sign-in-up\">\r\n    <div class=\"container\">\r\n        <div class=\"offer-block\">\r\n            <h1>С возвращением!</h1>\r\n            <p>Войдите в аккаунт, чтобы получить доступ к размещению</p>\r\n        </div>\r\n    </div>\r\n</div>";
},"useData":true});
})();