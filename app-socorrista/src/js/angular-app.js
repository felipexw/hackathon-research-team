const myApp = angular.module('app-socorrista', []);

myApp.controller('AppCtrl', ['$scope', '$http', ($scope, $http) => {
    let vm = this



    function getAlerts() {
        return $http.get('http://localhost:8080/api/sos')
    }

    setTimeout(function () {
        setInterval(function () {
            getAlerts()
                .then(function (response) {
                    vm.somebodyNeedHelp = response.data.hasAlert
                })
        }, 3000)
    }, 3000)


    return vm
}])

/**
 * vm.test = 'w21'

    registerwebSocketSocorrista()

    function registerwebSocketSocorrista() {
        vm.webSocketSocorrista = new WebSocket("ws://localhost:3443", "echo-protocol");
        vm.webSocketPaciente = new WebSocket("ws://localhost:3443", "echo-protocol");

        vm.webSocketSocorrista.onopen = function () {
            console.log('conexao aberta')
        };

        vm.webSocketPaciente.onopen = function () {
            console.log('conexao aberta')
        };

        vm.webSocketPaciente.onmessage = function (evt) {
            console.log('conexao onmessage')
            vm.somebodyNeedHelp = true
        };

        vm.webSocketSocorrista.onerror = function (evt) {
            console.log('onerror')
        };

        vm.webSocketPaciente.onerror = function (evt) {
            console.log('onerror')
        };
    }
    const firstTime = true

    function sendMessage() {
        // if (firstTime) {
        //     vm.webSocketPaciente.send({
        //         from: 'paciente',
        //         content: 'asdfasdfasdf'
        //     })
        //     firstTime= false
        // }
        console.log('websocket sedMessage')
        vm.webSocketPaciente.send({
            from: 'paciente',
            content: 'Test'
        })
    }
 */