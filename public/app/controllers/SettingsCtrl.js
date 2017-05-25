greenlistApp.controller("SettingsCtrl", ["$scope", "UserInfo", "DatabaseQuery", function($scope, UserInfo, DatabaseQuery) {

    $scope.eraseData = function() {
        DatabaseQuery.eraseData();
    }

}]);