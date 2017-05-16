/**
 * Contains functions to perform common database
 * related tasks.
 */
greenlistApp.service("CalculationService", ["DatabaseRef", function(DatabaseRef) {

    function calAvg(array){
       var i;
       var sum = 0;
       for( var i = 0; i < array.length; i++ ){
           sum += parseInt( array[i], 10 );
       }

       var avg = sum/array.length;
       return avg;

    }

    function colorCalc(percent){
        if (percent <= 25){
            return "red";
        } else if (percent <= 50) {
            return "orange";
        } else if (percent <= 75) {
            return "yellow";
        } else {
            return "green";
        }
    }


return{
        calAvg: calAvg,
        colorCalc: colorCalc,
}

}]);