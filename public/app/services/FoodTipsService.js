greenlistApp.service("FoodTipsService", [ function(){
    function randomizer(){
        var getTipIndex = function(length){
            return Math.floor(Math.random() * length);
        }

        var foodTips = [];
        foodTips = [
            {
                text:"Soft cheese should be stored in an airtight container, " +
                "while semi-hard and hard cheese should be wrapped in wax/parchment paper"
            },
            {
                text: "tip2"
            },
            {
                text: "tip2"
            },
            {
                text: "tip3"
            },
            {
                text: "tip4"
            },
            {
                text: "tip5"
            }
        ]

        return foodTips[getTipIndex(foodTips.length)].text
    }



        return{
            randomizer: randomizer,
        }
}]);
