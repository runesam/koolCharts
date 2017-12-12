(function () {
    'use strict';

    angular
        .module('koolChartsI')
        .run(runBlock);

    /** @ngInject */
    function runBlock($log, $window) {
        $window.KoolChartStart = function KoolChartStart(config) {
            $window.KoolChart.create(config.rootId, config.containerId, config.stringToEval, config.width, config.height);
        }
        $log.debug('runBlock end');
    }
})();
