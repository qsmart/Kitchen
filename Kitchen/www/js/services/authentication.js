var app = angular.module('kitchen.services.authentication', ['ngMessages']);
app.factory('authentication', ['$state', '$q', function($state, $q) {
	var authnticated = false;
	var credential = null;
	var authError = null;
	login = function(form) {
		if (form.$valid) {
			var email = form.email.$modelValue;
			var password = form.password.$modelValue;
			var promise = loginWithEmail(email, password);
			promise.then(function(auth) {
				$state.go('welcome');
			}, function(error) {
				$state.go('login', {
					'hasServerError': true,
					'error': error.toString().replace('Error: ', '')
				});
			});
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
		return $q(function(resolve, reject) {
			ref.authWithPassword({
				email: email,
				password: password
			}, function(error, authData) {
				authError = error;
				if (error) {
					authnticated = false;
					console.log("Login Failed!", error);
					reject(null);
				} else {
					authnticated = true;
					credential = authData;
					console.log("Authenticated successfully with payload:", authData);
					resolve(ref.getAuth());
				}
			})
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
					console.log("Successfully created user account with uid:", userData.uid);
					var promise = loginWithEmail(email, password);
					promise.then(function(auth) {
						ref.child('cooks/' + auth.uid).set({
								firstName: firstName,
								lastName: lastName,
								email: email,
							},
							function(error) {
								if (error) {
									console.log(error.toString());
									ref.removeUser({
										email: email,
										password: password
									}, function(error) {
										if (error) {
											switch (error.code) {
												case "INVALID_USER":
													console.log("The specified user account does not exist.");
													break;
												case "INVALID_PASSWORD":
													console.log("The specified user account password is incorrect.");
													break;
												default:
													console.log("Error removing user:", error);
											}
										} else {
											console.log("User account deleted successfully!");
										}
									});
									$state.go('signup', {
										'hasServerError': true,
										'error': error.toString().replace('Error: ', '')
									});
								} else {
									$state.go('welcome');
									console.log('success');
								}
							})
					}, function(auth) {
						console.log("login after signup failed");
					});
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
	var facebookSignup = function() {
	};
	var googleSignup = function() {

	};
	var isAuthenticated = function() {
		return authnticated;
	};
	var getCredential = function() {
		if (authnticated) {
			return credential;
		} else {
			return null;
		}
	};
	var getError = function() {
		return authError;
	};
	return {
		login: login,
		loginWithEmail: loginWithEmail,
		signup: signup,
		facebookSignup: facebookSignup,
		googleSignup: googleSignup,
		isAuthenticated: isAuthenticated,
		getCredential: getCredential,
		getError: getError
	}
}])