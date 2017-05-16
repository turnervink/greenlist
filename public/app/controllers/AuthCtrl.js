/**
 * Handles user authorization with Firebase through Google accounts.
 */
greenlistApp.controller("AuthCtrl", ["$scope", "$route", "$location", "UserInfo", "$firebaseAuth", function($scope, $route, $location, UserInfo, $firebaseAuth) {
    // AngularFire auth object
    var auth = $firebaseAuth();

    /**
     * Called when clicking the "sign in" button. Directs
     * users to the Google auth flow and sets user info
     * in the UserInfo service before redirecting back to
     * the previous page.
     */
    $scope.signIn = function() {
        auth.$signInWithRedirect("google").then(function(firebaseUser) {
            console.log("Signed in as " + firebaseUser.user.displayName);
            UserInfo.initUser(firebaseUser.user.displayName, firebaseUser.user.uid, firebaseUser.user.photoURL);
            $location.url("list");
        }).catch(function(error) {
            console.error("Auth failed:", error);
        });
    }

    /**
     * Called when clicking the "sign out" button. Clears user info
     * in the UserInfo service and un-auths with Firebase.
     */
    $scope.signOut = function() {
        auth.$signOut().then(function() {
            console.log("Goodbye!");
            UserInfo.clearUser();
            $location.url("/login");
        }).catch(function(error) {
            console.error("Error signing out: " + error);
        });
    }

    /**
     * Fires whenever the auth state changes. Sets up user info
     * in the UserInfo service if the user is signed it, otherwise
     * does not do anything.
     */
    // auth.$onAuthStateChanged(
    //     function(firebaseUser) {
    //         if (firebaseUser) {
    //             console.log("User is auth'd as " + firebaseUser.displayName);
    //             UserInfo.initUser(firebaseUser.displayName, firebaseUser.uid, firebaseUser.photoURL, firebaseUser.email);
    //             // $location.url("list");
    //         } else {
    //             console.error("Could not auth user");
    //         }
    //     });
}]);