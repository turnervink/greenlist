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
        $scope.listBgImg = 'images/list-icon-off.png';
        $scope.histBgImg = 'images/hist-icon-off.png';
        $scope.reptBgImg = 'images/rept-icon-on.png';
        $scope.menuHeight = '320px';
        $scope.menuMargin = '0';




        var setOverallAvg = $firebaseObject(DatabaseRef.overallAverage());
        setOverallAvg.$bindTo($scope, "calAverage");

        $scope.setTopEff = $firebaseArray(DatabaseRef.topEfficient());
        // setTopEff.$bindTo($scope, "topItem");

        $scope.setBottomEff = $firebaseArray(DatabaseRef.bottomEfficient());
        // setBottomEff.$bindTo($scope, "botItem");





        $scope.dateRange = 'Last 2 Weeks';

        $scope.showDateMenu = function() {
            $scope.menuHeight = '470px';
            $scope.menuMargin = '150px';
        }

        $scope.hideDateMenu = function() {
            $scope.menuHeight = '320px';
            $scope.menuMargin = '0';
        }
}]);