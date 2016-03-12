angular.module('kitchen.services.cook', [])

.factory('cook',['$firebase', function($firebase){
	var ref = new Firebase("https://kitchenapp.firebaseio.com");
    var refDishes = new Firebase("https://kitchenapp.firebaseio.com/dishes");
    return {
        ref: function() {
            return ref;
        },
        refDishes: function() {
            return refDishes;
        }
    }
}])
