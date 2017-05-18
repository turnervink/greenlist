/**
 * Controller for detail report page
 */
greenlistApp.controller("EfficiencyCtrl",
    ["$scope", "$uibModal", "DatabaseQuery", "DatabaseRef", "$firebaseObject","UserInfo", "CurrentAuth",
        function($scope, $uibModal, DatabaseQuery, DatabaseRef, $firebaseObject, UserInfo, CurrentAuth) {

    UserInfo.initUser(CurrentAuth.displayName, CurrentAuth.uid, CurrentAuth.photoURL, CurrentAuth.email);

        $scope.heading = 'Item Data';
        $scope.listBtnColor = 'white';
        $scope.histBtnColor = 'green';
        $scope.reptBtnColor = 'white';
        $scope.listColor = 'black';
        $scope.histColor = 'white';
        $scope.reptColor = 'black';

        var listFood = $firebaseObject(DatabaseRef.getRefToAllList());
        $scope.listItem = listFood;

        $scope.dataModal = function(item) {

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
                            }
                        };

                        // Recent chart variables
                        $scope.recentLabels = recentDates;
                        $scope.recentChartData = recentScores;
                    }

                });
            });
        }
}]);