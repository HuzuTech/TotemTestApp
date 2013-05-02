var totem = new Totem();
var loginSrc =
    hapiConfig.endPoint
    + "/forms/login/"
    + hapiConfig.clientId;
var loginView, appView;

$(function() {
    loginView = $("#hapi-login"), appView = $("#hapi-app");
    totem.autoLogin(function(err) {
        if (err) login();
        else startApp();
    });
});

var showLogin = function() {
    loginView.show();
    appView.hide();
}

var showApp = function() {
    appView.show();
    loginView.hide();
}

var startApp = function() {
    $(window).trigger("hapiReady");
    showApp();
}

var login = function() {
    showLogin();
    $(window).one("message", function(e) {
        var code = e.originalEvent.data;
        console.log("Exchanging code " + code + " for token ...");
        totem.exchangeCode(code, function(err) {
            if (!err) {
                startApp();
            }
        });
    });
    loginView.attr("src", loginSrc);
}
