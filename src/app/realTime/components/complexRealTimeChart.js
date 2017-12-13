(function () {
    'use strict';
    angular.module('koolChartsI').directive('complexRealTimeChart', complexRealTimeChartFn);

    function complexRealTimeChartFn() {
        return {
            restrict: 'EA',
            scope: {
                options: '='
            },
            bindToController: true,
            controller: ControllerFn,
            link: LinkFn,
            controllerAs: 'vmComplexRealTimeChart',
            templateUrl: 'app/realTime/components/complexRealTimeChart.html'
        }
    }

    ControllerFn.$inject = ['chartsService', '$window', '$document'];

    function ControllerFn(chartsService, $window, $document) {
        var vm = this;
        vm.config = {
            rootId: 'realTimeComplexContainer',
            containerId: 'realTimeComplex',
            stringToEval: 'KoolOnLoadCallFunction=window.realTimeComplexReadyHandler',
            width: '100%',
            height: '100%'
        };
        vm.dateFormat = 'HH:NN:SS';
        vm.complexRealTimeLayOutStr = chartsService.getComplexRealTimeLayOutStr(vm.options, vm.dateFormat);

        $window.realTimeComplexReadyHandler = function (id) {
            $document[0].getElementById(id).setLayout(vm.complexRealTimeLayOutStr);
        };
        $window.KoolChartStart(vm.config);
    }

    function LinkFn(scope, element) {
        scope.view = element;
    }
})();
