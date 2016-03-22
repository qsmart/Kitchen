 angular.module('kitchen.controller.cook-dishes', ['kitchen.services.cook', 'kitchen.services.authentication'])
 	.controller('cookDishesCtrl', function($scope, cook, $ionicModal, $firebase, authentication, $cordovaImagePicker, $ionicPlatform, $cordovaCamera) {
 			$ionicModal.fromTemplateUrl('templates/add-dish.html', {
 				scope: $scope,
 				animation: 'slide-in-up',
 				controller: 'cookDishesCtrl'
 			}).then(function(modal) {
 				$scope.modal = modal;
 			});
 			$scope.addNewDish = function() {
 				var dishes = new Firebase("https://kitchenapp.firebaseio.com/dishes");
 				var auth = authentication.getCredential();
 				dishes.child(auth.uid).push().set({
 					name: $scope.modal.newDishName,
 					price: $scope.modal.newDishPrice,
 					description: $scope.modal.newDishDescription
 				});
 				$scope.modal.newDishName = '';
 				$scope.modal.newDishPrice = '';
 				$scope.modal.newDishDescription = '';
 				$scope.modal.hide();
 			};
 			$ionicPlatform.ready(function() {
 					$scope.dishImageTemplate = "img/dish-template.jpg";

 					$scope.takePicture = function() {
 						var options = {
 							quality: 50,
 							destinationType: Camera.DestinationType.DATA_URL,
 							sourceType: Camera.PictureSourceType.CAMERA,
 							allowEdit: true,
 							encodingType: Camera.EncodingType.JPEG,
 							targetWidth: 100,
 							targetHeight: 100,
 							popoverOptions: CameraPopoverOptions,
 							saveToPhotoAlbum: false,
 							correctOrientation: true
 						};
 						$cordovaCamera.getPicture(options).then(function(imageData) {
 							$scope.dishImageTemplate = "data:image/jpeg;base64," + imageData;
 						}, function(err) {
 							// error
 						});
 					}
 						$scope.selectPicFromGallery = function() {
 							// Image picker will load images according to these settings
 							var options = {
 								maximumImagesCount: 1, // Max number of selected images, I'm using only one for this example
 								width: 800,
 								height: 800,
 								quality: 80 // Higher is better
 							};

 							$cordovaImagePicker.getPictures(options).then(function(results) {
 								// Loop through acquired images
 								for (var i = 0; i < results.length; i++) {
 									//$scope.collection.selectedImage = results[i]; // We loading only one image so we can use it like this
 									//$scope.dishImageTemplate = results[i];
 									console.log(results[i])
 									window.plugins.Base64.encodeFile(results[i], function(base64) { // Encode URI to Base64 needed for contacts plugin
 										$scope.dishImageTemplate = "data:image/jpeg;base64,"+base64;
 										//$scope.collection.selectedImage = base64;
 										//$scope.addContact(); // Save contact
 										//console.log(base64)
 									});
 								}
 							}, function(error) {
 								console.log('Error: ' + JSON.stringify(error)); // In case of error
 							});
 						};

 					});

 			})