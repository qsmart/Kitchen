 angular.module('kitchen.controller.cook-dishes', ['kitchen.services.cook'])
 	.controller('cookDishesCtrl', ['$scope', 'cook', '$ionicModal', '$firebase', '$firebaseArray', function($scope, cook, $ionicModal, $firebase, $firebaseArray) {
 		$scope.dishes = $firebaseArray(cook.refDishes());

 		$ionicModal.fromTemplateUrl('templates/add-dish.html', {
 			scope: $scope,
 			animation: 'slide-in-up',
 			controller: 'cookDishesCtrl'
 		}).then(function(modal) {
 			$scope.modal = modal;
 		});
 		$scope.addNewDish = function() {
 			$scope.dishes.$add({
 				by: 'ht',
 				name: $scope.modal.newDishName,
 				price: $scope.modal.newDishPrice,
 				description: $scope.modal.newDishDescription
 			});
 			$scope.modal.newDishName = '';
 			$scope.modal.newDishPrice = '';
 			$scope.modal.newDishDescription = '';
 			$scope.modal.hide();
 		}
 	}])