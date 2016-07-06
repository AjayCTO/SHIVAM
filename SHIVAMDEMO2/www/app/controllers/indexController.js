'use strict';
app.controller('indexController', ['$scope', 'localStorageService', 'authService', '$location', 'log', function ($scope, localStorageService, authService, $location, log) {
  
    $scope.logOut = function () {
      
       
        
        authService.logOut();
        $location.path('/login');
    }




}]);