var express = require('express');
var app = express();

app.get('/', function(req, res) {
	res.end('Hello Express');
});

app.listen(8888, function() {
	console.log('Listening on port 8888');
});