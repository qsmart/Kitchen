// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic',
  'kitchen.controllers.authentication',
  'kitchen.controllers.home',
  'kitchen.controller.cook-home',
  'kitchen.controller.cook-dishes',
  'kitchen.services.authentication',
  'kitchen.services.cook',
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
  .config(function($stateProvider, $urlRouterProvider, $compileProvider) {
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel|data):/);
    $stateProvider
      .state('home', {
        url: "/home",
        templateUrl: "templates/home.html"
      })
      .state('signup', {
        url: "/signup",
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
        templateUrl: "templates/login.html",
        params: {
          'hasServerError': false,
          'error': ''
        }
      })
      .state('loading', {
        url: "/loading",
        templateUrl: "templates/loading.html"
      })
      .state('cookHome', {
        url: "/cookHome",
        controller: 'cookHomeCtrl',
        abstract: false,
        templateUrl: "templates/cook-home.html"
      })
      .state('cookHome.orders', {
        url: "/orders",
        views:{
          'cook-orders':{
            controller: 'cookHomeCtrl',
            templateUrl: "templates/cook-orders.html"  
          }
        }
      })
        .state('cookHome.dishes', {
        url: "/dishes",
        views:{
          'cook-dishes':{
            controller: 'cookDishesCtrl',
            templateUrl: "templates/cook-dishes.html"  
          }
        }
        })
        .state('cookHome.payments', {
        url: "/payments",
        views:{
          'cook-payments':{
            controller: 'cookHomeCtrl',
            templateUrl: "templates/cook-payments.html"  
          }
        }
        })
        .state('cookHome.settings', {
        url: "/settings",
        views:{
          'cook-settings':{
            controller: 'cookHomeCtrl',
            templateUrl: "templates/cook-settings.html"  
          }
        }
      })
      // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/home');
  })