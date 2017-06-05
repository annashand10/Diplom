App.controller('EmployeesController', ['$scope', '$rootScope', 'DTOptionsBuilder', '$state', 'EmployeesService',
    '$localStorage',
    function ($scope, $rootScope, DTOptionsBuilder, $state, EmployeesService, $localStorage) {

        $rootScope.isAuthorized = true;
        $scope.employees = []
        let userId = $localStorage.userId;


        $scope.goToEditEmployee = goToEditEmployee;
        $scope.goToNewEmployee = goToNewEmployee;

        $scope.getAllEmployees = getAllEmployees;
        $scope.sendInvitation = sendInvitation;


        function activate(){
            getAllEmployees();
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
        }

        function getAllEmployees() {
            EmployeesService.getEmployees(userId)
                .then((res) => {
                    $scope.employees = res.data
                })
                .catch((error) => console.log(error))
        }

        function goToNewEmployee() {
            $state.go('new_employee')

        }

        function goToEditEmployee(employee) {
            $state.go('edit_employee', { employeeId: employee._id })
        }

        function sendInvitation() {
            EmployeesService.inviteUser(data)
                .then((res)=>console.log(res))
                .catch((error)=> console.log(error))
        }





        activate();


    }]);