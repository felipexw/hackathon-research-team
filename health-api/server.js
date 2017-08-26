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

app.set('port', httpPort);
//app.set('host', process.env.NODE_IP || 'localhost');
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
    return response.json({
          "statusCode": 200,
          "message": os.hostname() + ' - Internal IP ' + ip.address()
    });
});

app.post('/api/heartbeat/bradycardia', function(request, response) {
    heartbeat.startBradycardia();
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

//=============================== MAIN ===============================
//https.createServer(options, app).listen(httpPort, function(){
//    console.log(ip.address() + ' listening at ' +  httpPort);
//});

http.createServer(app).listen(httpPort, function(){
    console.log(ip.address() + ' listening at ' +  httpPort);
    heartbeat.simulate();
});
