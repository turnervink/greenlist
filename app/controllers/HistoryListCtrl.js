greenlistApp.controller("HistoryListCtrl",
    ["CurrentAuth", "$scope", "UserInfo", "DatabaseRef", "$firebaseObject", "DatabaseQuery",
    function(CurrentAuth, $scope, UserInfo, DatabaseRef, $firebaseObject, DatabaseQuery) {

        UserInfo.initUser(CurrentAuth.displayName, CurrentAuth.uid, CurrentAuth.photoURL);

        $scope.heading = 'History';
        $scope.listBtnColor = 'white';
        $scope.histBtnColor = 'green';
        $scope.reptBtnColor = 'white';
        $scope.listColor = 'black';
        $scope.histColor = 'white';
        $scope.reptColor = 'black';


        var historyFood = $firebaseObject(DatabaseRef.getRefToSpecificList('history'));

        $scope.historyItem = historyFood;

        $scope.logWaste = function(food) {

            if (!food.dataUpdated) {
                DatabaseQuery.updateWasteScore(food);
            }

        }

        $scope.addToList = function(food) {

            if (!food.dataUpdated) {
                DatabaseQuery.updateWasteScore(food);
            }

        	DatabaseQuery.setItemList(food, "shopping");
        }


}]);