// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic',
  'kitchen.controllers.authentication',
  'kitchen.controllers.home',
  'kitchen.services.authentication',
  'firebase',
  'ngCordova'
])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

        // Don't remove this line unless you know what you are doing. It stops the viewport
        // from snapping when text inputs are focused. Ionic handles this internally for
        // a much nicer keyboard experience.
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: "/home",
        cache: false,
        templateUrl: "templates/home.html"
      })
      .state('signup', {
        url: "/signup",
        cache: false,
        controller: 'SignupCtrl',
        templateUrl: "templates/signup.html",
        params: {
          'hasServerError': false,
          'error': ''
        }
      })
      .state('login', {
        url: "/login",
        controller: 'LoginCtrl',
        cache: false,
        templateUrl: "templates/login.html",
        params: {
          'hasServerError': false,
          'error': ''
        }
      })
      .state('loading', {
        url: "/loading",
        cache: false,
        templateUrl: "templates/loading.html"
      })
      .state('welcome', {
        url: "/welcome",
        controller: 'HomeCtrl',
        cache: false,
        templateUrl: "templates/welcomeTemp.html"
      })
      // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/home');
  })