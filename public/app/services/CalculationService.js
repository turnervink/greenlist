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

return{
        calAvg: calAvg,
}

}]);