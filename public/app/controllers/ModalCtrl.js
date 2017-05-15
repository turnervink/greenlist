/**
* Close modal when the back is clicked.
*/
greenlistApp.controller('ModalCtrl', function($scope, $uibModalInstance) {
    /**
    * Close the modal.
    */
     $scope.back = function() {
      	$uibModalInstance.close($scope.test.input);
   	};
});