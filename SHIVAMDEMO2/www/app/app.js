
var app = angular.module('AngularAuthApp', ['ngRoute', 'ngSanitize', 'LocalStorageModule', 'angular-loading-bar']);

app.config(function ($routeProvider) {

    $routeProvider.when("/home", {
        controller: "homeController",
        templateUrl: "app/views/home.html"
    });

    $routeProvider.when("/login", {
        controller: "loginController",
        templateUrl: "app/views/login.html"
    });

   

    $routeProvider.when("/refresh", {
        controller: "refreshController",
        templateUrl: "app/views/refresh.html"
    });

    $routeProvider.when("/tokens", {
     controller: "tokensManagerController",
     templateUrl: "app/views/tokens.html"
    });

    $routeProvider.when("/associate", {
       controller: "associateController",
      templateUrl: "app/views/associate.html"
    });

    $routeProvider.otherwise({ redirectTo: "/login" });

});

//var serviceBase = 'http://localhost:7440/API/ClearlyInventoryAPI.svc/';
//var serviceBaseUrl = 'http://localhost:7440/';
var serviceBaseUrl = 'https://test.inventory4.com/';
var serviceBase = 'https://test.inventory4.com/API/ClearlyInventoryAPI.svc/';
app.constant('ngAuthSettings', {
    apiServiceBaseUri: serviceBase,
    clientId: 'ngAuthApp'
});


app.run(['authService', function (authService) {
    authService.fillAuthData();
}]);

// factory for all messages 
app.factory('log', function () {
    toastr.options = {
        closeButton: false,
        positionClass: 'toast-top-right',
    };
    return {
        success: function (text) {
            toastr.success(text, "Success");
        },
        error: function (text) {
            toastr.error(text, "Error");
        },
        info: function (text) {
            toastr.info(text, "Info");
        },
        warning: function (text) {
            toastr.warning(text, "Warning");
        },
    };
});


 