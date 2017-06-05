App.controller('ProfileController', ['$scope', '$rootScope', '$state', 'ProfileFactory',
    function ($scope, $rootScope, $state, ProfileFactory) {


        $rootScope.isAuthorized = true;

        $scope.profile = [];

        $scope.goToEditProfile = goToEditProfile;
        $scope.getProfileInfo = getProfileInfo;


        function getProfileInfo() {
            ProfileFactory.getProfile()
                .then((res)=>{
                    $scope.profile = res.data
                })
                .catch((error)=>console.log(error))
        }

        function goToEditProfile() {
            $state.go('profile_edit')
        }


    }]);