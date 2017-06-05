(function() {
    'use strict';

    angular
        .module('App')
        .factory('ProjectsService', ProjectsService);

    ProjectsService.$inject = ['$log','$http','$q']
    function ProjectsService($log, $http, $q) {

        return {
            getProjects,
            createProject,
            showProject,
            deleteProject,
            updateProject,
            inviteUser
        };

        function getProjects(userId) {
            return $http.get('api/v1/projects')
        }

        //Create a new Board
        function createProject(userId, formData){

            return $http.post('api/v1/projects/create', formData)
        };

        //Show a board's content
        function showProject(id){
            return  $http.get('api/v1/project/' + id)
        };

        //Delete a todo item
        function deleteProject(id){
            return $http.post('api/v1/projects/delete/' + id)
        };

        //Update existing list
        function updateProject(id, updatedName){
            return $http.post('api/v1/projects/edit/' + id, {name: updatedName})
        };

        //Invite a user to board
        function inviteUser(id){
            return $http.post('api/v1/project/' + id + '/invite')
        }
    }
})();