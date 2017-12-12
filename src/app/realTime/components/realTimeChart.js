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
    function ControllerFn (chartsService, $window, $document) {
        var vm = this;
        vm.config = {
            rootId: 'realTime',
            containerId: 'chartHolder',
            stringToEval: 'KoolOnLoadCallFunction=window.chartReadyHandler',
            width: '100%',
            height: '100%'
        }

        vm.layoutStr = chartsService.getLayOutStr(vm.options);

        $window.chartReadyHandler = function (id) {
            $document[0].getElementById(id).setLayout(vm.layoutStr);
        }

        $window.KoolChartStart(vm.config);
    }
    function LinkFn (scope, element) {
        scope.view = element;
    }
})();
