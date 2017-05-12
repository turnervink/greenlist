/**
* Close modal when the back is clicked.
*/
greenlistApp.controller('ModalCtrl', function($scope, $modalInstance) {

     $scope.back = function() {
      	$modalInstance.close($scope.test.input);
   	};
});