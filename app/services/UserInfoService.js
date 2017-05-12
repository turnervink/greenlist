/**
 * Service to manage information about the
 * currently logged in user.
 */
greenlistApp.service("UserInfo", function() {
    // Object to store user info
    var currentUser = {};

    /**
     * Initialize the user object.
     *
     * @param displayName The user's display name
     * @param uid The user's unique ID
     * @param photoUrl URL to the user's Google account picture
     */
    function initUser(displayName, uid, photoUrl) {
        console.log("Setting up user");
        currentUser.displayName = displayName;
        currentUser.uid = uid;
        currentUser.photoUrl = photoUrl;
    }

    /**
     * Clears the user object.
     */
    function clearUser() {
        currentUser = {};
    }

    /**
     * Gets the user object.
     *
     * @returns Current user object
     */
    function getCurrentUser() {
        return currentUser;
    }

    return {
        initUser: initUser,
        clearUser: clearUser,
        getCurrentUser: getCurrentUser
    }
});