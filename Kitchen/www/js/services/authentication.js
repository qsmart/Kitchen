var app = angular.module('kitchen.services.authentication', ['ngMessages']);
app.factory('authentication', function($state) {
	var authnticated = false;
	var credential = null;
	var authError = null;
	return {
		login: function(form) {
			if (form.$valid) {
				$state.go('loading');
				var ref = new Firebase("https://kitchenapp.firebaseio.com");
				ref.authWithPassword({
					email: form.email.$modelValue,
					password: form.password.$modelValue
				}, function(error, authData) {
					authError = error;
					if (error) {
						authnticated = false;
						$state.go('login', {
							'hasServerError': true,
							'error': error.toString().replace('Error: ', '')
						});
						console.log("Login Failed!", error);
					} else {
						authnticated = true;
						credential = authData;
						$state.go('welcome');
						console.log("Authenticated successfully with payload:", authData);
					}
				});
				//TODO
			} else {
				authError = "invalid"
				authnticated = false;
				console.log("invalid");
				//TODO
			}

		},
		signup: function(form) {
			if (form.$valid) {
				$state.go('loading');
				var ref = new Firebase("https://kitchenapp.firebaseio.com");

				ref.createUser({
					firstName: form.firstname.$modelValue,
					lastName: form.lastname.$modelValue,
					email: form.email.$modelValue,
					password: form.password.$modelValue
				}, function(error, userData) {
					authError = error;
					if (error) {
						authnticated = false;
						$state.go('signup', {
							'hasServerError': true,
							'error': error.toString().replace('Error: ', '')
						});
						console.log("Error creating user:", error);
					} else {
						authnticated = true;
						credential = authData;
						$state.go('welcome');
						console.log("Successfully created user account with uid:", userData.uid);
					}
				});
				console.log(signupForm);
				//TODO
			} else {
				authnticated = false;
				authError = "invalid"
				console.log("invalid");
				//TODO
			}
		},
		facebookSignup: function() {

		},
		isAuthenticated: function() {
			return authnticated;
		},
		getCredential: function() {
			if (authnticated) {
				return credential;
			} else {
				return null;
			}
		},
		getError: function() {
			return authError;
		}

	}
})