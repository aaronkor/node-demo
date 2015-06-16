var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var Brokers = require('./brokers');

//Initialize Brokers Model
var brokers = new Brokers();
brokers.on('added', function(newBroker) {
	console.log('New broker added: ' + JSON.stringify(newBroker));
});

//App Settings
app.set('view engine', 'jade');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.get('/', function(req, res) {
	res.end('Hello Express');
});

app.get('/brokers', function(req, res) {
	brokers.getAll(function(err, brokerList) {
		if(err) {
			console.log(err);
			res.render('error', err);
		} else {
			res.render('brokers', {brokers: brokerList});
		}
	});
});

app.post('/brokers/add', function(req, res) {
	brokers.add(req.body.newBroker);
	res.end('New broker is being added.');
});

app.listen(8888, function() {
	console.log('Listening on port 8888');
});