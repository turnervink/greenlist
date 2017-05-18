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

    /**
     * close without logging waste
     */
    $scope.later = function() {
         $uibModalInstance.close(null); // Pass null if there isn't any data
     }
$scope.cancel = true;
});