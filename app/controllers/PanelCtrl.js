greenlistApp.controller("PanelCtrl", ["$scope", "$rootScope", "UserInfo", function($scope, $rootScope, UserInfo) {

	$scope.heading = 'Shopping List';

//slide menu code
	$scope.showmenu = false;
	$scope.toggleMenu = function(){
		$scope.showmenu=($scope.showmenu) ? false : true;
	}

	$scope.DisplayPicture = UserInfo.getCurrentUser().photoUrl;

}]);