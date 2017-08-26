const myApp = angular.module('app-socorrista', []);


function sendMessage(message) {
    document.getElementById("output").innerHTML += "<p>> SENT: " + message + "</p>";

    websocket.send(message);
}

myApp.controller('AppCtrl', ['$scope', ($scope) => {
    let vm = this

    vm.test = 'w21'

    function registerWebsocket() {
        websocket = new WebSocket("ws://localhost:3443", "echo-protocol");

        websocket.onopen = function () {
            console.log('conexao aberta')
        };

        websocket.onmessage = function (evt) {
            console.log('conexao onmessage')
            vm.somebodyNeedHelp = true
        };

        websocket.onerror = function (evt) {
            console.log('onerror')
        };
    }

    return vm
}])