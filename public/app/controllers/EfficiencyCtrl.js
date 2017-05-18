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

        $scope.confirmModal = function(data) {
            var modalInstance = $uibModal.open({
                templateUrl: 'views/partials/detailReportModal.html',


                //controller for the modal
                controller: function($scope, $uibModalInstance){
                    $scope.food = data;


                        DatabaseQuery.getWasteData(data, function(data) {
                            console.log(data);
                            $scope.data = data;
                        });

                        DatabaseQuery.getWasteDates(data, function(data) {
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

            })


        }



        }]);