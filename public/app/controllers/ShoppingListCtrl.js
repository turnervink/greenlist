greenlistApp.controller("ShoppingListCtrl",
    ["CurrentAuth", "$scope", "UserInfo", "DatabaseRef", "$firebaseObject", "$firebaseArray", "$uibModal", "$window","DatabaseQuery", "CalculationService", "FoodTipsService",
    function(CurrentAuth, $scope, UserInfo, DatabaseRef, $firebaseObject, $firebaseArray, $uibModal, $window,DatabaseQuery, CalculationService, FoodTipsService) {

        UserInfo.initUser(CurrentAuth.displayName, CurrentAuth.uid, CurrentAuth.photoURL, CurrentAuth.email);

        // Setting shopping list page heading content and nav bar button style
        $scope.shoppingListHide = true;
    	$scope.heading = 'Shopping List';
    	$scope.listBtnColor = 'green';
    	$scope.histBtnColor = 'white';
    	$scope.reptBtnColor = 'white';
    	$scope.listColor = 'white';
    	$scope.histColor = 'black';
    	$scope.reptColor = 'black';
        $scope.listBgImg = 'images/icons/cart-on.png';
        $scope.histBgImg = 'images/icons/hist-icon-off.png';
        $scope.reptBgImg = 'images/icons/reports-off.png';

      
        var uncheckedItems = $firebaseObject(DatabaseRef.getUncheckedItems());
        uncheckedItems.$bindTo($scope, "uncheckedItems").then(function() {
            console.log(uncheckedItems);
        });

        var checkedItems = $firebaseObject(DatabaseRef.getCheckedItems());
        checkedItems.$bindTo($scope, "checkedItems");

        //array of items in the shopping list page
        //used for showing/hiding the archive button and food tips
        $scope.checkShopping = $firebaseArray(DatabaseRef.getRefToSpecificList("shopping"));

        var allShareListName = $firebaseObject(DatabaseRef.getAllShareList());
        allShareListName.$bindTo($scope, "shareListName").then(function() {
            console.log("Setting list", UserInfo.getCurrentList());
        });

        $scope.getList = function() {
            $scope.listName = UserInfo.getCurrentList();
        }

        $scope.switchToList = function(list){
            console.log(list);

            if (list == null) {
                UserInfo.setCurrentList(UserInfo.getCurrentUser().uid, "My List");
            } else {
                UserInfo.setCurrentList(list.listKey, list.name);
            }


        }


        //code for food tips
        $scope.$watch("checkShopping", function(foodArray){
            if (foodArray.length === 0){
                $scope.foodTip = FoodTipsService.getTips();
                $scope.pls = $scope.foodTip[FoodTipsService.randomizer($scope.foodTip.length)];
            }
        }, true);

        // Bring up the modal for confirming the user wants to clear their list
        $scope.confirmModal = function() {
            var modalInstance = $uibModal.open({
                templateUrl: 'views/html/confirmation.html',
                windowClass: 'confirmation',

                //controller for the modal
                controller: function($scope, $uibModalInstance){
                    //archives the list items
                    $scope.archive = function() {
                        //send items to history set the flag to require them to be updated
                        DatabaseRef.getCheckedItems()
                            .once("value")
                            .then(function(data) {

                                data.forEach(function(item) {
                                    DatabaseQuery.updateWasteDataStatus(item.val(), false);
                                    DatabaseQuery.setItemList(item.val(), "history");
                                });

                            });
                        //with the unchecked items, if they are new delete them. otherwise, send back to history and do
                        //not require them to be updated
                        DatabaseRef.getUncheckedItems()
                            .once("value")
                            .then(function(data) {

                                data.forEach(function(item) {

                                    if (item.val().dataUpdated == undefined) {
                                        DatabaseQuery.deleteItem(item.val());
                                    } else {
                                        DatabaseQuery.setItemList(item.val(), "history");
                                    }

                                });

                            });
                        $uibModalInstance.close();
                    }

                    //function for if the user does not want to archive their items
                    $scope.mistake = function() {
                        $uibModalInstance.close();
                    }
                }

            })

            modalInstance.result.then(function(data) {
                console.log("Modal got data", data);
            }).catch(function(err) {
                console.error(err);
            })
        }

        $scope.toggleCheck = function(item, status) {
            DatabaseQuery.updateCheckedStatus(item, status);
        }

        $scope.addItem = function(item) {
            DatabaseQuery.addItem(item);
            $scope.newItemName = "";
        }

        $scope.deleteItem = function(item) {
            if (item.dataUpdated == undefined) {
                DatabaseQuery.deleteItem(item);
            } else {
                DatabaseQuery.setItemList(item, "history");
            }
        }

        $scope.archive = function() {
            DatabaseRef.getCheckedItems()
                .once("value")
                .then(function(data) {

                    data.forEach(function(item) {
                        DatabaseQuery.updateWasteDataStatus(item.val(), false);
                        DatabaseQuery.setItemList(item.val(), "history");
                    });

                });

            DatabaseRef.getUncheckedItems()
                .once("value")
                .then(function(data) {

                    data.forEach(function(item) {

                        if (item.val().dataUpdated == undefined) {
                            DatabaseQuery.deleteItem(item.val());
                        } else {
                            DatabaseQuery.setItemList(item.val(), "history");
                        }

                    });

                });
        }

        /** 
         * Get the color for the background of food efficiency bar based
         * on the average of the food efficiency.
         * 
         * @param average
         *               average for food efficiency
         */
        $scope.getBackColor = function(average) {
            var color = CalculationService.calBackColor(average);
            return {
                "background-color": color
            }
        }

        /** 
         * Get the color for the food efficiency bar based
         * on the average of the food efficiency.
         * 
         * @param average
         *               average for food efficiency
         */
        $scope.getBarColor = function(average) {
            var color = CalculationService.calBarColor(average);
            return {
                "width":average +"%",
                "background-color": color
            }
        }

}]);