/**
 * Brings out side nav by injecting new view with modal.
 */
greenlistApp.controller('PanelCtrl', function($scope, $aside, UserInfo, DatabaseRef, $firebaseObject, $uibModal) {
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

                    if (list === undefined){

                    }
                    else{var newListKey = firebase.database().ref().child('sharedList').push().key;

                        var listEntry = {
                            name: list,
                            listKey: newListKey,
                        }


                        var updates = {};
                        updates['/sharedLists/' + '/' + newListKey + '/'] = listEntry;
                        updates[UserInfo.getCurrentUser().uid + "/sharedLists/" + '/' + newListKey + '/'] = listEntry;

                        firebase.database().ref().update(updates);}


                }

                $scope.deleteList = function(listID){

                    var delList ={
                        name: null,
                        listKey: null,

                    }

                    var removes = {};
                    removes['/sharedLists/' + '/' + listID + '/'] = delList;
                    removes[UserInfo.getCurrentUser().uid + "/sharedLists/" + '/' + listID + '/'] = delList;
                    firebase.database().ref().update(removes);

                }

                $scope.shareThisList = function(listKey){
                    $uibModal.open({
                        templateUrl: 'views/partials/shareList.html',
                        controller: function($scope, $uibModalInstance, UserInfo){
                            $scope.addUserEmail = function(email){

                                var shareUID = firebase.database().ref('/emails').child(email);
                                shareUID.once("value", function(snapshot) {
                                    var addList={
                                        name: UserInfo.getCurrentUser().displayName + "'s list",
                                        listKey: listKey,
                                    }
                                    var addShareList ={};
                                    addShareList[snapshot.val() + "/sharedLists/"] = addList;
                                    firebase.database().ref().update(addShareList);
                                });



                               // firebae.databse().ref().update

                            }
                        }
                        }


                    )
                }

            }
        }).result.then(postClose, postClose);
    }


});