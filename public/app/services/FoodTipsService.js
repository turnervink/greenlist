greenlistApp.service("FoodTipsService", [ function(){
    /**
     * Get a random int from 0 to length - 1 inclusive
     * intended to be used to get random index of array
     * Use it for whatever tho
     * @param length highest number + 1
     * @returns random int from 0 to length - 1 inclusive
     */
    function randomizer(length){
        return Math.floor(Math.random() * length);
    }

    /**
     * return all of the food tips in an array
     * @returns Array of food tips
     */
    function getTips(){
        var foodTips = [];
        foodTips = [
            "Soft cheese should be placed in an airtight container when opened, " +
            "while semi-hard and hard cheese should be wrapped in wax/parchment paper",

            "Both milk and yogurt can be frozen. Transfer into glass or freezer-proof containers, " +
            "and leave an inch of space for expansion. When thawed, make sure to mix",

            "Store apples, bananas, citrus, and tomatoes separate from other produce. " +
            "They give off ethylene gas that makes other produce ripen faster",

            "Untie bunches (herbs, greens, etc) to allow produce to breathe",

            "Stale bread can be kept for breadcrumbs, french toast, or bread pudding",

            "Fruit past it's prime can be made into sauces, crisps, cobblers, etc.",

            "Whenever freezing food, make sure it is in an airtight container " +
            "with as much air removed as possible",

            "For best results, keep your fridge between 37\xB0 F and 40\xB0 F. " +
            "Keep your freezer beetween 0\xB0 F and 2\xB0 F",

            "Use your fridge's crisper drawer. It helps keep many vegetables longer. If there is a humidity slider, " +
            "set it on high for leafy greens or low for non leafy vegetables",

            "Eat the bruised apple first, one bad apple really does ruin the whole bunch",

            "You can store apples in the fridge to extend shelf life, but for longer storage, " +
            "store in a carboard box covered with a damp towel",

            "Store asparagus in the fridge. They'll last longer if you trim the base of the stalks and " +
            "place them upright in a jar with an inch of water. Alternatively, wrap the cut ends of the stalks " +
            "in a moist paper towel or cloth",

            "Avacadoes can be ripened faster by placing in a paper bag, and placing an apple in with it. " +
            "Once ripe, store avacadoes in the fridge.",

            "You can freeze bananas with or with or without the peel, " +
            "and use them later in baked goods or smoothies",

            "basil should be stored on the counter in a glass of water like a cut flower, " +
            "or wrapped in a dry paper towel in an airtight container",

            "Store beets in the fridge (greens removed) in an airtight container with a paper towel " +
            "inside to absorb moisture.",

            "You can eat the beet greens",

            "When storing berries, remove any spoiled or crshed ones first. Store them in a airtight container, " +
            "and dont wash them until ready to eat - added moisture encourages mold",

            "Store sliced bread in an airtight container in the freezer, and thaw in the mircrowave or toaster",

            "Store brown sugar in an airtight container. Keep a few marshmallows or a slice of bread on top " +
            "to keep the sugar from drying out and getting hard",

            "If brussels sprouts are on the stalk, leave them on and store in the fridge. If they are loose store in " +
            "an open container in the fridge with a damp towel on top",

            "Peel off outer leaves of cabbage as they start to wilt.",

            "Cabbage goes bad faster than other produce",

            "Cut the tops off of carrots to keep them fresh longer",

            "Store carrots in the fridge either in a container of water or " +
            "unwashed in an airtight container in the crisper drawer with plenty of moisture",

            "Cauliflower should be stored in an airtight container in the fridge",

            "Cauliflower goes bad faster than other produce",

            "Store celery in the fridge either in a container of water or an airtight container",

            "Celery leaves can be washed, dried, and frozen, then added into soups/stews for extra flavour",

            "Butter can be stored in the freezer. Cut into tablespoon-sized chunks and place in airtight container",

            "Hard and semi-hard cheeses can be grated or cubed and stored in the freezer. " +
            "After being in the freezer, it's best used for cooking",

            "Never store citrus in an airtight container. If you have a cut lemon or lime, " +
            "wrap the cut end in a damp paper towel",

            "Juice from citrus can be used to stop apples, pears, and avacadoes from going brown",

            "Leave husks on fresh corn and store open in the fridge",

            "Cream can be frozen. Lightly whip before freezing to prevent if from getting grainy. " +
            "Freeze in ice cube trays then transfer cubes to an airtight container",

            "To test if an egg is still good, drop it in a glass of water. " +
            "If the egg floats it is rotten.",

            "Keep flour in airtight containers in a cool, dark place",

            "Keep bones and carcasses to make soup or stock. Keep them in the freezer to use later",

            "Store melons in a cool, dry place out of the sun. Once ripe, store in the fridge",

            "Keep mushrooms in a paper bag in the fridge to avoid getting slimy",

            "Mushrooms can be sautéed and then frozen",

            "Store whole onions in a cool, dark place somewhere slightly warmer than the fridge. " +
            "Store partially used onions in the fridge " +
            "in an airtight container, leaving the papery outer layer on.",

            "Onions cause potatoes to sprout, so keep them separate",

            "Only wash peppers right before eating them",

            "Partially-eaten peppers can be stored in the fridge with the seeds and stems attached " +
            "to extend shelf life",

            "Persimmons should be stored at room temperature until ripe and then stored in the fridge. " +
            "To hasten the ripening process, place in a paper bag with a few apples",

            "Store potatoes in a cool, dark place somewhere slightly warmer than the fridge. " +
            "Moisture and exposure to light causes spoilage.",

            "Potatoes that have started to sprout are still good to eat, just cut off the spouts and eyes.",

            "Apples help stop potatoes from sprouting",

            "Cooked and mashed potatoes can be frozen to eat later",

            "Store dry rice in an airtight container. " +
            "Cooked rice can be frozen in an airtight container",

            "Store sweet potatoes in a cool, dark, well ventilated place. Never refrigerate",

            "Tomatoes can be frozen either raw or cooked. Tomatoes should be stored on the counter " +
            "unless very ripe, at which point transfer them to the fridge",

            "Potatoes turning green? put a garbage bag over them",

            "You can regrow lettuce if u have the root end. " +
            "Some leaves will regrow if put in water",

            "Pinapples ripen faster if stored upside down",

            "A pinapple is ripe if you can smell it easily",

            "Ground beef or steak that turns brown is still ok to eat. A good " +
            "way to tell if it's gone bad is if it smells bad"
        ]
        return foodTips;
    }

    return{
        randomizer: randomizer,
        getTips: getTips
    }
}]);
