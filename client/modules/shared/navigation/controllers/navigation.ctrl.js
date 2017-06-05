App.controller('NavigationController', ['$scope','$state', function($scope, $state) {
    $scope.greeting = 'Hola!';

    $scope.isAuthorized = false;
    $scope.logOut = logOut;

    function logOut() {
        AuthFactory.logout()
            .then((res)=>{$state.go('login')})
            .catch((error)=>{alert("Failed to logout!");})
    }

}]);