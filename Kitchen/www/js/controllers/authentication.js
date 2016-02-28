var app = angular.module('kitchen.controllers.authentication', [
						'ngMessages'
						]);

/*********************************************************************
 * Login Controller
 *********************************************************************/
app.controller('LoginCtrl', function ($scope, $state, $window) {


	$scope.login = function (form) {
		if(form.$valid) {
			$state.go('loading');
			var ref = new Firebase("https://kitchenapp.firebaseio.com");
			ref.authWithPassword({
			    email    : form.email.$modelValue,
		        password : form.password.$modelValue
			}, function(error, authData) {
				if (error) {
				    console.log("Login Failed!", error);
				} else {
					$state.go('welcome',{}, {reload: true});
					$window.location.reload(true);
				    console.log("Authenticated successfully with payload:", authData);
				}
	  		});
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
app.controller('SignupCtrl', function ($scope, $state, $window) {
	$scope.signup = function (form) {
		if(form.$valid) {
		  $state.go('loading');
		  var ref = new Firebase("https://kitchenapp.firebaseio.com");
 
		  ref.createUser({
		  	firstName: form.firstname.$modelValue,
		  	lastName : form.lastname.$modelValue,
		    email    : form.email.$modelValue,
		    password : form.password.$modelValue
		  }, function(error, userData) {
		    if (error) {
		      console.log("Error creating user:", error);
		    } else {

		    	$state.go('welcome',{}, {reload: true});
		    	$window.location.reload(true);
		      console.log("Successfully created user account with uid:", userData.uid);
		    }
		  });
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
