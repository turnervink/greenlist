greenlistApp.controller("ReportCtrl",
    ["CurrentAuth", "$scope", "UserInfo", "DatabaseRef", "$firebaseObject", "$firebaseArray", "CalculationService", "DatabaseQuery",
    function(CurrentAuth, $scope, UserInfo, DatabaseRef, $firebaseObject, $firebaseArray, CalculationService, DatabaseQuery) {

    	UserInfo.initUser(CurrentAuth.displayName, CurrentAuth.uid, CurrentAuth.photoURL, CurrentAuth.email);

        // Setting report page heading content and nav bar button style
        $scope.heading = 'Report';
    	$scope.listBtnColor = 'white';
    	$scope.histBtnColor = 'white';
    	$scope.reptBtnColor = 'green';
    	$scope.listColor = 'black';
    	$scope.histColor = 'black';
    	$scope.reptColor = 'white';
        $scope.listBgImg = 'images/icons/cart-off.png';
        $scope.histBgImg = 'images/icons/hist-icon-off.png';
        $scope.reptBgImg = 'images/icons/reports-on.png';
        $scope.menuHeight = '19vh';
        $scope.menuMargin = '0';




        var setOverallAvg = $firebaseObject(DatabaseRef.overallAverage());
        setOverallAvg.$bindTo($scope, "calAverage").then(function() {
            console.log("Bound", $scope.calAverage);
            var scoreAnim = new CountUp("elo-rating", 0, $scope.calAverage.$value * 20, 0, 3);
            scoreAnim.start();

            if ($scope.calAverage.$value < 10) {
                $scope.motivationMsg = "We know you can do better!";
            } else if ($scope.calAverage.$value < 25) {
                $scope.motivationMsg = "Good job so far!";
            } else if ($scope.calAverage.$value < 50) {
                $scope.motivationMsg = "Almost halfway there!";
            } else if ($scope.calAverage.$value == 50) {
                $scope.motivationMsg = "Halfway there!";
            } else if ($scope.calAverage.$value < 75) {
                $scope.motivationMsg = "Keep it up!";
            } else if ($scope.calAverage.$value <= 100) {
                $scope.motivationMsg = "You're doing awesome!";
            } else if ($scope.calAverage.$value == 9001) {
                $scope.motivationMsg = "Dammit Nappa!";
            } else {
                $scope.motivationMsg = "Keep it up!";
            }


        });

        $scope.setTopEff = $firebaseArray(DatabaseRef.topEfficient());
        // setTopEff.$bindTo($scope, "topItem");

        $scope.setBotEff = $firebaseArray(DatabaseRef.bottomEfficient());
        // setBottomEff.$bindTo($scope, "botItem");


        $scope.getTextColor = function(average) {
            var color = CalculationService.calBarColor(average);
            return {
                "color": color
            }
        }

        $scope.getBackgroundColor = function(average) {
            var color = CalculationService.calBackColor(average);
            var textcolor;

            if (average == 100) {
                textcolor = "white";
            } else {
                textcolor = "black";
            }

            return {
                "background-color": color
            }
        }



        $scope.dateRange = 'Last 2 Weeks';

        $scope.showDateMenu = function() {
            $scope.menuHeight = '27.58vh';
            $scope.menuMargin = '8.8vh';
        }

        $scope.hideDateMenu = function() {
            $scope.menuHeight = '19vh';
            $scope.menuMargin = '0';
        }


        // Chart test code
        var item = {
            "name": "bread"
        };

        function getChart() {
            DatabaseQuery.getWasteData(item, function(data) {
                console.log(data);
                $scope.data = data;
            });

            DatabaseQuery.getWasteDates(item, function(data) {
                console.log(data);
                $scope.labels = data;
            });

            $scope.options = {
                scales: {
                    yAxes: [
                        {
                            id: 'y-axis-1',
                            type: 'linear',
                            display: true,
                            position: 'left',
                            ticks: {
                                beginAtZero: true
                            }
                        }
                    ],
                    xAxes: [
                        {
                            display: true
                        }
                    ]
                }
            };
        }

        getChart();

}]);