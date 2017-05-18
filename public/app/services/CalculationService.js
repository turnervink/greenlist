/**
 * Contains functions to perform common database
 * related tasks.
 */
greenlistApp.service("CalculationService", ["DatabaseRef", function(DatabaseRef) {

    /**
     * calculates the average value of an array.
     *
     * @param array input as an array
     */
    function calAvg(array){
       var i;
       var sum = 0;
       for( var i = 0; i < array.length; i++ ){
           sum += parseInt( array[i], 10 );
       }

       var avg = sum/array.length;
       return avg;

    }

    /**
     * Returns a string constisting the style definition for the background
     * color. The hue of the color is determined by the average.
     */
    function calBackColor(average) {

      return 'hsl(' + (average * 1.2) + ', 100%, 90%)';
    }

    /**
     * Returns a string constisting the style definition for the bar
     * color. The hue of the color is determined by the average. The lightness
     * reduces when average goes above 60.
     */
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