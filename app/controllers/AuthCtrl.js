greenlistApp.controller("AuthCtrl", ["$scope", "$route", "UserInfo", "$firebaseAuth", function($scope, $route, UserInfo, $firebaseAuth) {
    var auth = $firebaseAuth();

    $scope.signIn = function() {
        auth.$signInWithRedirect("google").then(function(firebaseUser) {
            console.log("Signed in as:", firebaseUser.user.displayName);
        }).catch(function(error) {
            console.error("Auth failed:", error);
        });
    }

    $scope.signOut = function() {
        auth.$signOut().then(function() {
            console.log("Goodbye!");
        }).catch(function(error) {
            console.error("Error signing out: " + error);
        });
    }

    auth.$onAuthStateChanged(function(firebaseUser) {
        if (firebaseUser) {
            console.log("User is auth'd as " + firebaseUser.displayName);
        } else {
            console.error("Could not auth user");
        }
    });
}]);