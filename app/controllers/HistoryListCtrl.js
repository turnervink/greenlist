greenlistApp.controller("HistoryListCtrl",
    ["CurrentAuth", "$scope", "UserInfo", "DatabaseRef", "$firebaseObject", "DatabaseQuery",
    function(CurrentAuth, $scope, UserInfo, DatabaseRef, $firebaseObject, DatabaseQuery) {

    $scope.heading = 'History';

    var historyFood = $firebaseObject(DatabaseRef.getRefToSpecificList('history'));

    $scope.historyItem = historyFood;

    $scope.logWaste = function(food) {
    	DatabaseQuery.updateWasteScore(food);
    }

    $scope.addToList = function(food) {
    	DatabaseQuery.setItemList(food, "shopping")
    }

    UserInfo.initUser(CurrentAuth.displayName, CurrentAuth.uid, CurrentAuth.photoURL);

}]);