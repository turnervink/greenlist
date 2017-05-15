/**
 * Controller for the history view.
 */
greenlistApp.controller("HistoryListCtrl",
    ["CurrentAuth", "$scope", "UserInfo", "DatabaseRef", "$firebaseObject", "DatabaseQuery", "DateRange",
    function(CurrentAuth, $scope, UserInfo, DatabaseRef, $firebaseObject, DatabaseQuery, DateRange) {

        // Set up user info with the UserInfo service
        UserInfo.initUser(CurrentAuth.displayName, CurrentAuth.uid, CurrentAuth.photoURL);

        // Define style values for the header and nav bar
        $scope.heading = 'History';
        $scope.listBtnColor = 'white';
        $scope.histBtnColor = 'green';
        $scope.reptBtnColor = 'white';
        $scope.listColor = 'black';
        $scope.histColor = 'white';
        $scope.reptColor = 'black';
        $scope.listBgImg = 'images/list-icon-off.png';
        $scope.histBgImg = 'images/hist-icon-on.png';
        $scope.reptBgImg = 'images/rept-icon-off.png';

        // Create a database reference to items in the history list
        var historyFood = $firebaseObject(DatabaseRef.getRefToSpecificList('history'));

        $scope.historyItem = historyFood;

        /**
         * Called when the log waste button is tapped on an item.
         * Calls the updateWasteScore function of the DatabaseQuery
         * service if the item needs a data update.
         *
         * @param food The item to log waste for
         */
        $scope.logWaste = function(food) {

            if (!food.dataUpdated) {
                DatabaseQuery.updateWasteScore(food);
            }

        }

        /**
         * Called when the add to list button is tapped on an
         * item. Calls the updateWasteScore function of the DatabaseQuery
         * service if the item needs a data update. Moves the item to
         * the shopping list.
         *
         * @param food
         */
        $scope.addToList = function(food) {

            if (!food.dataUpdated) {
                DatabaseQuery.updateWasteScore(food);
            }

        	DatabaseQuery.setItemList(food, "shopping");
        }


        // Date testing code
        $scope.getRangeData = function(item) {
            DateRange.getWasteScoresForRange(item, 365, function(data) {
                console.log(data);
            });
        }

}]);