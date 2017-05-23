/**
 * Brings out side nav by injecting new view with modal.
 */
greenlistApp.controller('PanelCtrl', function($scope, $aside, UserInfo, DatabaseRef, $firebaseObject, $uibModal, DatabaseQuery) {
    $scope.userPic = UserInfo.getCurrentUser().photoUrl;

    $scope.asideState = {
        open: false
    };

    /**
     * Change state of the side nav to true and set position
     *
     * @param position set position
     * @param backdrop set the backdrop
     */
    $scope.openAside = function(position, backdrop) {
        $scope.asideState = {
            open: true,
            position: position
        };
        /**
         * close the side nav
         */
        function postClose() {
            $scope.asideState.open = false;
        }

        $aside.open({
            templateUrl: 'views/html/aside.html',
            placement: position,
            windowClass: 'aside-popup',
            size: 'sm',
            backdrop: backdrop,
            controller: function($scope, $uibModalInstance, UserInfo) {
                $scope.userPic = UserInfo.getCurrentUser().photoUrl;
                $scope.userName = UserInfo.getCurrentUser().displayName;
                $scope.email = UserInfo.getCurrentUser().email;
                $scope.close = function() {
                    $uibModalInstance.close();
                    //e.stopPropagation();
                };
                /*$scope.cancel = function(e) {
                 $uibModalInstance.dismiss();
                 e.stopPropagation();
                 };*/
                var allShareList = $firebaseObject(DatabaseRef.getAllShareList());
                allShareList.$bindTo($scope, "allLists");

                $scope.addNewList= function(list){
                    DatabaseQuery.createNewList(list);
                }

                $scope.deleteList = function(listKey){
                    DatabaseQuery.deleteSharedList(listKey);
                }

                $scope.shareThisList = function(listKey, listName) {
                    DatabaseQuery.shareList(listKey, listName);
                }

            }
        }).result.then(postClose, postClose);
    }


});