greenlistApp.service("DatabaseRef", ["UserInfo", function(UserInfo) {

    var database = firebase.database();
    var items = database.ref(UserInfo.getCurrentUser().uid + "/items");
    var overallAverage = database.ref(UserInfo.getCurrentUser().uid + "/overallAverage");
    var wasteDataStatus = database.ref(UserInfo.getCurrentUser().uid + "/wasteDataStatus");

    function getRefToSpecificList(list) {
        return database.ref(UserInfo.getCurrentUser().uid + "/items")
            .orderByChild("list")
            .equalTo(list);
    }

    return {
        items: items,
        overallAverage: overallAverage,
        getRefToSpecificList: getRefToSpecificList,
        wasteDataStatus: wasteDataStatus,
        database: database

    }

}]);