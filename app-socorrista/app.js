const http = require('http');

const finalhandler = require('finalhandler');
const serveStatic = require('serve-static');

const serve = serveStatic("./");

const server = http.createServer((req, res) => {
    const done = finalhandler(req, res);
    serve(req, res, done);
});

server.listen(8080, function(){
    console.log('listening')
});