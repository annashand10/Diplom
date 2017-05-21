App.controller('BoardsController', ['$scope','$rootScope', function($scope, $rootScope) {

    $scope.greeting = 'Azaza mishio!';
    console.log($scope.greeting);
    $rootScope.isAuthorized = true;

    $scope.boards = [
        {
            id : "id-000",
            description : "item 000",
            status:'backlog'
        },
        {
            id : "id-001",
            description : "item 001",
            status: 'doing'
        },
        {
            id : "id-002",
            description : "item 002",
            status: 'needreview'
        },
        {
            id : "id-002",
            description : "item 002",
            status:'done'
        }

    ];

    $scope.anotherBoards = [
        {
            id : "id-000",
            description : "item 000",
            status:'backlog'
        },
        {
            id : "id-001",
            description : "item 001",
            status: 'doing'
        },
        {
            id : "id-002",
            description : "item 002",
            status: 'needreview'
        },
        {
            id : "id-002",
            description : "item 002",
            status:'done'
        },
        {
            id : "id-000",
            description : "item 000",
            status:'backlog'
        },
        {
            id : "id-001",
            description : "item 001",
            status: 'doing'
        },
        {
            id : "id-002",
            description : "item 002",
            status: 'needreview'
        },
        {
            id : "id-002",
            description : "item 002",
            status:'done'
        },
        {
            id : "id-000",
            description : "item 000",
            status:'backlog'
        },
        {
            id : "id-001",
            description : "item 001",
            status: 'doing'
        },
        {
            id : "id-002",
            description : "item 002",
            status: 'needreview'
        },
        {
            id : "id-002",
            description : "item 002",
            status:'done'
        }


    ];


    $scope.removeBoard = removeBoard;

    $scope.addTask = addTask;


    function addTask() {
        $scope.boards.push( {
            id : "id-002",
            description : "NEWW"
        })
    }
    function removeBoard(index) {
        $scope.boards.splice(index, 1)
    }
    $scope.sortableOptions = {
        connectWith: ".connectPanels",
        handler: ".ibox-title"
    };
}]);