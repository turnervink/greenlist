greenlistApp.controller("HistoryListCtrl",
    ["CurrentAuth", "$scope", "UserInfo", "DatabaseRef", "$firebaseObject",
    function(CurrentAuth, $scope, UserInfo, DatabaseRef, $firebaseObject) {

    $scope.heading = 'History';

    UserInfo.initUser(CurrentAuth.displayName, CurrentAuth.uid, CurrentAuth.photoURL);

}]);