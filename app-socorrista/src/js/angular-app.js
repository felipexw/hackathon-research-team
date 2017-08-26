const myApp = angular.module('app-socorrista', []);

myApp.controller('AppCtrl', ['$scope', '$http', ($scope, $http) => {
    let vm = this;
    vm.showInfo = false;
    vm.alerts = 0;

    vm.socorrer = function() {
        vm.alerts = 0;
    }


    function getAlerts() {
        return $http.get('http://localhost:8080/api/sos')
    }

    setTimeout(function () {
        setInterval(function () {
            getAlerts()
                .then(function (response) {
                    vm.somebodyNeedHelp = response.data.hasAlert
                    if (vm.somebodyNeedHelp) {
                        vm.alerts += 1;
                    }
                    
                })
        }, 3000)
    }, 3000)


    return vm
}])
