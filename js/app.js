var app = angular.module("groceryListApp",["ngRoute"]);


app.config(function($routeProvider){
	$routeProvider
	.when("/", {
		templateUrl : "views/groceryList.html",
		controller : "GroceryListController"
	})

	.when("/addItem", {
		templateUrl : "views/addItem.html", 
		controller : "GroceryListController"
	})

	.otherwise({
		redirectTo: "/"
	});
});

app.service("GroceryService", function(){

   var groceryService = {};

   groceryService.groceryItems = [
		{id: 1, itemsName: 'milk', date: '2014-10-01'},
		{id: 2, itemsName: 'cookies', date: '2014-10-02'},
		{id: 3, itemsName: 'ice cream', date: '2012-04-03'},
		{id: 4, itemsName: 'eggs', date: '2012-08-01'}
	];

   groceryService.createID = function(){
   	// of the newId variable exist then increment by one else create the variable
   	 if(groceryService.newId){
   	 	groceryService.newId++;
   	 	return groceryService.newId;
   	 }
   	 else{
   	 	// get the entry from the array which has the highest id value
   	 	var maxId = _.max(groceryService.groceryItems, function(entry){ return entry.id;})
   	 	groceryService.newId = maxId.id + 1;
   	 	return groceryService.newId;
   	 }
   }

   groceryService.save = function(entry){
	 entry.id = groceryService.createID();
   	 groceryService.groceryItems.push(entry);
 };

	return groceryService;


});



app.controller("headerController",["$scope", function($scope){
	$scope.appTitle = "Grocery List";
}]);


app.controller("GroceryListController", ["$scope", "$routeParams", "$location", "GroceryService", function($scope, $routeParams, $location, GroceryService){
	$scope.groceryItems = GroceryService.groceryItems;

	$scope.itemToBeAdded = {id: 0, itemsName: '', date: new Date()};

	$scope.save = function (){
		GroceryService.save($scope.itemToBeAdded); // add the item to the groceryItems array in the groceryService
		$location.path("/"); // return the main page
	}

	console.log($scope.groceryItems);
}]);

