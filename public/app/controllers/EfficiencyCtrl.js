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

            DatabaseQuery.getWasteData(item, function(chartData) {
                console.log(chartData);
                var chartData = chartData;

                DatabaseQuery.getWasteDates(item, function(dates) {
                    console.log(dates);
                    var labels = dates;

                    var modalInstance = $uibModal.open({
                        templateUrl: 'views/partials/detailReportModal.html',

                        //controller for the modal
                        controller: function($scope, $uibModalInstance){
                            $scope.food = item;
                            console.log(item);

                            $scope.chartData = chartData;
                            $scope.labels = labels;


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

                            $scope.colors = ['#278518', '#278518', '#278518', '#278518'];



                        }

                    })
                });
            });






        }



        }]);