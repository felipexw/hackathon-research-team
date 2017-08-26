const myApp = angular.module('app-socorrista', []);

myApp.controller('AppCtrl', ['$scope', '$http', ($scope, $http) => {
    let vm = this
    vm.showInfo = false


    function getAlerts() {
        return $http.get('http://localhost:8080/api/sos')
    }

    setTimeout(function () {
        setInterval(function () {
            getAlerts()
                .then(function (response) {
                    vm.somebodyNeedHelp = response.data.hasAlert
                    vm.showInfo = !vm.somebodyNeedHelp
                })
        }, 3000)
    }, 3000)


    return vm
}])
