greenlistApp.controller('ModalCtrl', function($scope, $modalInstance) {

         $scope.test = {};
         $scope.back = function() {
           	$modalInstance.close($scope.test.input);
     	};
});