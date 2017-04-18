App.controller('SignupController', ['$scope','$state', '$rootScope',function($scope, $state, $rootScope) {


    //var alias = 'app/modules/core/services/modal/';
    var modalInstance;

    $rootScope.isAuthorized = false;

    $scope.greeting = 'Hola!';

    $scope.signUp = signUp;
    function signUp(){
        $state.go('home');
        // $scope.saving = true;
        // modalInstance = openConfirmationModal();
        // setTimeout(function() { $scope.saving = false; modalInstance.close();}, 4000);
    }

    // function openConfirmationModal(scope) {
    //     return $uibModal.open({
    //         // ariaLabelledBy: 'modal-title',
    //         // ariaDescribedBy: 'modal-body',
    //         templateUrl: `client/modules/pages/auth/templates/signup-modal.html`,
    //         scope: scope
    //     });
    // }
}]);