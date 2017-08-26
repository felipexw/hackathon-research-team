function sosClick(event) {
    websocket = new WebSocket("ws://localhost:3443", "echo-protocol");

    websocket.onopen = function () { 
        console.log("<p>> CONNECTED</p>");
    };

    websocket.onmessage = function (evt) { 
        console.log("<p style='color: blue;'>> RESPONSE: " + evt.data + "</p>");
    };

    websocket.onerror = function (evt) { 
        console.log("<p style='color: red;'>> ERROR: " + evt.data + "</p>");
    };
}