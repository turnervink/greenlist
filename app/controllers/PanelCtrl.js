greenlistApp.controller("PanelCtrl", ["$scope", "$rootScope", function($scope, $rootScope) {

	$scope.heading = 'Shopping List';

//slide menu code
	$scope.showmenu = false;
	$scope.toggleMenu = function(){
		$scope.showmenu=($scope.showmenu) ? false : true;
	}

}]);