greenlistApp.service("DatabaseRef", ["UserInfo", function(UserInfo) {
    /**
     * Reference to firebase database location.
     */
    var database = firebase.database();

    /**
     * Reference to database location for "items".
     *
     * @returns database location for item node
     */
    function items() {
        return database.ref(UserInfo.getCurrentList().listKey + "/items");
    }

    function onlyFoodItems(){
        return database.ref(UserInfo.getCurrentList().listKey + "/items")
            .orderByChild("NonFood")
            .equalTo(false);
    }


    /**
     * Reference to a specific child (based on input list) under the item node.
     *
     * @param list user input for child name
     * @returns database location for child list
     */
    function getRefToSpecificList(list) {
        return database.ref(UserInfo.getCurrentList().listKey + "/items")
            .orderByChild("list")
            .equalTo(list);
    }

    function setNonFoodStatus (food, status) {
        database.ref(UserInfo.getCurrentList().listKey + "/items").child(food.name).update({"NonFood": status});
    }

    function getRefToAllList(){
        return database.ref(UserInfo.getCurrentList().listKey + "/items")
            .orderByChild("list");
    }

    function getAllShareList(){
        return database.ref(UserInfo.getCurrentUser().uid + "/sharedLists")
            /*.orderByChild("name")*/;


    }

    // function setShareList(){
    //     database.set(shareList);
    // }

    /**
     * Reference to the checked child in item node that is set to false.
     * @returns database location for checked child
     */
    function getUncheckedItems() {
        return database.ref(UserInfo.getCurrentList().listKey + "/items")
            .orderByChild("checked")
            .equalTo(false);
    }

    /**
     * Reference to the checked child in item node that is set to true.
     *
     * @returns database location for checked child
     */
    function getCheckedItems() {
        return database.ref(UserInfo.getCurrentList().listKey + "/items")
            .orderByChild("checked")
            .equalTo(true);
    }

    /**
     * Reference to the node with overall average of the waste score.
     * @returns database location to overallAverage node
     */
    function overallAverage() {
        return database.ref(UserInfo.getCurrentList().listKey + "/overallAverage");
    }

    /**
     * Reference to the top 3 item efficiency
     *
     * @returns firebase reference location to top 3 items
     */
    function topEfficient(){
        return onlyFoodItems().limitToLast(3);
    }

    /**
     * Reference to the bottom 3 item efficiency
     * @returns firebase reference location to bottom 3 items
     */
    function bottomEfficient(){
        return onlyFoodItems().limitToFirst(3);
    }

    /**
     * Reference to the item node with the child that stores status for logging waste data.
     *
     * @param item user object input
     * @returns database location for child in item
     */
    function wasteDataStatus(item) {
        return database.ref(UserInfo.getCurrentList().listKey + "/items").child(item.name);
    }

    /**
     * Database location for wasteData node location
     *
     * @param item user input object
     * @returns database location for wasteData node user defined child
     */
    function wasteData(item){
        return database.ref(UserInfo.getCurrentList().listKey + "/wasteData").child(item.name);
    }

    function leaderBoard() {
        return database.ref("leaderboard");
    }

    function leaderBoardScore() {
        return database.ref("leaderboard").child(UserInfo.getCurrentUser().uid);
    }

    function sharedLists() {
        return database.ref("sharedLists");
    }

    function userSharedLists() {
        return database.ref(UserInfo.getCurrentUser().uid + "/sharedLists")
    }

    function friendSharedLists(uid) {
        return database.ref(uid + "/sharedLists");
    }

    function emails() {
        return database.ref("emails");
    }
    /**
     * return all the functions
     */
    return {
        items: items,
        overallAverage: overallAverage,
        getRefToSpecificList: getRefToSpecificList,
        getUncheckedItems: getUncheckedItems,
        getCheckedItems: getCheckedItems,
        wasteDataStatus: wasteDataStatus,
        wasteData: wasteData,
        leaderBoard: leaderBoard,
        leaderBoardScore: leaderBoardScore,
        database: database,
        bottomEfficient: bottomEfficient,
        topEfficient: topEfficient,
        getRefToAllList: getRefToAllList,
        setNonFoodStatus: setNonFoodStatus,
        onlyFoodItems: onlyFoodItems,
        getAllShareList: getAllShareList,
        sharedLists: sharedLists,
        userSharedLists: userSharedLists,
        friendSharedLists: friendSharedLists,
        emails: emails
    }


}]);