greenlistApp.service("DateRange", ["DatabaseRef", function(DatabaseRef) {

    /**
     * Gets the current date (set to midnight) and
     * converts it to a Unix timestamp.
     *
     * @returns {number} The datestamp
     */
    function getDate() {
        var date = new Date();
        date.setHours(0, 0, 0);
        date.setMilliseconds(0);

        // console.log(date.getTime() / 1000);
        return date.getTime() / 1000;
    }

    /**
     * Gets a date a number of days in the past
     * and sets it to midnight. Converts it to a
     * Unix timestamp.
     *
     * @param daysBack The number of days to go back
     * @returns {number} The datestamp
     */
    function getRangeStart(daysBack) {
        var date = new Date();
        date.setDate(date.getDate() - daysBack);
        date.setHours(0, 0, 0);
        date.setMilliseconds(0);

        // console.log(date.getTime() / 1000);
        return date.getTime() / 1000;
    }

    /**
     * Sends waste scores for an item within a given
     * date range to a callback function.
     *
     * @param item The item to get waste scores for
     * @param daysBack The number of days to search back
     * @param callback The callback function
     */
    function getWasteScoresForRange(item, daysBack, callback) {
        console.log("Getting data from " + getRangeStart(daysBack) + " to " + getDate());

        DatabaseRef.wasteData(item).orderByChild("date").startAt(getRangeStart(daysBack)).once("value").then(function(data) {
            var dataArray = [];
            
            data.forEach(function(score) {
               dataArray.push(score.val().score);
            });

            callback(dataArray);
        });
    }

    return {
        getDate: getDate,
        getWasteScoresForRange: getWasteScoresForRange
    }

}]);