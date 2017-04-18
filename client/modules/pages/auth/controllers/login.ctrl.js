App.controller('LoginController', ['$scope','$state','$rootScope', function($scope, $state,$rootScope) {
    $scope.greeting = 'Hola!';

    $rootScope.isAuthorized = false;

    $scope.logIn = logIn;

    function logIn() {

        $state.go('home')
    }

}]);