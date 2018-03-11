var app = angular.module("groceryListApp",["ngRoute"]);


app.config(function($routeProvider){
	$routeProvider
	.when("/", {
		templateUrl : "views/groceryList.html",
		controller : "HomeController"
	})

	.when("/addItem", {
		templateUrl : "views/addItem.html", 
		controller : "GroceryListController"
	})

	.when("/addItem/edit/:id", {
		templateUrl : "views/addItem.html", 
		controller: "GroceryListController"
	})

	.otherwise({
		redirectTo: "/"
	});
});

app.service("GroceryService", function(){

   var groceryService = {};

   groceryService.groceryItems = [
		{id: 1, itemsName: 'milk', completed: true, date: new Date("October 1, 2014 11:12:00")},
		{id: 2, itemsName: 'cookies',completed: false,  date: new Date("October 3, 2014 11:12:00")},
		{id: 3, itemsName: 'ice cream',completed: false,  date: new Date("November 1, 2014 11:12:00")},
		{id: 4, itemsName: 'eggs', completed: true, date: new Date("December 1, 2014 11:12:00")}
	];


	groceryService.findById = function(id){
		for(var item in groceryService.groceryItems){
			if(groceryService.groceryItems[item].id === id)
				return groceryService.groceryItems[item];

		}
	}

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
   	// We need an approach that could differenitiate edit operation and save operation.
   	 console.log(" Entry id "+entry.id);
     var item = groceryService.findById(entry.id);

     if(item){
     	  item.itemsName = entry.itemsName;
     	  item.date = entry.date;
     }
     else {
     	  entry.id = groceryService.createID();
   	 	  groceryService.groceryItems.push(entry);
     }
	
   };

   groceryService.removeItem = function(item){
   			var index = groceryService.groceryItems.indexOf(item);
   			groceryService.groceryItems.splice(index,1);
   			console.log(groceryService.groceryItems);
   }


   groceryService.markCompleted = function(item){
   	   item.completed = !item.completed;
   }
	return groceryService;


});



app.controller("headerController",["$scope", function($scope){
	$scope.appTitle = "Grocery List";
}]);


app.controller("GroceryListController", ["$scope", "$routeParams", "$location", "GroceryService", function($scope, $routeParams, $location, GroceryService){

    if(!$routeParams.id) // when the addItem url doesnt have an id => the user is gonna add a new item and click save
		$scope.itemToBeAdded = {id: 0, itemsName: '', completed: false, date: new Date()};
	else{ // when addItem url has id parameter => editing the name of the existing item
		 $scope.itemToBeAdded = GroceryService.findById(parseInt($routeParams.id));
		 console.log($scope.itemToBeAdded);
	}

	$scope.save = function (){

		GroceryService.save($scope.itemToBeAdded); // add the item to the groceryItems array in the groceryService
		$location.path("/"); // return the main page
	}

}]);


app.controller("HomeController", ["$scope", "GroceryService", function($scope, GroceryService){
    $scope.groceryItems = GroceryService.groceryItems;

    $scope.removeItem = function(item){
    		GroceryService.removeItem(item);
    }

    $scope.markCompleted = function(item){
    	GroceryService.markCompleted(item);
    }
}]);