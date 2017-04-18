App.controller('ProfileController', ['$scope','$rootScope', function($scope, $rootScope) {

    $scope.greeting = 'Azaza mishio!';

    $rootScope.isAuthorized = true;

    $scope.mishoy = ['Vtura', 'Sheva', 'Rotsker', 'Resheto']



    $scope.logMishio = logMishio;

    logMishio();


    function logMishio() {

        $scope.string = 'Huinia25'
        console.log($scope.string, 'before')
        $scope.string.slice('2')[1];
        console.log($scope.string, 'after')
    }

}]);