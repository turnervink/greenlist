greenlistApp.service("DatabaseRef", ["UserInfo", function(UserInfo) {

    var database = firebase.database();
    var items = database.ref(UserInfo.getCurrentUser().uid + "/items");
    var shoppinglist = database.ref(UserInfo.getCurrentUser().uid + "/items")
        .orderByChild("list")
        .equalTo("shopping");

    function getRefToSpecificList(list) {
        return database.ref(UserInfo.getCurrentUser().uid + "/items")
            .orderByChild("list")
            .equalTo(list);
    }

    return {
        items: items;
        getRefToSpecificList: getRefToSpecificList;
    }

}]);