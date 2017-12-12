(function () {
    'use strict';
    angular.module('koolChartsI').directive('areaChart', areaChartFn);
    function areaChartFn() {
        return {
            restrict: 'EA',
            scope: {
                options: '='
            },
            bindToController: true,
            controller: ControllerFn,
            link: LinkFn,
            controllerAs: 'vmAreaChart',
            templateUrl: 'app/area/components/areaChart.html'
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

        vm.layoutStr = chartsService.getAreaLayOutStr(vm.options);
        vm.chartData = chartsService.areaChartData;

        $window.chartReadyHandler = function (id) {
            $document[0].getElementById(id).setLayout(vm.layoutStr);
            $document[0].getElementById(id).setData(vm.chartData);
        }
        $window.KoolChartStart(vm.config);
    }
    function LinkFn (scope, element) {
        scope.view = element;
    }
})();
