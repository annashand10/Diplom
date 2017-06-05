App.factory('ProfileFactory',
    ['$http', '$localStorage', '$q', function ($http, $localStorage, $q) {

        let serverConfig = "http://localhost:8000/api/v1";

        return {
            getProfile,
            editProfile
        };

        function editProfile(id) {
            return $http.put(`${serverConfig}` + '/profile' + `${id}`, data)
        }

        function getProfile(data){
            return $http.get(`${serverConfig}` + '/profile', data)
        }
    }
    ]);