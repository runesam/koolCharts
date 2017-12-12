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
        vm.dateFormat = 'HH:NN:SS'
        vm.layoutStr = chartsService.getRealTimeLayOutStr(vm.options, vm.dateFormat);

        $window.chartReadyHandler = function (id) {
            $document[0].getElementById(id).setLayout('<KoolChart backgroundColor="#FFFFFF" borderStyle="none"> <Options> <Caption text="RealTime Chart"/> <SubCaption text="Displays the recent 15 items every 3 seconds (random data)." fontSize="11" fontFamily="Malgun Gothic"/> <Legend useVisibleCheck="true"/> </Options> <DateFormatter id="dateFmt" formatString="HH:NN:SS"/> <RealTimeChart id="chart" dataDisplayType="dataSize" displayDataSize="15" showDataTips="true"> <horizontalAxis> <CategoryAxis id="hAxis" categoryField="Time" formatter="{dateFmt}"/> </horizontalAxis> <verticalAxis> <LinearAxis id="vAxis" minimum="0" maximum="100" interval="10"/> </verticalAxis> <series> <Area2DSeries labelPosition="up" yField="P1" displayName="Process 1" itemRenderer="CircleItemRenderer"/> <Area2DSeries labelPosition="up" yField="P2" displayName="Process 2" itemRenderer="CircleItemRenderer"/> <Area2DSeries labelPosition="up" yField="P3" displayName="Process 3" itemRenderer="CircleItemRenderer"/> </series> <annotationElements> <AxisMarker> <lines> <AxisLine value="70" label="threshold (70)" fontFamily="Malgun Gothic"> <stroke> <Stroke color="#ff0000" weight="1"/> </stroke> </AxisLine> </lines> </AxisMarker> </annotationElements> </RealTimeChart> <HttpServiceRepeater url="https://www.koolchart.com/realtimeSample/process3Data.php" target="{chart}" interval="3" method="get"/></KoolChart>');
        }

        $window.KoolChartStart(vm.config);
    }
    function LinkFn (scope, element) {
        scope.view = element;
    }
})();
