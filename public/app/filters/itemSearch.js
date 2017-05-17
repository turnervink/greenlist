greenlistApp.filter("itemSearch", function() {
   return function(arr, query) {
       if (!query) {
           return arr;
       }

       var result = [];

       query = query.toLowerCase();
       angular.forEach(arr, function(item) {
          if (item.name.indexOf(query) !== -1) {
              result.push(item)
          }
       });

       return result;
   }
});