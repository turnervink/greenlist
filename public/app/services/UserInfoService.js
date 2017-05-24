/**
 * Service to manage information about the
 * currently logged in user.
 */
greenlistApp.service("UserInfo", function() {
    // Object to store user info
    var currentUser = {};
    var currentList = {};

    /**
     * Initialize the user object.
     *
     * @param displayName The user's display name
     * @param uid The user's unique ID
     * @param photoUrl URL to the user's Google account picture
     * @param email The user's gmail address
     */
    function initUser(displayName, uid, photoUrl, email) {
        console.log("Setting up user");
        currentUser.displayName = displayName;
        currentUser.uid = uid;
        currentUser.photoUrl = photoUrl;
        currentUser.email = email;

        firebase.database().ref("emails").child(uid).set(email);
    }

    /**
     * Clears the user object.
     */
    function clearUser() {
        currentUser = {};
        currentList = {};
    }

    /**
     * Gets the user object.
     *
     * @returns Current user object
     */
    function getCurrentUser() {
        return currentUser;
    }

    function setCurrentList(listKey, listName, isShared) {
        console.log("Setting current list");

        if (isShared) {
            currentList.key = "sharedLists/" + listKey;
        } else {
            currentList.key = listKey;
        }

        currentList.name = listName;
        console.log(currentList);
    }

    function getCurrentList() {
        return currentList;
    }

    return {
        initUser: initUser,
        clearUser: clearUser,
        getCurrentUser: getCurrentUser,
        setCurrentList: setCurrentList,
        getCurrentList: getCurrentList
    }
});