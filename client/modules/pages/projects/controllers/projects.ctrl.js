App.controller('ProjectsController', ['$scope', '$rootScope', 'ProjectsService',
    function ($scope, $rootScope, ProjectsService) {

        $rootScope.isAuthorized = true;

        $scope.projects = [];

        $scope.getAllProjects = getAllProjects;

        function getAllProjects() {
            ProjectsService.getProjects()
                .then((res) => {
                    $scope.projects = res.data
                })
                .catch((error) => console.log(error))
        }


    }]);