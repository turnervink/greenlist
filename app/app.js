var greenlistApp = angular.module("greenlistApp", ["ngRoute", "firebase"]);

greenlistApp.run(["$rootScope", "$location", function($rootScope, $location) {
    $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
        // We can catch the error thrown when the $requireSignIn promise is rejected
        // and redirect the user back to the home page
        if (error === "AUTH_REQUIRED") {
            $location.path("/login");
        }
    });
}]);

greenlistApp.config(["$routeProvider", function($routeProvider) {
    $routeProvider
        .when("/login", {
            templateUrl: "views/html/login.html"
        })
        .when("/list", {
            templateUrl: "views/html/shopping.html",
            controller: "ShoppingListCtrl",
            resolve: {
                "CurrentAuth": ["Auth", function(Auth) {
                    return Auth.$requireSignIn();
                }]
            }
        })
        .when("/history", {
            templateUrl: "views/html/history.html",
            controller: "HistoryListCtrl",
            resolve: {
                "CurrentAuth": ["Auth", function(Auth) {
                    return Auth.$requireSignIn();
                }]
            }
        })
        .when("/reports", {
            templateUrl: "views/html/report.html",
            controller: "ReportCtrl",
            resolve: {
                "CurrentAuth": ["Auth", function(Auth) {
                    return Auth.$requireSignIn();
                }]
            }
        })
        .otherwise({
            redirectTo: "/login"
        });

}]);

greenlistApp.factory("Auth", ["$firebaseAuth",
    function($firebaseAuth) {
        return $firebaseAuth();
    }]);