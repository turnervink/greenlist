greenlistApp.controller("ShoppingListCtrl",
    ["CurrentAuth", "$scope", "UserInfo", "DatabaseRef", "$firebaseObject", "$uibModal", "$window","DatabaseQuery", "CalculationService",
    function(CurrentAuth, $scope, UserInfo, DatabaseRef, $firebaseObject, $uibModal, $window,DatabaseQuery, CalculationService) {

        UserInfo.initUser(CurrentAuth.displayName, CurrentAuth.uid, CurrentAuth.photoURL, CurrentAuth.email);

        // Setting shopping list page heading content and nav bar button style
    	$scope.heading = 'Shopping List';
    	$scope.listBtnColor = 'green';
    	$scope.histBtnColor = 'white';
    	$scope.reptBtnColor = 'white';
    	$scope.listColor = 'white';
    	$scope.histColor = 'black';
    	$scope.reptColor = 'black';
        $scope.listBgImg = 'images/list-icon-on.png';
        $scope.histBgImg = 'images/hist-icon-off.png';
        $scope.reptBgImg = 'images/rept-icon-off.png';

      
        var uncheckedItems = $firebaseObject(DatabaseRef.getUncheckedItems());
        uncheckedItems.$bindTo($scope, "uncheckedItems");

        var checkedItems = $firebaseObject(DatabaseRef.getCheckedItems());
        checkedItems.$bindTo($scope, "checkedItems");


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

        $scope.getBarColor = function(average) {
            var color = CalculationService.colorCalc(average);
            return {
                "background-color": color
            }
        }


}]);