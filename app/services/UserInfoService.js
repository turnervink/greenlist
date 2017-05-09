greenlistApp.service("UserInfo", function() {
    var currentUser = {};

    function initUser(userName, uid, photoUrl) {
        console.log("Setting up user");
        currentUser.userName = userName;
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