'use strict';

var express = require('express'),
    fs = require('fs'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    moment = require('moment'),
    request = require('request'),
    ip = require('ip'),
    http = require('http'),
    //https = require('https'),
    os = require("os"),
    Heartbeat = require('./heartbeat.js');

var httpPort = 8080;
var app = express();
var heartbeat = new Heartbeat();

//var options = {
//    key: fs.readFileSync('privkey.pem'),
//    cert: fs.readFileSync('cert.pem')
//};
var websocketPort = 3443;
var app = express();

function log(message) {
	console.log('app.js: ' + new Date().toUTCString(), message);
}

app.set('port', httpPort);
app.set('host', process.env.NODE_IP || 'localhost');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(path.join(__dirname, '/public')));

app.get('/api/ping', function(request, response) {
    return response.json({
          "statusCode": 200,
          "message": '' + new Date()
    });
});

app.get('/api/server', function(request, response) {
    return response.json({
          "statusCode": 200,
          "message": os.hostname() + ' - Internal IP ' + ip.address()
    });
});

app.post('/api/heartbeat/arrhythmia', function(request, response) {
    heartbeat.startArrhythmia();
    avisaSocorrista("Arritimia do paciente Pedro Augusto");
    return response.json({
          "statusCode": 200,
          "message": os.hostname() + ' - Internal IP ' + ip.address()
    });
});

app.post('/api/heartbeat/bradycardia', function(request, response) {
    heartbeat.startBradycardia();
    avisaSocorrista("Batimentos muito lentos do paciente Pedro Augusto");
    return response.json({
          "statusCode": 200,
          "message": os.hostname() + ' - Internal IP ' + ip.address()
    });
});


app.post('/api/heartbeat/normal', function(request, response) {
    heartbeat.startNormal();
    return response.json({
          "statusCode": 200,
          "message": os.hostname() + ' - Internal IP ' + ip.address()
    });
});


/**
 * API de emergência
 */
app.post('/api/emergency', function(request, response) {    
    const userName = request.body.name;
    return response.json({
          "statusCode": 200,
          "message": "Paciente " + userName + " solicitou emergência"
    });
});

//=============================== WEBSOCKET SESSION ===============================
//https://www.npmjs.com/package/websocket
//http://codular.com/node-web-sockets

var WebSocketServer = require('websocket').server;
var http = require('http');
var httpsWS = require('http');


var connections  = 1;
var clients = {};
var socorrista = null;

var chatClient;
var remoteControlClient;


var webSocketServer = httpsWS.createServer(app, function(request, response) {
    log('## WebSocket Received request for ' + request.url);
    response.writeHead(404);
	response.end();
});

webSocketServer.listen(websocketPort, function() {
  log('##############################################');
  log('WebSocket Service listening at port ' + websocketPort);
  log('##############################################\n\n');
});

var wsServer = new WebSocketServer({
    httpServer: webSocketServer,
    // You should not use autoAcceptConnections for production
    // applications, as it defeats all standard cross-origin protection
    // facilities built into the protocol and the browser.  You should
    // *always* verify the connection's origin and decide whether or not
    // to accept it.
    autoAcceptConnections: false
});

function originIsAllowed(origin) {
  // put logic here to detect whether the specified origin is allowed.
  return true;
}

function avisaSocorrista(message) {
    if (socorrista != null) {
        socorrista.sendUTF(message);
        console.log("Avisando o socorrista sobre " + message);
    } else {
        console.log("Nenhum socorrista está conectado!");
    }
}
         
wsServer.on('request', function(request) {
    if (!originIsAllowed(request.origin)) {
      // Make sure we only accept requests from an allowed origin
      request.reject();
      log('websocket: Connection from origin ' + request.origin + ' rejected.');
      return;
    }

    var connection = request.accept('echo-protocol', request.origin);

	var clientId = connections;
	clients[clientId] = connection;
    connections++;

	//registrar um callback na função de recebimento do webservice
    log('Connection accepted - clientId: ' + clientId);
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            log('websocket: Received Message: ' + message.utf8Data);

            //{from: "socorrista", msg: ""}
            if (message.utf8Data.from === 'socorrista') {
                socorrista = connection;
            }

            //connection.sendUTF(message.utf8Data);
            processMessage(message, connection);

        } else if (message.type === 'binary') {
            log('Received Binary Message of ' + message.binaryData.length + ' bytes');
            connection.sendBytes(message.binaryData);
        }
    });

    connection.on('close', function(reasonCode, description) {
        log('Peer ' + connection.remoteAddress + ' disconnected.');
		delete clients[clientId];
    });
});


var processMessage = function(message, connection) {
    //messgae is either null or undefined
    if (message !== null) {
        var obj = JSON.parse(message.utf8Data);
        if (obj.from === 'remote-control') {
            processRemoteControlMsg(obj, connection);
        } else if (obj.from === 'chat') {
            processChatMsg(obj, connection);
        } else {
            log('Unknown sender at from field: ' + obj.from);
        }
    }
};

var processRemoteControlMsg = function(message, connection) {
    log('processRemoteControlMsg' + message.content);
    if (message.content === 'register') {
        log('REGISTRANDO remoteControlClient');
        remoteControlClient = connection;
    } else if (message.content === 'listen' && chatClient != null) {
        chatClient.send(JSON.stringify(message));
    } else {
        log('Message was not defined or client is not registered: ' + chatClient);
    }

};

var processChatMsg = function(message, connection) {
    log('processChatMsg' + message.content);
    if (message.content === 'register') {
        log('REGISTRANDO chatClient');
        chatClient = connection;
    } else if (message.content === 'ready'  && remoteControlClient != null) {
        remoteControlClient.send(JSON.stringify(message));
    } else {
        log('Message was not defined or client is not registered: ' + remoteControlClient);
    }
};


//=============================== MAIN ===============================
//https.createServer(options, app).listen(httpPort, function(){
//    console.log(ip.address() + ' listening at ' +  httpPort);
//});

http.createServer(app).listen(httpPort, function(){
    console.log(ip.address() + ' listening at ' +  httpPort);
    heartbeat.simulate();
});
