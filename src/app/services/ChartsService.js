angular.module('koolChartsI').service('chartsService', chartsServiceFn);

function chartsServiceFn($window) {
    this.getLayOutStr = function (options) {
        return '<KoolChart backgroundColor="#FFFFFF"  borderStyle="none">'
            + (options ? this.getOptionsLayOut(options) : '')
            + '<DateFormatter id="dateFmt" formatString="HH:NN:SS"/>'
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
    }
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
        return;
    }
}