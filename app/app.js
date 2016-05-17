(function () {
    'use strict';

    angular
        .module('app', ['ui.router'])
        .config(config)
        .run(run);

    function config($stateProvider, $urlRouterProvider) {
        // default route
        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'home/index.html',
                controller: 'Home.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'home' }
            })
        
            .state('ftender', {
                url: '/ftender',
                templateUrl: 'ftender/index.html',
                controller: 'Ftender.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'ftender' }
            })
        
            .state('vtender', {
                url: '/vtender',
                templateUrl: 'vtender/index.html',
                controller: 'Vtender.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'vtender' }
            })
        
            .state('stender', {
                url: '/stender',
                templateUrl: 'stender/index.html',
                controller: 'Stender.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'stender' }
            })
        
            .state('ctender', {
                url: '/ctender',
                templateUrl: 'ctender/index.html',
                controller: 'Ctender.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'ctender' }
            })
        
            .state('account', {
                url: '/account',
                templateUrl: 'account/index.html',
                controller: 'Account.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'account' }
            });
    }

    function run($http, $rootScope, $window) {
        // add JWT token as default auth header
        $http.defaults.headers.common['Authorization'] = 'Bearer ' + $window.jwtToken;

        // update active tab on state change
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            $rootScope.activeTab = toState.data.activeTab;
        });
    }

    // manually bootstrap angular after the JWT token is retrieved from the server
    $(function () {
        // get JWT token from server
        $.get('/app/token', function (token) {
            window.jwtToken = token;

            angular.bootstrap(document, ['app']);
        });
    });
})();