/**
 * Contains functions to perform common database
 * related tasks.
 */
greenlistApp.service("DatabaseQuery", ["DatabaseRef", "UserInfo", "CalculationService", "$uibModal", "$location",  function(DatabaseRef, UserInfo, CalculationService, $uibModal, $location) {

    /**
     * Adds a new waste score for an item.
     *
     * @param item The item to add a waste score for
     * @param callback The callback function
     */
    function updateWasteScore(item, status, callback) {
        // open modal
        var modalInstance = $uibModal.open({
            templateUrl: 'views/partials/modal.html',
            windowClass: 'logwaste-popup',
            //controller for the modal
            controller:function($scope, $uibModalInstance){
                $scope.nonFood = item.NonFood;
                if (status){
                    $scope.cancel = true;
                }
                else {
                    $scope.cancel = false;
                }

                $scope.setNonFood = function(status){
                    console.log(status);

                    DatabaseRef.setNonFoodStatus(item, status);

                    if (status) {
                        $uibModalInstance.close(null);
                    }

                }

                /**
                 * Close the modal.
                 */
                $scope.back = function() {
                    $uibModalInstance.close($scope.test.input);
                };

                /**
                 * close without logging waste
                 */
                $scope.later = function() {

                    if (status) {
                        $uibModalInstance.close(null); // Pass null if there isn't any data
                    } else {
                        $uibModalInstance.close("deferred");
                    }

                }
            }
        });


        // get score from modal
        modalInstance.result.then(function (data) {
            //set the modal button to cancel or ask me later
            if (data === null) {
                console.error("null received from modal");
                callback(null)
            } else {
                console.log("Got from modal:", data);

                if (data !== "deferred") {
                    var wasteScore = {
                        date: Date.now(),
                        score: parseInt(data)
                    };

                    var push = DatabaseRef.wasteData(item).push();
                    push.set(wasteScore);
                    updateWasteDataStatus(item, true);
                    setItemAverage(item);
                    updateOverallAverage();
                }

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
            quantity: "#",
            NonFood: false
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
                        checkWasteDataStatus(newItem, function(dataUpdated, nonFood) {
                            console.log("Nonfood is", nonFood);
                            if (!dataUpdated && !nonFood) {
                                // TODO Show modal and ask user for waste data
                                updateWasteScore(newItem, false, function(gotData) {

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
            DatabaseRef.items()
                .child(item.name)
                .child("quantity")
                .remove();
        }

        if (list == "shopping") {
            DatabaseRef.items()
                .child(item.name)
                .child("checked")
                .set(false);
            DatabaseRef.items()
                .child(item.name)
                .child("quantity")
                .set("qty");
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
                callback(value.val().dataUpdated, value.val().NonFood);
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

    /**
     * Checks if an item is already in the
     * shopping list.
     *
     * @param item The item to check for
     * @param callback The callback function
     */
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
     * Gets waste scores and datestamp data for
     * and item for displaying in a chart.
     *
     * @param item The item to get data for
     * @param callback The callback function
     */
    function getChartData(item, callback) {
        DatabaseRef.wasteData(item).orderByChild("date").once("value").then(function(data) {
            var scoresArray = [];
            var datesArray = [];
            var recentScoresArray = [];
            var recentDatesArray = [];

            var rangeStart = new Date();
            rangeStart.setDate(rangeStart.getDate() - 14);
            var rangeStartStamp = rangeStart.getTime();
            console.log(rangeStartStamp);

            data.forEach(function(score) {
                // Get last two weeks
                if (score.val().date >= rangeStartStamp) {
                    console.log("In last 2 weeks");

                    // Get date
                    var date = new Date(score.val().date);

                    var month = date.getMonth();
                    var day = date.getDate();
                    var year = date.getFullYear().toString().substr(-2);

                    recentDatesArray.push(month + "/" + day + "/" + year);

                    // Get score
                    recentScoresArray.push(score.val().score);
                }

                // Get date
                var date = new Date(score.val().date);

                var month = date.getMonth();
                var day = date.getDate();
                var year = date.getFullYear().toString().substr(-2);

                datesArray.push(month + "/" + day + "/" + year);

                // Get score
                scoresArray.push(score.val().score);
            });

            callback(datesArray, scoresArray, recentDatesArray, recentScoresArray);
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

    /**
     * Gets all items averages for a user.
     *
     * @param callback The callback function
     */
    function getAllItemAverages(callback) {
        DatabaseRef.onlyFoodItems().once("value").then(function(data) {
           var dataArray = [];

           data.forEach(function(item) {

               if (item.val().average != null) {
                   console.log("Adding " + item.val().average);
                   dataArray.push(item.val().average);
               }

           });

           callback(dataArray);
        });
    }

    /**
     * Updates a user's overall average.
     */
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
        DatabaseRef.items().orderByChild("average").once("value").then(function(data) {
            console.log(data.val());
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
        DatabaseRef.items().orderByChild("average").once("value").then(function(data) {
            console.log(data.val());
            var dataArray = [];

            data.forEach(function(item) {
                dataArray.push(item.val().name);
            });

            callback(dataArray);
        });
    }

    function setQuantity(item, qty){
        DatabaseRef.quantity(item).set(qty);
    }
    /**
     * Creates a new shared list and adds it to
     * the user's sharedLists node as well as the
     * global sharedLists node.
     *
     * @param name the name of the new list
     */
    function createNewList(name) {
        if (name === undefined){
            console.error("No list name entered!");
        } else {

            var newListKey = DatabaseRef.sharedLists().push().key;

            var listEntry = {
                name: name + " (" + UserInfo.getCurrentUser().displayName + ")",
                listKey: newListKey,
            }

            DatabaseRef.sharedLists().child(newListKey).update(listEntry);
            DatabaseRef.userSharedLists().child(newListKey).update(listEntry);
        }
    }

    /**
     * Adds a user to a shared list.
     *
     * @param listKey the key of the list to add someone to
     * @param listName the name of the list to add someone to
     */
    function shareList(listKey, listName) {
        $uibModal.open({
            templateUrl: 'views/partials/shareList.html',
            windowClass: 'shareList-popup',
            controller: function($scope, $uibModalInstance, UserInfo){

                $scope.addUserEmail = function(friendEmail){

                    var friendUID;

                    var userEmails = firebase.database().ref('/emails');

                    userEmails.once("value", function(snapshot) {

                        snapshot.forEach(function(data) {

                            if (data.val() === friendEmail) {
                                friendUID = data.getKey();
                            }
                        });

                        if (friendUID === undefined) {
                            $scope.errorMsg = "Sorry! We couldn't find that email.";
                        } else {
                            var addList = {
                                name: listName,
                                listKey: listKey,
                            };

                            DatabaseRef.friendSharedLists(friendUID).child(listKey).update(addList);
                            $uibModalInstance.close();
                        }



                    });

                }
             }
        });
    }
                
    /**
     * Erases all data at the root of a user's
     * database node.
     */
    function eraseData() {

        // First modal to confirm decision
        var modalInstance = $uibModal.open({
            templateUrl: 'views/partials/cleardatamodal.html',
            windowClass: 'logwaste-popup',
            controller:function($scope, $uibModalInstance){

                /**
                 * Fired if user confirms the deletion the first time.
                 */
                $scope.yes = function() {
                    console.log("yes");
                    $uibModalInstance.close(null);

                    // Confirm a second time
                    var confirmModalInstance = $uibModal.open({
                        templateUrl: 'views/partials/cleardatamodalconfirm.html',
                        windowClass: 'logwaste-popup',

                        controller:function($scope, $uibModalInstance){

                            /**
                             * Fired if user confirms the deletion the second time.
                             * Deletes all user data.
                             */
                            $scope.yes = function() {
                                console.log("yes");
                                $uibModalInstance.close(null);
                                DatabaseRef.root().remove().then(function() {
                                    console.log("Deleted user data");
                                    $location.url("/goodbye");
                                });
                            };

                            /**
                             * Fired if user doesn't confirm the deletion.
                             */
                            $scope.no = function() {
                                console.log("no");
                                $uibModalInstance.close(null);
                            }


                        }
                    });
                };

                /**
                 * Fired if user doesn't confirm the deletion.
                 */
                $scope.no = function() {
                    console.log("no");
                    $uibModalInstance.close(null);
                }

            }
        });
    }

    /**
     * Deletes a user's reference to a shared list.
     * List data remains in the database.
     * (Orphaned lists are not auto-removed. This
     * will be fixed in the future).
     *
     * @param listKey the key of the list to remove
     */
    function deleteSharedList(listKey) {
        DatabaseRef.userSharedLists().child(listKey).remove();
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
        getChartData: getChartData,
        setItemAverage: setItemAverage,
        getItemAverage: getItemAverage,
        getAllItemAverages: getAllItemAverages,
        updateOverallAverage: updateOverallAverage,
        getOverallAverage: getOverallAverage,
        setRank: setRank,
        getRank: getRank,
        getTopEfficient: getTopEfficient,
        getBottomEfficient: getBottomEfficient,
        setQuantity: setQuantity,
        createNewList: createNewList,
        shareList: shareList,
        deleteSharedList: deleteSharedList,
        eraseData: eraseData
    }

}]);
