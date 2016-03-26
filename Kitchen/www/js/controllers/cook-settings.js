angular.module('kitchen.controller.cook-settings', ['kitchen.services.cook', 'kitchen.services.authentication'])
	.controller('cookSettingsCtrl', function(
		$scope,
		authentication) {
		$scope.logout = function() {
			authentication.logout();
		}
	});