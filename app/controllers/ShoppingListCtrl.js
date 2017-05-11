greenlistApp.controller("ShoppingListCtrl",
    ["CurrentAuth", "$scope", "UserInfo", "DatabaseRef", "$firebaseObject", "$modal", "$window","DatabaseQuery",
    function(CurrentAuth, $scope, UserInfo, DatabaseRef, $firebaseObject, $modal, $window,DatabaseQuery) {

        UserInfo.initUser(CurrentAuth.displayName, CurrentAuth.uid, CurrentAuth.photoURL);

    	$scope.heading = 'Shopping List';

    	$scope.listBtnColor = 'green';

    	$scope.histBtnColor = 'white';

    	$scope.reptBtnColor = 'white';

    	$scope.listColor = 'white';

    	$scope.histColor = 'black';

    	$scope.reptColor = 'black';

}]);