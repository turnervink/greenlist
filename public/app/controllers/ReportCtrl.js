greenlistApp.controller("ReportCtrl",
    ["CurrentAuth", "$scope", "UserInfo", "DatabaseRef", "$firebaseObject", "$firebaseArray", "CalculationService", "DatabaseQuery",
    function(CurrentAuth, $scope, UserInfo, DatabaseRef, $firebaseObject, $firebaseArray, CalculationService, DatabaseQuery) {

    	UserInfo.initUser(CurrentAuth.displayName, CurrentAuth.uid, CurrentAuth.photoURL, CurrentAuth.email);

        // Setting report page heading content and nav bar button style
        $scope.heading = 'Report';
    	$scope.listBtnColor = 'white';
    	$scope.histBtnColor = 'white';
    	$scope.reptBtnColor = 'green';
    	$scope.listColor = 'black';
    	$scope.histColor = 'black';
    	$scope.reptColor = 'white';
        $scope.listBgImg = 'images/icons/cart-off.png';
        $scope.histBgImg = 'images/icons/hist-icon-off.png';
        $scope.reptBgImg = 'images/icons/reports-on.png';
        $scope.menuHeight = '19vh';
        $scope.menuMargin = '0';




        var setOverallAvg = $firebaseObject(DatabaseRef.overallAverage());
        setOverallAvg.$bindTo($scope, "calAverage");

        $scope.setTopEff = $firebaseArray(DatabaseRef.topEfficient());
        // setTopEff.$bindTo($scope, "topItem");

        $scope.setBotEff = $firebaseArray(DatabaseRef.bottomEfficient());
        // setBottomEff.$bindTo($scope, "botItem");


        $scope.getTextColor = function(average) {
            var color = CalculationService.calBarColor(average);
            return {
                "color": color
            }
        }



        $scope.dateRange = 'Last 2 Weeks';

        $scope.showDateMenu = function() {
            $scope.menuHeight = '27.58vh';
            $scope.menuMargin = '8.8vh';
        }

        $scope.hideDateMenu = function() {
            $scope.menuHeight = '19vh';
            $scope.menuMargin = '0';
        }
}]);