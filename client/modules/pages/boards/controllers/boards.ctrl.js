App.controller('BoardsController', ['$scope', '$rootScope', 'BoardService',
    function ($scope, $rootScope, BoardService) {

        $rootScope.isAuthorized = true;
        $scope.sortableOptions = {
            connectWith: ".connectPanels",
            handler: ".ibox-title"
        };

        $scope.backLogStatus = 'backlog';
        $scope.doingStatus = 'doing';
        $scope.reviewStatus = 'needreview';
        $scope.doneStatus = 'done';

        $scope.getBoards = getBoards;
        $scope.addTask = addTask;
        $scope.deleteBoard = deleteBoard;


        function getBoards() {
            BoardService.getBoards()
                .then((res) => {
                    $scope.boards = res.data
                })
                .catch((error) => console.log(error))
        }

        function deleteBoard(board) {
            BoardService.deleteBoard(board)
                .then((res) => {
                    console.log(res)
                })
                .catch((error) => console.log(error))
        }


        function addTask(task) {

            BoardService.addTask(task)
                .then((res) => {
                    console.log(res)
                })
                .catch((error) => console.log(error));

            $scope.todoList.push({
                content: '',
                date: '',
                statusClass: '',
                tagName: ''
            })
            // $scope.boards.push( {
            //     id : "id-002",
            //     description : "NEWW"
            // })
        }

        $scope.anotherBoards = [
            {
                id: "id-000",
                description: "item 000",
                status: 'backlog'
            },
            {
                id: "id-001",
                description: "item 001",
                status: 'doing'
            },
            {
                id: "id-002",
                description: "item 002",
                status: 'needreview'
            },
            {
                id: "id-002",
                description: "item 002",
                status: 'done'
            },
            {
                id: "id-000",
                description: "item 000",
                status: 'backlog'
            },
            {
                id: "id-001",
                description: "item 001",
                status: 'doing'
            },
            {
                id: "id-002",
                description: "item 002",
                status: 'needreview'
            },
            {
                id: "id-002",
                description: "item 002",
                status: 'done'
            },
            {
                id: "id-000",
                description: "item 000",
                status: 'backlog'
            },
            {
                id: "id-001",
                description: "item 001",
                status: 'doing'
            },
            {
                id: "id-002",
                description: "item 002",
                status: 'needreview'
            },
            {
                id: "id-002",
                description: "item 002",
                status: 'done'
            }

        ];


        $scope.todoList = [
            {
                content: 'Simply dummy text of the printing and typesetting industry.',
                date: '12.10.2015',
                statusClass: 'warning',
                tagName: 'Mark'
            },
            {
                content: 'Many desktop publishing packages and web page editors now use Lorem Ipsum as their default.',
                date: '05.04.2015',
                statusClass: 'success',
                tagName: 'Tag'
            },
            {
                content: 'Sometimes by accident, sometimes on purpose (injected humour and the like).',
                date: '16.11.2015',
                statusClass: 'info',
                tagName: 'Mark'
            },
            {
                content: 'All the Lorem Ipsum generators',
                date: '06.10.2015',
                statusClass: 'danger',
                tagName: 'Tag'
            },
            {
                content: 'Which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.',
                date: '09.12.2015',
                statusClass: 'warning',
                tagName: 'Mark'
            }
        ];
        $scope.inProgressList = [
            {
                content: 'Quisque venenatis ante in porta suscipit.',
                date: '12.10.2015',
                statusClass: 'success',
                tagName: 'Mark'
            },
            {
                content: ' Phasellus sit amet tortor sed enim mollis accumsan in consequat orci.',
                date: '05.04.2015',
                statusClass: 'success',
                tagName: 'Tag'
            },
            {
                content: 'Nunc sed arcu at ligula faucibus tempus ac id felis. Vestibulum et nulla quis turpis sagittis fringilla.',
                date: '16.11.2015',
                statusClass: 'warning',
                tagName: 'Mark'
            },
            {
                content: 'Ut porttitor augue non sapien mollis accumsan. Nulla non elit eget lacus elementum viverra.',
                date: '09.12.2015',
                statusClass: 'warning',
                tagName: 'Tag'
            }
        ];
        $scope.completedList = [
            {
                content: 'Sometimes by accident, sometimes on purpose (injected humour and the like).',
                date: '16.11.2015',
                statusClass: 'info',
                tagName: 'Mark'
            },
            {
                content: 'Ut porttitor augue non sapien mollis accumsan. Nulla non elit eget lacus elementum viverra.',
                date: '09.12.2015',
                statusClass: 'warning',
                tagName: 'Tag'
            },
            {
                content: 'Which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.',
                date: '09.12.2015',
                statusClass: 'warning',
                tagName: 'Tag'
            },
            {
                content: 'Packages and web page editors now use Lorem Ipsum as',
                date: '08.04.2015',
                statusClass: 'warning',
                tagName: 'Tag'
            },
            {
                content: 'Many desktop publishing packages and web page editors now use Lorem Ipsum as their default.',
                date: '05.04.2015',
                statusClass: 'success',
                tagName: 'Mark'
            }
        ];

    }]);