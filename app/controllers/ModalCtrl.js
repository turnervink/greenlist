/**
* Close modal when the back is clicked.
*/
greenlistApp.controller('ModalCtrl', function($scope, $modalInstance) {
    /**
    * Close the modal.
    */
     $scope.test = {};
              $scope.back = function() {
                	$uibModalInstance.close($scope.test.input);
          	};
});