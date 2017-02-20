// create the module and name it scotchApp
var App = angular.module('App', ['ui.router']);

App.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise('/login');

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
            templateUrl: './modules/pages/auth/templates/login.html'
        })
        .state('forgot_password', {
            url: '/forgot_password',
            controller: 'ForgotPasswordController',
            templateUrl: './modules/pages/auth/templates/forgot_password.html'
        })
        .state('about', {
            url: '/about',
            templateUrl: './modules/pages/about/templates/about_page.html'
        });


    $locationProvider.html5Mode(true);

});
