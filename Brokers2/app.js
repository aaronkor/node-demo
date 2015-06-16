var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var Brokers = require('./brokers');

//Initialize Brokers Model
var io;
var brokers = new Brokers();
brokers.on('added', function(newBroker) {
	console.log('New broker added: ' + JSON.stringify(newBroker));
	if(io && io.emit) {
		io.emit('broker-added', newBroker);
	}
});

//App Settings
app.set('view engine', 'jade');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.get('/', function(req, res) {
	res.end('Hello Express');
});

app.get('/brokers', renderBrokers);

app.post('/brokers/add', function(req, res) {
	brokers.add(req.body.newBroker);
	renderBrokers(req, res);
});

function renderBrokers(req, res) {
	brokers.getAll(function(err, brokerList) {
		if(err) {
			console.log(err);
			res.render('error', err);
		} else {
			res.render('brokers', {brokers: brokerList});
		}
	});
} 

var server = app.listen(8888, function() {
	console.log('Listening on port 8888');
});

//io initialization
io = require('socket.io').listen(server);
io.on('connect', function(socket) {
	console.log('client connected');
});