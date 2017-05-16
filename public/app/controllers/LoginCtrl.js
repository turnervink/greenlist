greenlistApp.controller("LoginCtrl",
    ["CurrentAuth", "$scope", "$route", "$location", "UserInfo", "$firebaseAuth",
    function(CurrentAuth, $scope, $route, $location, UserInfo, $firebaseAuth) {

    if (CurrentAuth != null) {
        $location.url("/list");
    }

}]);