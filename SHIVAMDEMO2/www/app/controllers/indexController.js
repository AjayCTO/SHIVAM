'use strict';
app.controller('indexController', ['$scope', 'localStorageService', 'authService', '$location', 'log', function ($scope, localStorageService, authService, $location, log) {
  
     

    $scope.GotoDemoPage=function(pageName)
    {
         
        $location.path('/'+pageName);
    }



}]);