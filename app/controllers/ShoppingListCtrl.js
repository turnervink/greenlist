greenlistApp.controller("ShoppingListCtrl",
    ["CurrentAuth", "$scope", "UserInfo", "DatabaseRef", "DatabaseQuery", "$firebaseObject",
    function(CurrentAuth, $scope, UserInfo, DatabaseRef, DatabaseQuery, $firebaseObject) {

    UserInfo.initUser(CurrentAuth.displayName, CurrentAuth.uid, CurrentAuth.photoURL);

        $scope.addItem = function() {
            DatabaseQuery.addItem($scope.itemName);
        }

        $scope.updateList = function() {
            DatabaseQuery.setItemList($scope.itemName, "history");
        }
}]);