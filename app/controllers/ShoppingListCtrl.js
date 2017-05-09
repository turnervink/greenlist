greenlistApp.controller("ShoppingListCtrl",
    ["CurrentAuth", "$scope", "UserInfo", "DatabaseRef", "$firebaseObject",
    function(CurrentAuth, $scope, UserInfo, DatabaseRef, $firebaseObject) {

    UserInfo.initUser(CurrentAuth.displayName, CurrentAuth.uid, CurrentAuth.photoURL);

    var data = $firebaseObject(DatabaseRef.getRefToSpecificList("shopping"));
    data.$bindTo($scope, "items");

}]);