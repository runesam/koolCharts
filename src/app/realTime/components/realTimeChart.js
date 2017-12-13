(function () {
    'use strict';
    angular.module('koolChartsI').directive('realTimeChart', realTimeChartFn);

    function realTimeChartFn() {
        return {
            restrict: 'EA',
            scope: {
                options: '='
            },
            bindToController: true,
            controller: ControllerFn,
            link: LinkFn,
            controllerAs: 'vmRealTimeChart',
            templateUrl: 'app/realTime/components/realTimeChart.html'
        }
    }

    ControllerFn.$inject = ['chartsService', '$window', '$document'];

    function ControllerFn(chartsService, $window, $document) {
        var vm = this;
        vm.config = {
            rootId: 'realTimeSimpleContainer',
            containerId: 'realTimeSimple',
            stringToEval: 'KoolOnLoadCallFunction=window.realTimeSimpleReadyHandler',
            width: '100%',
            height: '100%'
        };
        vm.dateFormat = 'HH:NN:SS';
        vm.simpleRealTimeLayOutStr = chartsService.getSimpleRealTimeLayOutStr(vm.options, vm.dateFormat);

        $window.realTimeSimpleReadyHandler = function (id) {
            $document[0].getElementById(id).setLayout(vm.simpleRealTimeLayOutStr);
        };

        $window.KoolChartStart(vm.config);
    }

    function LinkFn(scope, element) {
        scope.view = element;
    }
})();
