var greenlistApp = angular.module("greenlistApp", ["ngRoute", "firebase", "ui.bootstrap", 'ngAside', 'ngAnimate', 'chart.js']);

greenlistApp.run(["$rootScope", "$location", function($rootScope, $location) {
    $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
        // We can catch the error thrown when the $requireSignIn promise is rejected
        // and redirect the user back to the home page
        if (error === "AUTH_REQUIRED") {
            $location.path("/login");
        }

    });
}]);

//Slide menu code

greenlistApp.config(["$routeProvider", function($routeProvider) {
    $routeProvider
        .when("/login", {
            templateUrl: "views/html/login.html",
            controller: "LoginCtrl",
            resolve: {
                "CurrentAuth": ["Auth", function(Auth) {
                    return Auth.$waitForSignIn();
                }]
            }
        })

        .when("/you-cant-have-egg-bacon-spam-and-sausage-with-the-spam", {
            templateUrl: "views/html/you-cant-have-egg-bacon-spam-and-sausage-with-the-spam.html",
            controller: "BadBoyCtrl"
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

        .when("/detailReports",{
            templateUrl: "views/html/detailReport.html",
            controller: "EfficiencyCtrl",
            resolve: {
                "CurrentAuth": ["Auth", function(Auth) {
                    return Auth.$requireSignIn();
                }]
            }


    })

        .when("/affiliates", {
            templateUrl: "views/html/affiliates.html",
            controller: "AffiliatesCtrl"
        })
        .when("/loading", {
            templateUrl: "views/html/loading.html"
        })

        .when("/about", {
            templateUrl: "views/html/about.html",
            controller: "AboutCtrl"
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

greenlistApp.factory("Auth", ["$firebaseAuth",
    function($firebaseAuth) {
        return $firebaseAuth();
    }]);

greenlistApp.filter('percentage', ['$filter', function ($filter) {
    return function (input, decimals) {
        return $filter('number')(input * 100, decimals) + '%';
    };
}]);
