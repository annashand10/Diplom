App.controller('NavigationController', ['$scope','$state', function($scope, $state) {
    $scope.greeting = 'Hola!';

    $scope.isAuthorized = false;
    $scope.logOut = logOut;

    function logOut() {
        $state.go('login')
    }

}]);