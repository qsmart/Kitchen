var app = angular.module('kitchen.controllers.authentication', []);

/*********************************************************************
 * Login Controller
 *********************************************************************/
app.controller('LoginCtrl', function($scope, $state, $stateParams, authentication) {
	$scope.hasServerError = $stateParams.hasServerError;
	$scope.error = $stateParams.error;
	$scope.login = authentication.login;
});

/*********************************************************************
 * Sign Up Controller
 *********************************************************************/
app.controller('SignupCtrl', function($scope, $state, $stateParams, authentication) {
	$scope.hasServerError = $stateParams.hasServerError;
	$scope.error = $stateParams.error;
	$scope.signup = authentication.signup;
	$scope.facebookSignup = authentication.facebookSignup();
});