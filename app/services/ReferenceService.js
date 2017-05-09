greenlistApp.service("DatabaseRef", ["UserInfo", function(UserInfo) {

    var database = firebase.database();

    function items() {
        return database.ref(UserInfo.getCurrentUser().uid + "/items");
    }

    function getRefToSpecificList(list) {
        return database.ref(UserInfo.getCurrentUser().uid + "/items")
            .orderByChild("list")
            .equalTo(list);
    }

    function overallAverage() {
        return database.ref(UserInfo.getCurrentUser().uid + "/overallAverage");
    }

    function wasteDataStatus() {
        return database.ref(UserInfo.getCurrentUser().uid + "/wasteDataStatus");
    }

    return {
        items: items,
        overallAverage: overallAverage,
        getRefToSpecificList: getRefToSpecificList,
        wasteDataStatus: wasteDataStatus,
        database: database

    }

}]);