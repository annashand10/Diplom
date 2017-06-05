App.controller('NewEmployeeController', ['$scope', '$rootScope', '$state', 'EmployeesService','$uibModal',
    function ($scope, $rootScope, $state, EmployeesService, $uibModal) {

        $rootScope.isAuthorized = true;

        let modalInstance;

        $scope.employee = {
            first_name:'',
            last_name:'',
            department:'',
            occupation:''
        }
        $scope.goToEmployees = goToEmployees;
        $scope.save = save;


        function save() {
            // $scope.errorSaving = false;
            // $scope.saving = true;
            // $scope.message = "Employee";
            //
            // modalInstance = $uibModal.open({
            //     ariaLabelledBy: 'modal-title',
            //     ariaDescribedBy: 'modal-body',
            //     templateUrl: '../templates/creation-loader.html',
            //     scope: $scope
            // });

            EmployeesService.addEmployee($scope.employee)
                .then((res) => {
                if(res.data){}
                    alert('Success')
                    goToEmployees();

                    // setTimeout(() => modalInstance.close(), 4000);
                    console.log(res)
                })
        }

        function goToEmployees() {
            $state.go('employees')
        }


        $scope.persons = [
            {
                id: '1',
                firstName: 'Anna',
                lastName: 'Shevchenko'
            },
            {
                id: '2',
                firstName: 'Artem',
                lastName: 'Ivanov'
            },
            {
                id: '3',
                firstName: 'Ivan',
                lastName: 'Petrov'
            },
            {
                id: '4',
                firstName: 'Jack',
                lastName: 'Rosowski'
            },
            {
                id: '5',
                firstName: 'Kim',
                lastName: 'Kardasian'
            }
        ];

    }]);