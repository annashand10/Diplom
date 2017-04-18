App.controller('ProfileController', ['$scope', function($scope) {

    $scope.greeting = 'Azaza mishio!';


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