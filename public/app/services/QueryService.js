/**
 * Contains functions to perform common database
 * related tasks.
 */
greenlistApp.service("DatabaseQuery", ["DatabaseRef", "CalculationService", "$uibModal", "$location",  function(DatabaseRef, CalculationService, $uibModal, $location) {

    /**
     * Adds a new waste score for an item.
     *
     * @param item The item to add a waste score for
     * @param callback The callback function
     */
    function updateWasteScore(item, callback) {
        // open modal
        var modalInstance = $uibModal.open({
            templateUrl: 'views/partials/modal.html',
            controller: 'ModalCtrl',
            windowClass: 'logwaste-popup'
        });

        // get score from modal
        modalInstance.result.then(function (data) {


            if (data === null) {

                console.error("null received from modal");

                callback(null)
            } else {
                console.log("Got from modal:", data);
                var wasteScore = {
                    date: Date.now(),
                    score: parseInt(data)
                };

                var push = DatabaseRef.wasteData(item).push();
                push.set(wasteScore);
                updateWasteDataStatus(item, true);
                setItemAverage(item);
                updateOverallAverage();
                callback(true);
            }
        }).catch(function(error) {
            console.error("Modal error!", error);
            callback(false);
        });

    }

    /**
     * Adds a new item to a user's list. First looks
     * for the item in the user's history and if it
     * is found checks to see if the user needs to
     * update the waste data. If the item is brand
     * new it is simple added to the shopping list.
     *
     * @param itemName The name of the new item
     */
    function addItem(itemName) {
        var newItem = {
            list: "shopping",
            name: itemName.toLowerCase(),
            checked: false,
            average: 0
        };

        if (newItem.name == "uuddlrlrba") {
            console.log("Welcome to the Warp Zone");
            DatabaseRef.overallAverage().set(450.05);
            newItem.name = "you win!";
        }

        if (newItem.name == "byu"){
            $location.url("/you-cant-have-egg-bacon-spam-and-sausage-with-the-spam");
        }

        itemIsInShopping(newItem, function(shoppingical) {
            if (shoppingical === true) {
                console.log(newItem.name + " is already in shopping");
            } else {
                console.log("Looking for " + newItem.name + " in history...");

                itemIsInHistory(newItem, function(historical) {
                    if (historical === true) {
                        console.log(newItem.name + " exists in history!");

                        checkWasteDataStatus(newItem, function(dataUpdated) {
                            if (!dataUpdated) {
                                // TODO Show modal and ask user for waste data
                                updateWasteScore(newItem, function(gotData) {
                                    if (gotData) {
                                        setItemList(newItem, "shopping");
                                    }
                                });
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
        });

    }

    /**
     * Moves an item to a different list by updating the
     * value of the list key. Checks which list the item
     * is moving to and updates or removes the checked key
     * accordingly.
     *
     * @param item The item to move
     * @param list The list to move the item to
     */
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

    /**
     * Updates the waste data status of an item.
     * True indicates the item has had its data updated
     * since the last purchase.
     *
     * @param item The item to update
     * @param status The status to set
     */
    function updateWasteDataStatus(item, status){
        var nameSet = {};
        var nameItem = item.name;
        nameSet[nameItem] = status;
        DatabaseRef.items().child(nameItem).update({"dataUpdated":status});
    }

    /**
     * Checks the waste data status of an item.
     *
     * @param item The item to check the status of
     * @param callback Callback function
     */
    function checkWasteDataStatus(item, callback){
        var check = DatabaseRef.wasteDataStatus(item);
        check.once("value")
            .then(function(value){
                console.log("Got " + value.val().dataUpdated);
                callback(value.val().dataUpdated);
            });
    }

    /**
     * Checks if an item is currently in the history
     * list.
     *
     * @param item The item to look for
     * @param callback Callback function
     */
    function itemIsInHistory(item, callback) {
        DatabaseRef.items().once("value")
            .then(function(data) {
                console.log("Got data");
                var isInHistory = data.hasChild(item.name)
                    && (data.child(item.name).val().list) === "history";

                callback(isInHistory);
            });
    }

    function itemIsInShopping(item, callback) {
        DatabaseRef.items().once("value")
            .then(function(data) {
                console.log("Got data");
                var isInShopping = data.hasChild(item.name)
                && (data.child(item.name).val().list) === "shopping";

                callback(isInShopping);
            });
    }

    /**
     * Marks and item as checked or unchecked. True
     * indicates checked.
     *
     * @param item The item to update
     * @param status The status to set
     */
    function updateCheckedStatus(item, status) {
        DatabaseRef.items().child(item.name).update({"checked": status});
    }

    /**
     * Deletes an item from a user's list
     *
     * @param item The item to delete
     */
    function deleteItem(item) {
        DatabaseRef.items().child(item.name).remove();
    }

    /**
     * Retreive all the waste scores for an item
     * and put them into an array that is sent to
     * the callback function.
     *
     * @param item The item to get waste scores for
     * @param callback The callback function
     */
    function getWasteData(item, callback) {
        DatabaseRef.wasteData(item).once("value").then(function(data) {
           var dataArray = [];

           data.forEach(function(score) {
              dataArray.push(score.val().score);
           });

           callback(dataArray);
        });
    }

    /**
     * Calculates and stores the average for
     * and item.
     *
     * @param item The item to calculate and store the average for
     */
    function setItemAverage(item) {
        console.log("Setting avg for item");
        getWasteData(item, function(data) {
            var sum = 0;
            var count = 0;

            data.forEach(function(score) {
                sum += score;
                count++;
            });

            DatabaseRef.items().child(item.name).update({"average": (sum / count)});
        });
    }

    /**
     * Gets the average for an items and passes
     * it to the callback function.
     *
     * @param item The item to get the average for
     * @param callback The callback function
     */
    function getItemAverage(item, callback) {
        DatabaseRef.items().child(item.name).child("average").once("value").then(function(data) {
           callback(data.val());
        });
    }

    function getAllItemAverages(callback) {
        DatabaseRef.items().once("value").then(function(data) {
           var dataArray = [];

           data.forEach(function(item) {
              dataArray.push(item.val().average);
           });

           callback(dataArray);
        });
    }

    function updateOverallAverage() {
        console.log("Setting overall avg");
        getAllItemAverages(function(data) {
            DatabaseRef.overallAverage().set(CalculationService.calAvg(data));
        });
    }

    /**
     * Gets the current user's overall average
     *
     * @param callback The callback function
     */
    function getOverallAverage(callback) {
        DatabaseRef.overallAverage().once("value").then(function(data) {
           callback(data.val());
        });
    }

    /**
     * Sets a user's rank in the leaderboard.
     *
     * @param average The value to set
     */
    function setRank(average) {
        DatabaseRef.leaderBoardScore().set(average);
    }

    /**
     * Gets a user's rank in the leaderboard.
     *
     * @param callback The callback function
     */
    function getRank(callback) {
        DatabaseRef.leaderBoardScore().once("value").then(function(data) {
           callback(data.val());
        });
    }

    /**
     * Gets the 3 items with the highest averages.
     *
     * @param callback The callback function
     */
    function getTopEfficient(callback) {
        DatabaseRef.items().orderByChild("average").limitToLast(3).once("value").then(function(data) {
            var dataArray = [];

            data.forEach(function(item) {
                dataArray.push(item.val().name);
            });

            callback(dataArray);
        });
    }

    /**
     * Gets the 3 items with the lowest averages.
     *
     * @param callback The callback function
     */
    function getBottomEfficient(callback) {
        DatabaseRef.items().orderByChild("average").limitToFirst(3).once("value").then(function(data) {
            var dataArray = [];

            data.forEach(function(item) {
                dataArray.push(item.val().name);
            });

            callback(dataArray);
        });
    }

    return {
        updateWasteScore: updateWasteScore,
        addItem: addItem,
        setItemList: setItemList,
        updateWasteDataStatus: updateWasteDataStatus,
        checkWasteDataStatus: checkWasteDataStatus,
        itemIsInHistory: itemIsInHistory,
        itemIsInShopping: itemIsInShopping,
        updateCheckedStatus: updateCheckedStatus,
        deleteItem: deleteItem,
        getWasteData: getWasteData,
        setItemAverage: setItemAverage,
        getItemAverage: getItemAverage,
        getAllItemAverages: getAllItemAverages,
        updateOverallAverage: updateOverallAverage,
        getOverallAverage: getOverallAverage,
        setRank: setRank,
        getRank: getRank,
        getTopEfficient: getTopEfficient,
        getBottomEfficient: getBottomEfficient
    }

}]);