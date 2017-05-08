var greenlistApp = angular.module("greenlistApp", ["ngRoute", "firebase"]);

greenlistApp.config(["$routeProvider", function($routeProvider) {
    $routeProvider
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
        .otherwise({
            redirectTo: "/list"
        });
}])