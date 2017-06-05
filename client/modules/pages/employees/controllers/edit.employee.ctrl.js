App.controller('EditEmployeeController', ['$scope', '$rootScope', 'DTOptionsBuilder', '$state', '$uibModal', 'EmployeesService',
    function ($scope, $rootScope, DTOptionsBuilder, $state, $uibModal, EmployeesService) {

        $rootScope.isAuthorized = true;
        let id = $state.params.employeeId;

        $scope.employee = {
            first_name:'',
            last_name:'',
            department:'',
            occupation:''
        }

        let modalInstance;


        $scope.goToEmployees = goToEmployees;
        $scope.save = save;


        function activate(){
            EmployeesService.showEmployee(id)
                .then((res) => {
                    console.log(res.data)
                    $scope.employee = res.data[0];
                })
        }


        function save() {

            EmployeesService.updateEmployee(id, $scope.employee)
                .then((res) => {
                   alert('Success')
                    goToEmployees();
                    // setTimeout(() => modalInstance.close(), 4000);
                    console.log(res)
                })
                .catch(error)
        }

        function goToEmployees() {
            $state.go('employees')
        }

        $scope.dtOptions = DTOptionsBuilder.newOptions()
            .withDOM('<"html5buttons"B>lTfgitp')
            .withButtons([
                {extend: 'copy'},
                {extend: 'csv'},
                {extend: 'excel', title: 'ExampleFile'},
                {extend: 'pdf', title: 'ExampleFile'},

                {
                    extend: 'print',
                    customize: function (win) {
                        $(win.document.body).addClass('white-bg');
                        $(win.document.body).css('font-size', '10px');

                        $(win.document.body).find('table')
                            .addClass('compact')
                            .css('font-size', 'inherit');
                    }
                }
            ]);

        /**
         * persons - Data used in Tables view for Data Tables plugin
         */
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

        activate();


    }]);