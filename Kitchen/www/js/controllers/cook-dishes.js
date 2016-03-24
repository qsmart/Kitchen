 angular.module('kitchen.controller.cook-dishes', ['kitchen.services.cook', 'kitchen.services.authentication'])
 	.controller('cookDishesCtrl', function($scope, cook, $ionicModal, $firebase, authentication, $cordovaImagePicker, $ionicPlatform, $cordovaCamera) {
 		$ionicModal.fromTemplateUrl('templates/add-dish.html', {
 			scope: $scope,
 			animation: 'slide-in-up',
 			controller: 'cookDishesCtrl'
 		}).then(function(modal) {
 			$scope.modal = modal;
 		});

		var auth = authentication.getCredential();
		var ref = new Firebase("https://kitchenapp.firebaseio.com/dishes/"+auth.uid);
		$scope.cookDishes = [];
		ref.on("child_removed", function(snapshot) {
			var index = $scope.cookDishes.indexOf(snapshot.val());
			if (index > -1) {
				$scope.cookDishes.splice(index, 1);
			}
			$scope.$apply();
		}, function (errorObject) {
		  console.log("The read failed: " + errorObject.code);
		});
		ref.on("child_added", function(snapshot) {
			$scope.cookDishes.push(snapshot.val());
			$scope.$apply();
		}, function (errorObject) {
		  console.log("The read failed: " + errorObject.code);
		});

 		$scope.dishImage = "img/dish-template.jpg";
 		$scope.addNewDish = function() {
 			var dishes = new Firebase("https://kitchenapp.firebaseio.com/dishes");
 			var auth = authentication.getCredential();
 			dishes.child(auth.uid).push().set({
 				name: $scope.modal.newDishName,
 				price: $scope.modal.newDishPrice,
 				description: $scope.modal.newDishDescription,
 				image: $scope.dishImage
 			});
 			$scope.modal.newDishName = '';
 			$scope.modal.newDishPrice = '';
 			$scope.modal.newDishDescription = '';
 			$scope.modal.hide();
 		};
 		$ionicPlatform.ready(function() {
 			$scope.takePicture = function() {
 				var options = {
 					quality: 70,
 					destinationType: Camera.DestinationType.DATA_URL,
 					sourceType: Camera.PictureSourceType.CAMERA,
 					allowEdit: true,
 					encodingType: Camera.EncodingType.JPEG,
 					targetWidth: 700,
 					targetHeight: 700,
 					popoverOptions: CameraPopoverOptions,
 					saveToPhotoAlbum: false,
 					correctOrientation: true
 				};
 				$cordovaCamera.getPicture(options).then(function(imageData) {
 					$scope.dishImage = "data:image/jpeg;base64," + imageData;
 					$scope.$apply();
 				}, function(err) {
 					// error
 				});
 			}
 			$scope.selectPicFromGallery = function() {
 				var options = {
 					maximumImagesCount: 1,
 					width: 700,
 					height: 700,
 					quality: 70
 				};

 				$cordovaImagePicker.getPictures(options).then(function(results) {

 					for (var i = 0; i < results.length; i++) {
 						console.log(results[i]);
 						window.plugins.Base64.encodeFile(results[i], function(base64) { // Encode URI to Base64 needed for contacts plugin
 							$scope.dishImage = base64;
 							$scope.$apply();
 						});
 					}
 				}, function(error) {
 					console.log('Error: ' + JSON.stringify(error)); // In case of error
 				});
 			};

 		});

 	})