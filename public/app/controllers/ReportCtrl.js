greenlistApp.controller("ReportCtrl",
    ["CurrentAuth", "$scope", "UserInfo", "DatabaseRef", "$firebaseObject", "$firebaseArray", "CalculationService", "DatabaseQuery","$uibModal",
    function(CurrentAuth, $scope, UserInfo, DatabaseRef, $firebaseObject, $firebaseArray, CalculationService, DatabaseQuery, $uibModal) {

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
        $scope.menuMargin = '0';




        var setOverallAvg = $firebaseObject(DatabaseRef.overallAverage());
        setOverallAvg.$bindTo($scope, "calAverage").then(function() {
            console.log("Bound", $scope.calAverage);

            var scoreAnim = new CountUp("elo-rating", 0, $scope.calAverage.$value, 0, 1.5);
            scoreAnim.start(); // Animate the efficiency score counting up

            /*
                Various motivational messages for the reports page.
             */
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
            } else if ($scope.calAverage.$value === 450) {
                $scope.motivationMsg = "Dammit Nappa!";
            } else {
                $scope.motivationMsg = "Dammit Nappa!";
            }

            if ($scope.calAverage.$value < 40) {
                $scope.grade = "D";
            } else if ($scope.calAverage.$value <= 63) {
                $scope.grade = "C";
            } else if ($scope.calAverage.$value <= 73) {
                $scope.grade = "B";
            } else if ($scope.calAverage.$value <= 83) {
                $scope.grade = "A";
            } else if ($scope.calAverage.$value <= 86) {
                $scope.grade = "A+";
            } else if ($scope.calAverage.$value <= 100) {
                $scope.grade = "A++";
            } else if ($scope.calAverage.$value === 450.05) {
                $scope.grade = "Over 9000";
            }

            if($scope.calAverage.$value > 86) {
                $scope.confetti = true;
            } else {
                $scope.confetti = false;
            }

            if ($scope.calAverage.$value === null) {
                $scope.tweetText = "I just started using greenlist to work on reducing my food waste! Try it today at greenl.ist -"
            } else {
                $scope.tweetText = "My food efficiency grade is " + $scope.grade + " on greenlist! Try it today at greenl.ist -";
            }

        });

        // Bind to the top and bottom 3 items in terms of efficiency
        $scope.setTopEff = $firebaseArray(DatabaseRef.topEfficient());

        $scope.setBotEff = $firebaseArray(DatabaseRef.bottomEfficient());

        /**
         * Gets the correct text color for an average.
         *
         * @param average The average to colour
         * @returns {{color: *}} ng-style object
         */
        $scope.getTextColor = function(average) {
            var color = CalculationService.calBarColor(average);
            return {
                "color": color
            }
        }

        /**
         * Gets the correct background color for an average.
         *
         * @param average The average to colour
         * @returns {{color: *}} ng-style object
         */
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


        // tempo placeholder
        $scope.dateRange = 'Last 2 Weeks';

        /**
         * Show the date picker menu by increasing the bottom margin.
         */
        $scope.showDateMenu = function() {
            $scope.menuMargin = '8.8vh';           
        }

        /**
         * Hide the date picker menu by decreasing the bottom margin.
         */
        $scope.hideDateMenu = function() {
            $scope.menuMargin = '0';
        }

        $scope.dataModal = function(item) {

            // Get the needed data for graphing
            DatabaseQuery.getChartData(item, function(dates, scores, recentDates, recentScores) {
                console.log("Got dates and scores", dates, scores, recentDates, recentScores);

                var modalInstance = $uibModal.open({
                    templateUrl: 'views/partials/detailReportModal.html',
                    windowClass: 'dataModal',

                    // Controller for the modal
                    controller: function($scope, $uibModalInstance) {
                        $scope.food = item;

                        // Chart variables
                        $scope.labels = dates;
                        $scope.chartData = scores;
                        $scope.colors = ['#278518', '#278518', '#278518', '#278518'];
                        $scope.options = {
                            elements: {
                                point: {}
                            },
                            scales: {
                                yAxes: [
                                    {
                                        id: 'y-axis-1',
                                        type: 'linear',
                                        display: true,
                                        position: 'left',
                                        ticks: {
                                            beginAtZero: true,
                                            max: 100,
                                            stepSize: 50,
                                            fontSize: 16,
                                            fontFamily: "Asap"
                                        }
                                    }
                                ],
                                xAxes: [
                                    {
                                        display: true,
                                        ticks: {
                                            maxTicksLimit: 5,
                                            fontSize: 16,
                                            minRotation: 45,
                                            fontFamily: "Asap"
                                        }
                                    }
                                ]
                            },
                            pan: {
                                enabled: true,
                                mode: "x"
                            },
                            zoom: {
                                enabled: true,
                                drag: false,
                                mode: "x"
                            }
                        };

                        // Recent chart variables
                        $scope.recentLabels = recentDates;
                        $scope.recentChartData = recentScores;
                    }

                });
            });
        }


        // Chart test code
        var item = {
            "name": "bread"
        };


}]);
