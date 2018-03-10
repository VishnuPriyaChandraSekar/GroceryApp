var app = angular.module("groceryListApp",[]);

app.controller("headerController",["$scope", function($scope){
	$scope.appTitle = "Grocery List";
}]);


app.controller("GroceryListController", ["$scope", function($scope){
	$scope.groceryItems = [
		{itemsName: 'milk', date: '2014-10-01'},
		{itemsName: 'cookies', date: '2014-10-02'},
		{itemsName: 'ice cream', date: '2012-04-03'},
		{itemsName: 'eggs', date: '2012-08-01'}
	]
}]);