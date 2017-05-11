greenlistApp.controller("ReportCtrl",
    ["CurrentAuth", "$scope", "UserInfo", "DatabaseRef", "$firebaseObject",
    function(CurrentAuth, $scope, UserInfo, DatabaseRef, $firebaseObject) {

    	$scope.heading = 'Report';

    	$scope.listBtnColor = 'white';

    	$scope.histBtnColor = 'white';

    	$scope.reptBtnColor = 'green';

    	$scope.listColor = 'black';

    	$scope.histColor = 'black';

    	$scope.reptColor = 'white';


    	UserInfo.initUser(CurrentAuth.displayName, CurrentAuth.uid, CurrentAuth.photoURL);

}]);