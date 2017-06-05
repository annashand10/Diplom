App.controller('ProjectDetailsController', ['$scope','$rootScope', '$state',
    function($scope, $rootScope, $state) {

        $rootScope.isAuthorized = true;

        $scope.greeting = 'Azaza mishio!';
        console.log($scope.greeting);

        $scope.goToProjects = goToProjects;

        function goToProjects() {
            $state.go('projects')
        }
    }]);