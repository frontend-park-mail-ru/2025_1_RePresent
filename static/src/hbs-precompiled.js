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
    + "\">\n    <div class=\"info\">\n        <span class=\"name\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":3,"column":27},"end":{"line":3,"column":35}}}) : helper)))
    + "</span>\n        <span class=\"stats\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"stats") || (depth0 != null ? lookupProperty(depth0,"stats") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"stats","hash":{},"data":data,"loc":{"start":{"line":4,"column":28},"end":{"line":4,"column":37}}}) : helper)))
    + "</span>\n    </div>\n    <div class=\"indicator\"></div>\n</div>";
},"useData":true});
templates['banners/banners'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id=\"page-my-banners\">\n    <div class=\"navbar\"></div>\n\n    <div class=\"contents\">\n        <div class=\"ad-list\">\n            <h1>Мои объявления</h1>\n            <button class=\"primary\">Создать объявление</button>\n            <div class=\"list\">\n                <p class=\"none-msg\">Нет объявлений</p>\n            </div>\n        </div>\n        <div class=\"main-section\"></div>\n    </div>\n</div>";
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
    + "\">\n    "
    + alias4(((helper = (helper = lookupProperty(helpers,"text") || (depth0 != null ? lookupProperty(depth0,"text") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"text","hash":{},"data":data,"loc":{"start":{"line":2,"column":4},"end":{"line":2,"column":12}}}) : helper)))
    + "\n</button>";
},"useData":true});
templates['input-field/input-field'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"input-field\">\n    <input type=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"type") || (depth0 != null ? lookupProperty(depth0,"type") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"type","hash":{},"data":data,"loc":{"start":{"line":2,"column":17},"end":{"line":2,"column":25}}}) : helper)))
    + "\" name=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":2,"column":33},"end":{"line":2,"column":41}}}) : helper)))
    + "\" id=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":2,"column":47},"end":{"line":2,"column":55}}}) : helper)))
    + "\" placeholder=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"placeholder") || (depth0 != null ? lookupProperty(depth0,"placeholder") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"placeholder","hash":{},"data":data,"loc":{"start":{"line":2,"column":70},"end":{"line":2,"column":85}}}) : helper)))
    + "\">\n    <p class=\"error-msg\"></p>\n</div>";
},"useData":true});
templates['profile/profile'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id=\"page-profile\">\n    <div class=\"navbar\"></div>\n\n    <div class=\"contents\">\n        <div class=\"main\">\n            <div class=\"button-container\"></div>\n        </div>\n    </div>\n</div>";
},"useData":true});
templates['sign-in/sign-in'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id=\"page-sign-in\" class=\"sign-in-up\">\n    <div class=\"container\">\n        <div class=\"form-block\">\n            <h1>Войти в аккаунт Рекламодателя</h1>\n        </div>\n        <div class=\"offer-block\">\n            <h1>Добро пожаловать!</h1>\n            <p>Впервые у нас? Создайте аккаунт!</p>\n        </div>\n    </div>\n</div>";
},"useData":true});
templates['sign-up/sign-up'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id=\"page-sign-up\" class=\"sign-in-up\">\n    <div class=\"container\">\n        <div class=\"offer-block\">\n            <h1>С возвращением!</h1>\n            <p>Войдите в аккаунт, чтобы получить доступ к размещению</p>\n        </div>\n        <div class=\"form-block\">\n            <h1>Создать аккаунт Рекламодателя</h1>\n        </div>\n    </div>\n</div>";
},"useData":true});
})();