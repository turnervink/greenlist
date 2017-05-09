greenlistApp.service("DatabaseQuery", ["DatabaseRef", function(DatabaseRef) {

    // TODO (Steven) Log waste score for an item
    function updateWasteScore(item) {
        var wasteScore = {
            wasteScore: $scope.wasteScore
        }
        wasteData(item).push().set(wasteData())
    }
    // TODO (Turner) Add a new item
    function addItem(itemName) {
        var newItem = {
            list: "shopping",
            name: itemName,
            dataUpdated: false,
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
                } else {
                    console.log(newItem.name + " is brand new!");
                    // TODO Set wasteDataStatus to false
                    DatabaseRef.items().child(newItem.name).set(newItem);
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

        getRefToSpecificList(item).update({"dataUpdated":status})
        wasteDataStatus(item).

    }


    // TODO (Steven) Check wasteDataStatus for an item

    return {
        addItem: addItem,
        setItemList: setItemList
    }

}]);