App.factory('modalFactory', function($uibModal) {
    return {
        open: function(size, template, params) {
            return $uibModal.open({
                animation: true,
                templateUrl: template || '../../shared/modals/creation-loader.html',
                controller: 'ModalResultInstanceCtrl',
                size: size,
                resolve: {
                    params: function() {
                        return params;
                    }
                }
            });
        }
    };
})