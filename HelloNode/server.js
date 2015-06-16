var http = require('http');
var server = http.createServer(function(req, res) {
	res.end('Hello Node');
});

server.listen(8888, function() {
	console.log('Listening on port 8888');
});