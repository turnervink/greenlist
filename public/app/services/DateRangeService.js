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

    return {
        getDate: getDate,
        getRangeStart: getRangeStart
    }

}]);