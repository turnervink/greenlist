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

    function getUncheckedItems() {
        return database.ref(UserInfo.getCurrentUser().uid + "/items")
            .orderByChild("checked")
            .equalTo(false);
    }

    function getCheckedItems() {
        return database.ref(UserInfo.getCurrentUser().uid + "/items")
            .orderByChild("checked")
            .equalTo(true);
    }

    function overallAverage() {
        return database.ref(UserInfo.getCurrentUser().uid + "/overallAverage");
    }

    function wasteDataStatus(item) {
        return database.ref(UserInfo.getCurrentUser().uid + "/wasteDataStatus").child(item.name);
    }

    function wasteData(item){
        return database.ref(UserInfo.getCurrentUser().uid + "/wasteData").child(item.name);
    }


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