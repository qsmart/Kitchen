var app = angular.module('kitchen.controllers.home', []);

/*********************************************************************
 * home Controller
 *********************************************************************/
app.controller('HomeCtrl', function($scope, $state, authentication, $cordovaCamera) {
  $scope.getError = authentication.getError;
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
	  correctOrientation:true
    };
    $scope.takePic = function(){ 
    $cordovaCamera.getPicture(options).then(function(imageData) {
      var image = document.getElementById('myImage');
      image.src = "data:image/jpeg;base64," + imageData;
    }, function(err) {
      // error
    });
	};
  //$scope.email = authentication.getCredential().password.email;
});
