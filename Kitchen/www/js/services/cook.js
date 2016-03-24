angular.module('kitchen.services.cook', [])

.factory('cook',['$firebase','authentication', function($firebase, authentication){
	var ref = new Firebase("https://kitchenapp.firebaseio.com");
    var refDishes = new Firebase("https://kitchenapp.firebaseio.com/dishes");
    return {
        ref: function() {
            return ref;
        },
        refCurrentCookDishes: function() {
            return refDishes;
        }

    }
}])
