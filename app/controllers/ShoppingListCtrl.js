greenlistApp.controller("ShoppingListCtrl",
    ["CurrentAuth", "$scope", "UserInfo", "DatabaseRef", "$firebaseObject", "$modal", "$window","DatabaseQuery",
    function(CurrentAuth, $scope, UserInfo, DatabaseRef, $firebaseObject, $modal, $window,DatabaseQuery) {

    UserInfo.initUser(CurrentAuth.displayName, CurrentAuth.uid, CurrentAuth.photoURL);

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

}]);