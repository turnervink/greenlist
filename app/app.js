var greenlistApp = angular.module("greenlistApp", ["ngRoute", "firebase"]);

greenlistApp.config(["$routeProvider", function($routeProvider) {
    $routeProvider
        .when("/login", {
            templateUrl: "views/html/login.html"
        })
        .when("/list", {
            templateUrl: "views/html/shopping.html",
            controller: "ShoppingListCtrl"
        })
        .when("/history", {
            templateUrl: "views/html/history.html",
            controller: "HistoryListCtrl"
        })
        .when("/reports", {
            templateUrl: "views/html/report.html",
            controller: "ReportCtrl"
        })

        .when("/affiliates", {
            templateUrl: "views/html/affiliates.html",
            controller: "AffiliatesCtrl"
        })

        .otherwise({
            redirectTo: "/list"
        });

}]);

/*
    This controller listens for route changes and assigns a class to the body in order to
    have a different background colour for each view. A value of "undefined-page" is used for
    the login view as there is not controller associated with it.
 */
greenlistApp.controller("GlobalCtrl", ["$scope", "$rootScope", function($scope, $rootScope) {
    $rootScope.$on("$routeChangeStart", function(event, toState, toParams) {
        $scope.bodyClass = toState.$$route.controller + "-page";
    });
}]);