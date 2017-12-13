(function () {
    'use strict';

    angular
        .module('koolChartsI')
        .config(routerConfig);

    /** @ngInject */
    function routerConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'app/main/main.html',
                controller: 'MainController',
                controllerAs: 'main'
            })
            .state('realTime', {
                url: '/real-time',
                templateUrl: 'app/realTime/realTime.html',
                controller: 'RealTimeController',
                controllerAs: 'vmRealTime'
            })
            .state('area', {
                url: '/area',
                templateUrl: 'app/area/area.html',
                controller: 'AreaController',
                controllerAs: 'vmArea'
            });

        $urlRouterProvider.otherwise('/');
    }

})();
