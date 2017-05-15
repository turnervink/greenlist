greenlistApp.controller("ReportCtrl",
    ["CurrentAuth", "$scope", "UserInfo", "DatabaseRef", "$firebaseObject",
    function(CurrentAuth, $scope, UserInfo, DatabaseRef, $firebaseObject) {

    	UserInfo.initUser(CurrentAuth.displayName, CurrentAuth.uid, CurrentAuth.photoURL);

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