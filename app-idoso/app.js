const http = require('http');

const finalhandler = require('finalhandler');
const serveStatic = require('serve-static');

const serve = serveStatic("./src");
const port = 8081;

const server = http.createServer((req, res) => {
    const done = finalhandler(req, res);
    serve(req, res, done);
});

server.listen(port, function(){
    console.log('listening on port ' + port)
});