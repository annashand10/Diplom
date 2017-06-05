var App = angular.module('App', ['ui.router',
    'ui.bootstrap',
    'as.sortable',
    'oc.lazyLoad',
    'datatables',
    'datatables.bootstrap',
    'angular-flot',
    'ngStorage',
    'ui.sortable',
    'directive.g+signin',
    'angularMoment'
]);


App.config(function ($stateProvider, $httpProvider, $urlRouterProvider, $locationProvider, $ocLazyLoadProvider) {

    $urlRouterProvider.otherwise('/login');

    $ocLazyLoadProvider.config({
        // Set to true if you want to see what and when is dynamically loaded
        debug: false
    });

    $stateProvider
    // HOME STATES AND NESTED VIEWS ========================================

        .state('home', {
            url: '/home',
            controller: 'HomeController',
            templateUrl: './modules/pages/home/templates/home.html'
        })

        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('login', {
            url: '/login',
            controller: 'LoginController',
            templateUrl: './modules/pages/auth/templates/login.html'
        })

        .state('signup', {
            url: '/signup',
            controller: 'SignupController',
            templateUrl: './modules/pages/auth/templates/signup.html'
        })
        .state('forgot_password', {
            url: '/forgot_password',
            controller: 'AppController',
            templateUrl: './modules/pages/auth/templates/forgot_password.html'
        })
        .state('about', {
            url: '/about',
            templateUrl: './modules/pages/about/templates/about_page.html'
        })
        .state('profile_page', {
            url: '/profile_page',
            controller: 'ProfileController',
            templateUrl: './modules/pages/profile/templates/profile_page.html'
        })
        .state('profile_edit', {
            url: '/profile_edit/{profileId}',
            controller: 'ProfileEditController',
            templateUrl: './modules/pages/profile/templates/profile.edit.html'
        })
        .state('charts', {
            url: '/charts',
            controller: 'ChartsController',
            templateUrl: './modules/pages/charts/templates/charts.html'
        })
        .state('employees', {
            url: '/employees',
            controller: 'EmployeesController',
            templateUrl: 'modules/pages/employees/templates/employees.html',
            data: {pageTitle: 'Employees'},
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            serie: true,
                            files: ['plugins/dataTables/datatables.min.js', 'stylesheets/css/plugins/dataTables/datatables.min.css']
                        },
                        {
                            serie: true,
                            name: 'datatables',
                            files: ['plugins/dataTables/angular-datatables.min.js']
                        },
                        {
                            serie: true,
                            name: 'datatables.buttons',
                            files: ['plugins/dataTables/angular-datatables.buttons.min.js']
                        }
                    ]);
                }
            }
        })
        .state('new_employee', {
            url: '/new_employee',
            controller: 'NewEmployeeController',
            templateUrl: 'modules/pages/employees/templates/new-employee.html'
        })
        .state('edit_employee', {
            url: '/edit_employee/{employeeId}',
            controller: 'EditEmployeeController',
            templateUrl: 'modules/pages/employees/templates/edit-employee.html'
        })
        .state('boards', {
            url: '/boards',
            controller: 'BoardsController',
            templateUrl: './modules/pages/boards/templates/boards_template.html'
        })
        .state('projects', {
            url: '/projects',
            controller: 'ProjectsController',
            templateUrl: './modules/pages/projects/templates/projects.template.html'
        })
        .state('edit_project', {
            url: '/edit_project',
            controller: 'EditProjectController',
            templateUrl: './modules/pages/projects/templates/edit-project-template.html'
        })
        .state('new_project', {
            url: '/new_project',
            controller: 'NewProjectController',
            templateUrl: './modules/pages/projects/templates/new-project-template.html'
        })
        .state('detail_project', {
            url: '/detail_project',
            controller: 'ProjectDetailsController',
            templateUrl: './modules/pages/projects/templates/project-detail-page.html'
        })
        .state('activity_stream', {
            url: '/activity_stream',
            controller: 'ActivityStreamController',
            templateUrl: './modules/pages/activity_stream/templates/activity-stream.template.html'
        })
        .state('messages', {
            url: '/messages',
            templateUrl: './modules/pages/messages/messages.html'
        });


    $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function ($q, $location, $localStorage) {
        return {
            'request': function (config) {
                config.headers = config.headers || {};
                if ($localStorage.token) {
                    config.headers.Authorization = 'Bearer ' + $localStorage.token;
                }
                return config;
            },
            'responseError': function (response) {
                if (response.status === 401 || response.status === 403) {
                    $location.path('/signin');
                }
                return $q.reject(response);
            }
        };
    }]);


    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

});
