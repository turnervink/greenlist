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

    function wasteDataStatus(item) {
        return database.ref(UserInfo.getCurrentUser().uid + "/wasteDataStatus").child(item);
    }

    function wasteData(item){
        return database.ref(UserInfo.getCurrentUser().uid + "/wasteData").child(item);
    }

    return {
        items: items,
        overallAverage: overallAverage,
        getRefToSpecificList: getRefToSpecificList,
        wasteDataStatus: wasteDataStatus,
        wasteData: wasteData,
        database: database

    }

}]);