/**
 * Controller for the history view.
 */
greenlistApp.controller("HistoryListCtrl",
    ["CurrentAuth", "$scope", "UserInfo", "DatabaseRef", "CalculationService", "$firebaseObject", "DatabaseQuery",
    function(CurrentAuth, $scope, UserInfo, DatabaseRef, CalculationService, $firebaseObject, DatabaseQuery) {

        // Set up user info with the UserInfo service
        UserInfo.initUser(CurrentAuth.displayName, CurrentAuth.uid, CurrentAuth.photoURL, CurrentAuth.email);

        // Define style values for the header and nav bar
        $scope.heading = 'History';
        $scope.listBtnColor = 'white';
        $scope.histBtnColor = 'green';
        $scope.reptBtnColor = 'white';
        $scope.listColor = 'black';
        $scope.histColor = 'white';
        $scope.reptColor = 'black';
        $scope.listBgImg = 'images/icons/cart-off.png';
        $scope.histBgImg = 'images/icons/hist-icon-on.png';
        $scope.reptBgImg = 'images/icons/reports-off.png';

        // Create a database reference to items in the history list
        var historyFood = $firebaseObject(DatabaseRef.getRefToSpecificList('history'));
        $scope.historyItem = historyFood;

        /**
         * Called when the log waste button is tapped on an item.
         * Calls the updateWasteScore function of the DatabaseQuery
         * service if the item needs a data update.
         *
         * @param food The item to log waste for
         * @status boolean for showing cancel or ask later button
         */
        $scope.logWaste = function(food, status) {
            if (!food.dataUpdated) {
                DatabaseQuery.updateWasteScore(food, status, function(gotData) {});
            }
        }

        /**
         * Called when the add to list button is tapped on an
         * item. Calls the updateWasteScore function of the DatabaseQuery
         * service if the item needs a data update. Moves the item to
         * the shopping list.
         *
         * @param food
         * @status boolean for showing cancel or ask later button
         */
        $scope.addToList = function(food, status) {
            if (!food.dataUpdated) {
                DatabaseQuery.updateWasteScore(food, status, function(gotData) {
                    if (gotData || gotData === null) {
                        DatabaseQuery.setItemList(food, "shopping");
                    }
                });
            } else {
                DatabaseQuery.setItemList(food, "shopping");
            }
        }



        /** 
         * Get the color for the background of food efficiency bar based
         * on the average of the food efficiency.
         * 
         * @param average
         *               average for food efficiency
         */
        $scope.getBackColor = function(average) {
            var color = CalculationService.calBackColor(average);
            return {
                "background-color": color
            }
        }

        /** 
         * Get the color for the food efficiency bar based
         * on the average of the food efficiency.
         * 
         * @param average
         *               average for food efficiency
         */
        $scope.getBarColor = function(average) {
            var color = CalculationService.calBarColor(average);
            return {
                "width":average +"%",
                "background-color": color
            }
        }



}]);