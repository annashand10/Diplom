// create the module and name it scotchApp
var App = angular.module('App', ['ui.router',
    'ui.bootstrap','as.sortable', 'oc.lazyLoad','datatables','datatables.bootstrap','angular-flot']);

App.config(function ($stateProvider, $urlRouterProvider, $locationProvider, $ocLazyLoadProvider) {

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
            controller: 'ForgotPasswordController',
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
        .state('charts', {
            url: '/charts',
            controller: 'ChartsController',
            templateUrl: './modules/pages/charts/templates/charts.html'
        })
        .state('departments', {
            url: '/departments',
            controller: 'DepController',
            templateUrl: './modules/pages/departments/templates/departments.html',
            data: { pageTitle: 'Data Tables' },
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
        .state('activity_stream', {
            url: '/activity_stream',
            controller: 'ActivityStreamController',
            templateUrl: './modules/pages/activity_stream/templates/activity-stream.template.html'
        });


    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

});
