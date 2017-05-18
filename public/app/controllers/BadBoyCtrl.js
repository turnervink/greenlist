/**
 * Created by Luyen on 5/16/2017.
 */
greenlistApp.controller("BadBoyCtrl", ["$scope", "UserInfo", function($scope, UserInfo) {
    $scope.playAudio = function() {
        var audio = new Audio('images/monty.wav')
        audio.play();
        console.log("play stuff");
    };
}]);