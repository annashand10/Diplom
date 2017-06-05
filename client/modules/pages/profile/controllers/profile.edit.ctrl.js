App.controller('ProfileEditController', ['$scope', '$rootScope', '$state', 'ProfileFactory',
    function ($scope, $rootScope, $state,ProfileFactory) {


        $rootScope.isAuthorized = true;

        $scope.goToProfile = goToProfile;
        $scope.getProfile = getProfile;
        $scope.editProfile = editProfile;


        function editProfile() {
            ProfileFactory.editProfile()
                .then((res) => {
                    console.log(res)
                })
                .catch(error)
        }

        function getProfile() {
            let id = $state.params.id;
            ProfileFactory.getProfile(id)
                .then((res) => {
                    $scope.profile = res.data;
                })
                .catch(error)
        }

        function goToProfile() {
            $state.go('profile_page')
        }

    }]);