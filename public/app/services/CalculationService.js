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

    function calBackColor(average) {

      return 'hsl(' + (average * 1.2) + ', 100%, 90%)';
    }

    function calBarColor(average) {
      var light = 50 - (average - 60) * 0.5;
      return 'hsl(' + (average * 1.2) + ', 100%, ' + (light > 50 ? 50 : light) + '%)';
    }

return{
        calAvg: calAvg,
        calBackColor: calBackColor,
        calBarColor: calBarColor
}

}]);