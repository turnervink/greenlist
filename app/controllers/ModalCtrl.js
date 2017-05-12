greenlistApp.controller('ModalCtrl', function($scope, $uibModalInstance) {

         $scope.test = {};
         $scope.back = function() {
           	$uibModalInstance.close($scope.test.input);
     	};
});