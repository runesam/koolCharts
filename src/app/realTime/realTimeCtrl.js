(function () {
  angular.module('koolChartsI').controller('RealTimeController', RealTimeController);
  RealTimeController.$inject = []
  function RealTimeController() {
    var vm = this;
    vm.options = {
      captions: [
        {
          text: 'To see this example in action, your browser must support: CSS3 animation',
          styles: {
            color: 'red',
            fontSize: '14',
            fontFamily: 'Malgun Gothic'
          }
        },
        {
          text: 'Monitor Blood Pressure'
        }
      ],
      subCaptions: [
        {
          text: 'unit: mmHg'
        }
      ]
    }
  }
})();
