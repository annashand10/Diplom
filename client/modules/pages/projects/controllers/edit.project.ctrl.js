App.controller('EditProjectController', ['$scope', '$rootScope', '$state',
    function ($scope, $rootScope, $state) {

        $rootScope.isAuthorized = true;

        $scope.project = '';

        $scope.goToProjects = goToProjects;
        $scope.editProject = editProject;
        $scope.getProject = getProject;

        function getProject() {
            let id = $state.params.id
            ProjectsService.getProject(id)
                .then((res) => {
                    $scope.project = res.data
                })
                .catch(err)

        }

        function editProject() {

        }

        function goToProjects() {
            $state.go('projects')
        }
    }]);