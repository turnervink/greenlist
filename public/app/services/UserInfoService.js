/**
 * Service to manage information about the
 * currently logged in user.
 */
greenlistApp.service("UserInfo", function($route) {
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

        console.log(currentList);

        if (getCurrentList().name === undefined){
            setCurrentList(getCurrentUser().uid, "My List");
            $route.reload();
        }
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

    function setCurrentList(listKey, listName) {
        console.log("Setting current list");

        if (listKey == currentUser.uid) {
            currentList.listKey = listKey;
            currentList.name = "My List";
        } else {
            currentList.listKey = "sharedLists/" + listKey;
            currentList.name = listName;
        }

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