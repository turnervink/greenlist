greenlistApp.controller("EfficiencyCtrl",
    ["$scope", "$uibModal", "DatabaseQuery", "DatabaseRef", "$firebaseObject","UserInfo", "CurrentAuth", function($scope, $uibModal, DatabaseQuery, DatabaseRef, $firebaseObject, UserInfo, CurrentAuth) {

    UserInfo.initUser(CurrentAuth.displayName, CurrentAuth.uid, CurrentAuth.photoURL, CurrentAuth.email);

        $scope.heading = 'Detail Report';
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
                    $scope.foodName = data;

                }

            })
        }









        }]);