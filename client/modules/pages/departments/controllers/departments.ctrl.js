App.controller('DepController', ['$scope','$rootScope','DTOptionsBuilder', function($scope, $rootScope,DTOptionsBuilder) {

    $scope.greeting = 'Azaza mishio!';
    $rootScope.isAuthorized = true;

    console.log($scope.greeting);

    $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDOM('<"html5buttons"B>lTfgitp')
        .withButtons([
            {extend: 'copy'},
            {extend: 'csv'},
            {extend: 'excel', title: 'ExampleFile'},
            {extend: 'pdf', title: 'ExampleFile'},

            {extend: 'print',
                customize: function (win){
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

}]);