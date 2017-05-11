greenlistApp.service("UserInfo", function() {
    var currentUser = {};

    function initUser(displayName, uid, photoUrl) {
        console.log("Setting up user");
        currentUser.displayName = displayName;
        currentUser.uid = uid;
        currentUser.photoUrl = photoUrl;
    }

    function clearUser() {
        currentUser = {};
    }

    function getCurrentUser() {
        return currentUser;
    }

    return {
        initUser: initUser,
        clearUser: clearUser,
        getCurrentUser: getCurrentUser
    }
});