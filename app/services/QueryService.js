greenlistApp.service("DatabaseQuery", ["DatabaseRef", "$modal", "$window",  function(DatabaseRef, $modal, $window) {

    // TODO (Steven) Log waste score for an item
    function updateWasteScore(item) {
        // open modal
        var score;
        var modalInstance = $modal.open({
            templateUrl: 'views/partials/modal.html',
            controller: 'ModalCtrl',
        });

        // get score from modal
        modalInstance.result.then(function (data) {
            score = data;
            var wasteScore = {
                //date: Date.now(),
                score: data        };

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
            dataUpdated: false,
            checked: false,
            average: 0
        };

        console.log("Looking for " + newItem.name + " in history...");
        var isInHistory;
        DatabaseRef.items().once("value")
            .then(function (data) {
                console.log("Got data");
                isInHistory = data.hasChild(newItem.name)
                    && (data.child(newItem.name).val().list) === "history";

                if (isInHistory) {
                    console.log(newItem.name + " exists in history!");
                    checkWasteDataStatus(newItem, function (dataUpdated) {
                        if (!dataUpdated) {
                            // TODO Show modal and ask user for waste data

                            updateWasteScore(newItem);

                        } else {

                        }
                    })
                } else {
                    console.log(newItem.name + " is brand new!");
                    DatabaseRef.items().child(newItem.name).set(newItem);
                }
            });

        setItemList(newItem, "shopping");
        // updateWasteDataStatus(newItem, false); // TODO Only do this after items have been checked and archived

    }

    // TODO (Turner) Move item from history to shopping
    function setItemList(item, list) {
        DatabaseRef.items()
            .child(item.name)
            .child("list")
            .set(list);
    }

    // TODO (Steven) Update wasteDataStatus for an item
    function updateWasteDataStatus(item, status) {
        var nameSet = {};
        var nameItem = item;
        nameSet[nameItem] = status;
        DatabaseRef.items().child(nameItem).update({"dataUpdated": status});
    }

    function checkWasteDataStatus(item, callback) {
        var check = DatabaseRef.wasteDataStatus(item);
        check.once("value")
            .then(function (value) {
                callback(value.val());
            });
    }

    return {
        addItem: addItem,
        setItemList: setItemList,
        updateWasteScore: updateWasteScore,
        updateWasteDataStatus: updateWasteDataStatus,
        checkWasteDataStatus: checkWasteDataStatus
    }


    // TODO (Steven) Log waste score for an item
    function updateWasteScore(item, score) {

        var wasteScore = {
            date: Date.now(),
            score: score
        };

        var push = DatabaseRef.wasteData(item).push();
        push.set(wasteScore);
        updateWasteDataStatus(item, true);
    }

    // TODO (Turner) Add a new item
    function addItem(itemName) {
        var newItem = {
            list: "shopping",
            name: itemName,
            dataUpdated: false,
            checked: false,
            average: 0
        };

        console.log("Looking for " + newItem.name + " in history...");
        // var isInHistory;
        // DatabaseRef.items().once("value")
        //     .then(function(data) {
        //         console.log("Got data");
        //         itemIsInHistory(newItem, function(historical) {
        //             if (historical) {
        //                 console.log(newItem.name + " exists in history!");
        //                 checkWasteDataStatus(newItem, function(dataUpdated) {
        //                     if (!dataUpdated) {
        //                         // TODO Show modal and ask user for waste data
        //                         updateWasteScore(newItem, prompt("Waste?"));
        //                     } else {
        //
        //                     }
        //                 });
        //             } else {
        //                 console.log(newItem.name + " is brand new!");
        //                 DatabaseRef.items().child(newItem.name).set(newItem);
        //             }
        //         });

                itemIsInHistory(newItem, function(historical) {
                    if (historical === true) {
                        console.log(newItem.name + " exists in history!");

                        checkWasteDataStatus(newItem, function(dataUpdated) {
                            if (!dataUpdated) {
                                // TODO Show modal and ask user for waste data
                                updateWasteScore(newItem, prompt("Waste?"));
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

                // updateWasteDataStatus(newItem, false); // TODO Only do this after items have been checked and archived

    }

    // TODO (Turner) Move item from history to shopping
    function setItemList(item, list) {
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
                callback(value.val());
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

    return {
        addItem: addItem,
        setItemList: setItemList,
        updateWasteScore: updateWasteScore,
        updateWasteDataStatus: updateWasteDataStatus,
        checkWasteDataStatus: checkWasteDataStatus
    }

}]);