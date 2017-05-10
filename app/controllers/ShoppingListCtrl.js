greenlistApp.controller("ShoppingListCtrl",
    ["CurrentAuth", "$scope", "UserInfo", "DatabaseRef", "$firebaseObject", "$modal", "$window",
    function(CurrentAuth, $scope, UserInfo, DatabaseRef, $firebaseObject, $modal, $window) {

    UserInfo.initUser(CurrentAuth.displayName, CurrentAuth.uid, CurrentAuth.photoURL);

        $scope.clickmeModal = function() {
            DatabaseQuery.updateWasteScore("milk")

        }
}]);