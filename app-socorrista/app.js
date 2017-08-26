var express = require('express');
var app = express();
var path = require('path');

app.use('/vendor', express.static(__dirname + '/node_modules'));
app.use('/', express.static(__dirname + '/src'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/src/index.html'));
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});