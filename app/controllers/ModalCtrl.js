greenlistApp.controller('ModalCtrl', function($scope, $modalInstance) {

     $scope.back = function() {
      	$modalInstance.close($scope.test.input);
   	};
});