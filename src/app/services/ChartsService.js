angular.module('koolChartsI').service('chartsService', chartsServiceFn);

function chartsServiceFn($window) {
    this.getSimpleRealTimeLayOutStr = function (options, dateFormat) {
        return '<KoolChart backgroundColor="#FFFFFF" borderStyle="none">'
            + (options ? this.getOptionsLayOut(options) : '')
            + (dateFormat ? '<DateFormatter id="dateFmt" formatString="' + dateFormat + '"/>' : '')
            + '<NumberFormatter id="numFmt"/>'
            + '<RealTimeChart id="chart" dataDisplayType="time" timePeriod="300" interval="3" showDataTips="true">'
            + '<horizontalAxis>'
            + '<DateTimeAxis dataUnits="seconds" labelUnits="seconds" dataInterval="5" interval="9" formatter="{dateFmt}" displayLocalTime="true" padding="2"/>'
            + '</horizontalAxis>'
            + '<verticalAxis>'
            + '<LinearAxis id="vAxis" minimum="0" maximum="160" formatter="{numFmt}"/>'
            + '</verticalAxis>'
            + '<series>'
            + '<Line2DSeries xField="Time" yField="Data" displayName="Process 1" htmlJsFunction="userFunction" itemRenderer="CircleItemRenderer">'
            + '<lineStroke>'
            + '<Stroke color="#999999" weight="2"/>'
            + '</lineStroke>'
            + '</Line2DSeries>'
            + '</series>'
            + '<backgroundElements>'
            + '<AxisMarker>'
            + '<lines>'
            + '<AxisLine fontWeight="bold" color="#f49732" label="High Blood Pressure" labelAlign="left" value="140" labelYOffset="-10">'
            + '<stroke>'
            + '<Stroke color="#cccccc"/>'
            + '</stroke>'
            + '</AxisLine>'
            + '<AxisLine fontWeight="bold" color="#5587a2" label="Low Blood Pressure" labelAlign="left" labelUpDown="down" labelYOffset="10" value="60">'
            + '<stroke>'
            + '<Stroke color="#cccccc"/>'
            + '</stroke>'
            + '</AxisLine>'
            + '</lines>'
            + '<ranges>'
            + '<AxisRange startValue="60" endValue="140">'
            + '<fill>'
            + '<SolidColor color="#eeeeee" alpha="0.4"/>'
            + '</fill>'
            + '</AxisRange>'
            + '</ranges>'
            + '</AxisMarker>'
            + '</backgroundElements>'
            + '</RealTimeChart>'
            + '<HttpServiceRepeater url="https://www.koolchart.com/realtimeSample/process2Data.php" target="{chart}" interval="2" method="get"/>'
            + '</KoolChart>';
    };
    this.getComplexRealTimeLayOutStr = function () {
        return '<KoolChart backgroundColor="#FFFFFF" borderStyle="none"> <Options> <Caption text="RealTime Chart"/> <SubCaption text="Displays the recent 15 items every 3 seconds (random data)." fontSize="11" fontFamily="Malgun Gothic"/> <Legend useVisibleCheck="true"/> </Options> <DateFormatter id="dateFmt" formatString="HH:NN:SS"/> <RealTimeChart id="chart" dataDisplayType="dataSize" displayDataSize="15" showDataTips="true"> <horizontalAxis> <CategoryAxis id="hAxis" categoryField="Time" formatter="{dateFmt}"/> </horizontalAxis> <verticalAxis> <LinearAxis id="vAxis" minimum="0" maximum="100" interval="10"/> </verticalAxis> <series> <Area2DSeries labelPosition="up" yField="P1" displayName="Process 1" itemRenderer="CircleItemRenderer"/> <Area2DSeries labelPosition="up" yField="P2" displayName="Process 2" itemRenderer="CircleItemRenderer"/> <Area2DSeries labelPosition="up" yField="P3" displayName="Process 3" itemRenderer="CircleItemRenderer"/> </series> <annotationElements> <AxisMarker> <lines> <AxisLine value="70" label="threshold (70)" fontFamily="Malgun Gothic"> <stroke> <Stroke color="#ff0000" weight="1"/> </stroke> </AxisLine> </lines> </AxisMarker> </annotationElements> </RealTimeChart> <HttpServiceRepeater url="https://www.koolchart.com/realtimeSample/process3Data.php" target="{chart}" interval="3" method="get"/></KoolChart>';
    };
    this.getAreaLayOutStr = function () {
        return '<KoolChart backgroundColor="#FFFFFF"  borderStyle="none">'
            + '<Options>'
            + '<Caption text="Global Sales"/>'
            + '<SubCaption text="( billion $ )" textAlign="right" />'
            + '<Legend defaultMouseOverAction="false"/>'
            + '</Options>'
            + '<Area2DChart showDataTips="true" dataTipDisplayMode="axis">'
            + '<horizontalAxis>'
            + '<CategoryAxis categoryField="Month" padding="0.5"/>'
            + '</horizontalAxis>'
            + '<verticalAxis>'
            + '<LinearAxis />'
            + '</verticalAxis>'
            + '<series>'
            + '<Area2DSeries yField="goods" form="curve" displayName="goods">'
            + '<showDataEffect>'
            + '<SeriesInterpolate/>'
            + '</showDataEffect>'
            + '</Area2DSeries>'
            + '<Area2DSeries yField="income" form="curve" displayName="income">'
            + '<showDataEffect>'
            + '<SeriesInterpolate/>'
            + '</showDataEffect>'
            + '</Area2DSeries>'
            + '<Area2DSeries yField="service" form="curve" displayName="service">'
            + '<showDataEffect>'
            + '<SeriesInterpolate/>'
            + '</showDataEffect>'
            + '</Area2DSeries>'
            + '<Area2DSeries yField="test" form="curve" displayName="test">'
            + '<showDataEffect>'
            + '<SeriesInterpolate/>'
            + '</showDataEffect>'
            + '</Area2DSeries>'
            + '</series>'
            + '</Area2DChart>'
            + '</KoolChart>';
    }
    this.getOptionsLayOut = function (data) {
        if (data.captions) {
            var captions = data.captions.map(function (caption) {
                var textsToMerge = [];
                if (caption.text) {
                    textsToMerge.push('text="' + caption.text + '"');
                }
                if (caption.styles) {
                    for (var style in caption.styles) {
                        textsToMerge.push(style + '="' + caption.styles[style] + '"');
                    }
                }
                return '<Caption ' + textsToMerge.join(' ') + '/>';
            });
        }

        if (data.subCaptions) {
            var subCaptions = data.subCaptions.map(function (subCaption) {
                var textsToMerge = [];
                if (subCaption.text) {
                    textsToMerge.push('text="' + subCaption.text + '"');
                }
                if (subCaption.styles) {
                    for (var style in subCaption.styles) {
                        textsToMerge.push(style + '="' + subCaption.styles[style] + '"');
                    }
                }
                return '<SubCaption ' + textsToMerge.join(' ') + '/>';
            });
        }
        return '<Options>' + (captions ? captions.join('') : '') + (subCaptions ? subCaptions.join('') : '') + '</Options>';
    };
    this.areaChartData =
        [{ "Month": "Mar", "service": 3, "goods": 25, "income": 20, "test": 5 },
            { "Month": "Apr", "service": 15, "goods": 42, "income": 20, "test": 20 },
            { "Month": "May", "service": 5, "goods": 55, "income": 25, "test": 60 },
            { "Month": "Jun", "service": 15, "goods": 42, "income": 42, "test": 7 },
            { "Month": "Jul", "service": 5, "goods": 32, "income": 45, "test": 42 },
            { "Month": "Aug", "service": 15, "goods": 40, "income": 58, "test": 25 },
            { "Month": "Sep", "service": 5, "goods": 27, "income": 37, "test": 19 },
            { "Month": "Oct", "service": 17, "goods": 17, "income": 25, "test": 54 },
            { "Month": "Nov", "service": 35, "goods": 13, "income": 20, "test": 35 }];
    $window.userFunction = function (id, index, data, values) {
        var className = "high",
            value = values[1];

        if (value < 60 || value > 140) {
            if (value < 60)
                className = "low";

            return {
                content: "",
                className: "odd_pressure " + className + "_blood_pressure",
                events: {
                    "click": (function (a) {
                        return function (event) {
                            event.target.parentNode.removeChild(event.target);
                            alert("Time: " + a.Time + "Blood Pressure: " + a.Data);
                        };
                    })(data)
                }
            };
        }
    };
}
