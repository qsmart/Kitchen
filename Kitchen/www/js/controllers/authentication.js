var app = angular.module('kitchen.controllers.authentication', [
						'ngMessages'
						]);

/*********************************************************************
 * Login Controller
 *********************************************************************/
app.controller('LoginCtrl', function ($scope, $state) {

	$scope.formData = {
		"email": "",
		"password": ""
	};

	$scope.login = function (form) {
		if(form.$valid) {
			console.log(loginForm);
		//TODO
		} else {
			console.log("invalid");
		//TODO
		}
		
	};

});

/*********************************************************************
 * Sign Up Controller
 *********************************************************************/
app.controller('SignupCtrl', function ($scope, $state) {
	$scope.signup = function () {
		if(form.$valid) {
			console.log(signupForm);
		//TODO
		} else {
			console.log("invalid");
		//TODO
		}
	};
	$scope.facebookSignup = function () {
		
    
	};

});
