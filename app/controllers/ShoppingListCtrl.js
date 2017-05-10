greenlistApp.controller("ShoppingListCtrl",
    ["CurrentAuth", "$scope", "UserInfo", "DatabaseRef", "$firebaseObject", "$modal", "$window","DatabaseQuery",
    function(CurrentAuth, $scope, UserInfo, DatabaseRef, $firebaseObject, $modal, $window,DatabaseQuery) {

    UserInfo.initUser(CurrentAuth.displayName, CurrentAuth.uid, CurrentAuth.photoURL);

    <!-- modal test -->
    $scope.nameYour = "MODAL TEST";
        $scope.clickmeModal = function() {
            DatabaseQuery.updateWasteScore("milk")


        }
}]);