var app = angular.module('kitchen.controllers.home', []);

/*********************************************************************
 * home Controller
 *********************************************************************/
app.controller('HomeCtrl', function($scope, $state, authentication) {
  $scope.getError = authentication.getError;
  //$scope.email = authentication.getCredential().password.email;
});
