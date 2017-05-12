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
        return database.ref(UserInfo.getCurrentUser().uid + "/items");
    }

    /**
     * Reference to a specific child (based on input list) under the item node.
     *
     * @param list user input for child name
     * @returns database location for child list
     */
    function getRefToSpecificList(list) {
        return database.ref(UserInfo.getCurrentUser().uid + "/items")
            .orderByChild("list")
            .equalTo(list);
    }

    /**
     * Reference to the checked child in item node that is set to false.
     * @returns database location for checked child
     */
    function getUncheckedItems() {
        return database.ref(UserInfo.getCurrentUser().uid + "/items")
            .orderByChild("checked")
            .equalTo(false);
    }

    /**
     * Reference to the checked child in item node that is set to true.
     *
     * @returns database location for checked child
     */
    function getCheckedItems() {
        return database.ref(UserInfo.getCurrentUser().uid + "/items")
            .orderByChild("checked")
            .equalTo(true);
    }

    /**
     * Reference to the node with overall average of the waste score.
     * @returns database location to overallAverage node
     */
    function overallAverage() {
        return database.ref(UserInfo.getCurrentUser().uid + "/overallAverage");
    }

    /**
     * Reference to the item node with the child that stores status for logging waste data.
     *
     * @param item user object input
     * @returns database location for child in item
     */
    function wasteDataStatus(item) {
        return database.ref(UserInfo.getCurrentUser().uid + "/items").child(item.name);
    }

    /**
     * Database location for wasteData node location
     *
     * @param item user input object
     * @returns database location for wasteData node user defined child
     */
    function wasteData(item){
        return database.ref(UserInfo.getCurrentUser().uid + "/wasteData").child(item.name);
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
        database: database

    }


}]);