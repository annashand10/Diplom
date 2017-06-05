App.factory('EmployeesService',
    ['$http', '$localStorage', '$q', function ($http, $localStorage, $q) {

        return {
            getEmployees,
            addEmployee,
            showEmployee,
            deleteEmployee,
            updateEmployee,
            inviteUser
        };

        function getEmployees(userId) {
            return $http.get('/api/v1/employees', userId)
        }

        //Create a new Board
        function addEmployee(data){
            return $http.post('/api/v1/employees/create/', data)
        };

        //Show a board's content
        function showEmployee(id){
            return $http.get('/api/v1/employee/' + id);
        };

        //Delete a todo item
        function deleteEmployee(id){
            return $http.post('/api/v1/employees/delete/' + id)
        };

        //Update existing list
        function updateEmployee(id, data){
            return $http.post('/api/v1/employees/edit/' + id, data)
        };

        //Invite a user to board
        function inviteUser(id){
            return $http.post('/api/v1/employees/:employee_id/invite/' + id + '/invite')
        }

}])