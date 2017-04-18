App.controller('HomeController', ['$scope','$rootScope', function($scope, $rootScope) {
    $scope.greeting = 'Hola!';
    // $scope.isAuthorized = true;
    $rootScope.isAuthorized = true;

}]);