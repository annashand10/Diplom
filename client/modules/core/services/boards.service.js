(function() {
    'use strict';

    angular
        .module('App')
        .factory('BoardService', BoardService);

    BoardService.$inject = ['$log','$http','$q']
    function BoardService($log, $http, $q) {

        return {
            getBoards,
            createBoard,
            showBoard,
            deleteBoard,
            updateBoard
        };

        function getBoards(userId) {
            var deferred = $q.defer();
            $http.get('api/v1/boards?userId=' + userId)
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (data){
                    deferred.reject(data);
                    $log.error('Error: ' ,  data);
                });
            return deferred.promise;
        }

        //Create a new Board
      function createBoard(userId, formData){
            var deferred = $q.defer();
            $http.post('api/v1/boards/create/' + userId, formData)
                .success(function (data){
                    formData = {};
                    deferred.resolve(data);
                })
                .error(function (data){
                    deferred.reject('Error: ' + data);
                    $log.error('Error: ' ,  data);
                });
            return deferred.promise;
        };

        //Show a board's content
       function showBoard(id){
            var deferred = $q.defer();
            $http.get('api/v1/board/' + id)
                .success(function (data){
                    deferred.resolve(data);
                })
                .error(function (data){
                    $log.error('Error: ' +  data);
                });
            return deferred.promise;
        };

        //Delete a todo item
        function deleteBoard(id){
            var deferred = $q.defer();
            $http.post('api/v1/boards/delete/' + id)
                .success(function (data){
                    deferred.resolve(data);
                })
                .error(function (data){
                    deferred.reject('Error: ' + data);
                    $log.error('Error: ' +  data);
                });
            return deferred.promise;
        };

        //Update existing list
        function updateBoard(id, updatedName){
            var deferred = $q.defer();
            $http.post('api/v1/boards/edit/' + id, {name: updatedName})
                .success(function (data){
                    deferred.resolve(data);
                })
                .error(function (data){
                    deferred.reject('Error: ' + data);
                    $log.error('Error: ' +  data);
                });
            return deferred.promise;
        };

        //Invite a user to board
         function inviteUser(id){
            var deferred = $q.defer();
            $http.post('api/v1/board/' + id + '/invite')
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (data){
                    deferred.reject('Error: ' + data);
                    $log.error('Error: ' +  data);
                });
            return deferred.promise;
        }
    }
})();