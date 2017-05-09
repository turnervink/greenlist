greenlistApp.service("DatabaseQuery", ["DatabaseRef", function(DatabaseRef) {

    // TODO (Steven) Log waste score for an item
    function updateWasteScore(item, score) {

        // TODO Popup and ask user for waste data

        var wasteScore = {
            wasteScore: score
        }

        DatabaseRef.wasteData(item).push().set(wasteScore)

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
                    var check = wasteDataStatus(item)
                    check.once("value")
                        .then(function(value){

                            if (!value.val()) {
                                // TODO update waste data
                            }

                        })
                } else {
                    console.log(newItem.name + " is brand new!");
                    DatabaseRef.items().child(newItem.name).set(newItem);
                    wasteDataStatus(newItem, false); // TODO Only do this after items have been checked and archived
                }
            });
    }

    // TODO (Turner) Move item from history to shopping
    function setItemList(item, list) {
        DatabaseRef.items()
            .child(item)
            .child("list")
            .set(list);

        // TODO update waste status if item was moved to shopping
    }

    // TODO (Steven) Update wasteDataStatus for an item
    function wasteDataStatus(item, status){
        var nameSet = {};
        var nameItem = item.name;
        nameSet[nameItem] = status;
        DatabaseRef.getRefToSpecificList(nameItem).update({"dataUpdated":status});
        DatabaseRef.database.ref(UserInfo.getCurrentUser().uid + "/wasteDataStatus").update(nameSet);
    }

    return {
        addItem: addItem,
        setItemList: setItemList,
        updateWasteScore: updateWasteScore,
        wasteDataStatus: wasteDataStatus,
        checkWasteDataStatus: checkWasteDataStatus
    }

}]);