greenlistApp.service("DatabaseQuery", ["DatabaseRef", "$modal", "$window",  function(DatabaseRef, $modal, $window) {

    // TODO (Steven) Log waste score for an item
    function updateWasteScore(item) {
        // open modal
        var modalInstance = $modal.open({
            templateUrl: 'views/partials/modal.html',
            controller: 'ModalCtrl',
        });

        // get score from modal
        modalInstance.result.then(function (data) {
            var wasteScore = {
                date: Date.now(),
                score: parseInt(data)
            };

            var push = DatabaseRef.wasteData(item).push();
            push.set(wasteScore);
            updateWasteDataStatus(item, true);
        });


    }

    // TODO (Turner) Add a new item
    function addItem(itemName) {
        var newItem = {
            list: "shopping",
            name: itemName,
            checked: false,
            average: 0
        };

        console.log("Looking for " + newItem.name + " in history...");

                itemIsInHistory(newItem, function(historical) {
                    if (historical === true) {
                        console.log(newItem.name + " exists in history!");

                        checkWasteDataStatus(newItem, function(dataUpdated) {
                            if (!dataUpdated) {
                                // TODO Show modal and ask user for waste data
                                updateWasteScore(newItem);
                                setItemList(newItem, "shopping");
                            } else {
                                setItemList(newItem, "shopping");
                            }
                        });
                    } else {
                        console.log(newItem.name + " is brand new!");
                        DatabaseRef.items().child(newItem.name).set(newItem);
                    }
                });

    }

    // TODO (Turner) Move item from history to shopping
    function setItemList(item, list) {
        if (list == "history") {
            DatabaseRef.items()
                .child(item.name)
                .child("checked")
                .remove();
        }

        if (list == "shopping") {
            DatabaseRef.items()
                .child(item.name)
                .child("checked")
                .set(false);
        }

        DatabaseRef.items()
            .child(item.name)
            .child("list")
            .set(list);
    }

    // TODO (Steven) Update wasteDataStatus for an item
    function updateWasteDataStatus(item, status){
        var nameSet = {};
        var nameItem = item.name;
        nameSet[nameItem] = status;
        DatabaseRef.items().child(nameItem).update({"dataUpdated":status});
    }

    function checkWasteDataStatus(item, callback){
        var check = DatabaseRef.wasteDataStatus(item);
        check.once("value")
            .then(function(value){
                console.log("Got " + value.val().dataUpdated);
                callback(value.val().dataUpdated);
            });
    }

    function itemIsInHistory(item, callback) {
        DatabaseRef.items().once("value")
            .then(function(data) {
                console.log("Got data");
                var isInHistory = data.hasChild(item.name)
                    && (data.child(item.name).val().list) === "history";

                callback(isInHistory);
            });
    }

    function updateCheckedStatus(item, status) {
        DatabaseRef.items().child(item.name).update({"checked": status});
    }

    function deleteItem(item) {
        DatabaseRef.items().child(item.name).remove();
    }

    return {
        updateWasteScore: updateWasteScore,
        addItem: addItem,
        setItemList: setItemList,
        updateWasteDataStatus: updateWasteDataStatus,
        checkWasteDataStatus: checkWasteDataStatus,
        itemIsInHistory: itemIsInHistory,
        updateCheckedStatus: updateCheckedStatus,
        deleteItem: deleteItem
    }

}]);