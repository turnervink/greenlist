greenlistApp.controller("ShoppingListCtrl",
    ["CurrentAuth", "$scope", "UserInfo", "DatabaseRef", "$firebaseObject", "$modal", "$window","DatabaseQuery",
    function(CurrentAuth, $scope, UserInfo, DatabaseRef, $firebaseObject, $modal, $window,DatabaseQuery) {

        UserInfo.initUser(CurrentAuth.displayName, CurrentAuth.uid, CurrentAuth.photoURL);

    	$scope.heading = 'Shopping List';

    	$scope.listBtnColor = 'green';

    	$scope.histBtnColor = 'white';

    	$scope.reptBtnColor = 'white';

    	$scope.listColor = 'white';

    	$scope.histColor = 'black';

    	$scope.reptColor = 'black';
      
    var uncheckedItems = $firebaseObject(DatabaseRef.getUncheckedItems());
    uncheckedItems.$bindTo($scope, "uncheckedItems");

    var checkedItems = $firebaseObject(DatabaseRef.getCheckedItems());
    checkedItems.$bindTo($scope, "checkedItems");

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

}]);