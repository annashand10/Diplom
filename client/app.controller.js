App.controller('AppController', ['$scope','$rootScope', function($scope, $rootScope) {
    $scope.greeting = 'Hola!';

    $scope.toogledChat = false;

    $rootScope.isAuthorized = false;

    // $scope.toogleChat = function (ev, data) {
    //     console.log('toggle chat')
    //     // setTimeout(() => {
    //     //     if (data) $scope.toogledChat = true;
    //     //     else $scope.toogledChat = !$scope.toogledChat;
    //     // }, 0)
    // };

    //
    // $scope.isAuthorized = (localStorage.getItem('token') !== null);
    // $scope.user = JSON.parse(localStorage.getItem('manager'));
    // $scope.userName = ($scope.user) ? $scope.user.firstName : '';
}]);