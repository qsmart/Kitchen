var app = angular.module('kitchen.services.authentication', ['ngMessages']);
app.factory('authentication', function($state) {
	var authnticated = false;
	var credential = null;
	var authError = null;
	login = function(form) {
		if (form.$valid) {
			var email = form.email.$modelValue;
			var password = form.password.$modelValue;
			loginWithEmail(email, password);
			//TODO
		} else {
			authError = "invalid"
			authnticated = false;
			console.log("invalid");
			//TODO
		}

	};
	loginWithEmail = function(email, password) {
		$state.go('loading');
		var ref = new Firebase("https://kitchenapp.firebaseio.com");
		ref.authWithPassword({
			email: email,
			password: password
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
	};
	signup = function(form) {
		if (form.$valid) {
			$state.go('loading');
			var ref = new Firebase("https://kitchenapp.firebaseio.com");
			var firstName = form.firstname.$modelValue;
			var lastName = form.lastname.$modelValue;
			var email = form.email.$modelValue;
			var password = form.password.$modelValue; 
			ref.createUser({
				email: email,
				password: password
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
					credential = userData;
					/*ref.child('cooks/' + username).set({
						firstName: firstName,
						lastName: lastName,
						email: email,
					});*/
					console.log("Successfully created user account with uid:", userData.uid);
					loginWithEmail(email, password);
				}
			});
			//console.log(signupForm);
			//TODO
		} else {
			authnticated = false;
			authError = "invalid"
			console.log("invalid");
			//TODO
		}
	};
	return {
		login: login,
		loginWithEmail: loginWithEmail,
		signup: signup,
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