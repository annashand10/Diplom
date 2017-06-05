App.controller('NewProjectController', ['$scope', '$rootScope', '$state','ProjectsService',
    function ($scope, $rootScope, $state, ProjectsService) {

        $rootScope.isAuthorized = true;
        $scope.project = ''

        $scope.goToProjects = goToProjects;
        $scope.saveProject = saveProject;
        $scope.getProject = getProject;

        function getProject() {
            let id = $state.params.id
            ProjectsService.getProject(id)
                .then((res)=>{
                   $scope.project = res.data
                })
                .catch(err)

        }

        function saveProject() {

        }

        function goToProjects() {
            $state.go('projects')
        }
    }]);