greenlistApp.service("DatabaseQuery", ["DatabaseRef", function(DatabaseRef) {

    // TODO (Steven) Log waste score for an item
    function updateWasteScore(item, score) {

        var wasteScore = {
            date: Date.now(),
            score: score
        }

        var push = DatabaseRef.wasteData(item).push();
        push.set(wasteScore);

    }

    // TODO (Turner) Add a new item
    function addItem(itemName) {
        var newItem = {
            list: "shopping",
            name: itemName,
            dataUpdated: false,
            checked: false,
            average: 0
        }

        console.log("Looking for " + newItem.name + " in history...");
        var isInHistory;
        DatabaseRef.items().once("value")
            .then(function(data) {
                console.log("Got data");
                isInHistory = data.hasChild(newItem.name)
                    && (data.child(newItem.name).val().list) == "history";

                if (isInHistory) {
                    console.log(newItem.name + " exists in history!");
                    /* TODO Check if wasteDataStatus is true
                       if true do not update and add to list
                       if false update waste data, flip to true, and add to list
                    */

                    checkWasteDataStatus(newItem, function(dataUpdated) {
                       if (!dataUpdated) {
                           // TODO Show modal and ask user for waste data
                           updateWasteScore(newItem, prompt("Waste?"));
                       }
                    });
                } else {
                    console.log(newItem.name + " is brand new!");
                    DatabaseRef.items().child(newItem.name).set(newItem);
                    wasteDataStatus(newItem, false); // TODO Only do this after items have been checked and archived
                }
            });
    }

    // TODO (Turner) Move item from history to shopping
    // TODO check if data needs to be updated
    function setItemList(item, list) {
        DatabaseRef.items()
            .child(item)
            .child("list")
            .set(list);

        // TODO update waste status if item was moved to shopping
    }

    // TODO (Steven) Update wasteDataStatus for an item
    function updateWasteDataStatus(item, status){
        var nameSet = {};
        var nameItem = item.name;
        nameSet[nameItem] = status;
        DatabaseRef.items().child(nameItem).update({"dataUpdated":status});
        // DatabaseRef.database.ref(UserInfo.getCurrentUser().uid + "/wasteDataStatus").update(nameSet);
    }

    function checkWasteDataStatus(item, callback){
        var check = DatabaseRef.wasteDataStatus(item);
        check.once("value")
            .then(function(value){

                callback(value.val());

            })
    }

    return {
        addItem: addItem,
        setItemList: setItemList,
        updateWasteScore: updateWasteScore,
        updateWasteDataStatus: updateWasteDataStatus,
        checkWasteDataStatus: checkWasteDataStatus
    }

}]);