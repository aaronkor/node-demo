var util = require('util');
var EventEmitter = require('events').EventEmitter;

//DB
var id = 1;
var dataStore = {
	brokers: [
		{id: id++, name: 'Broker Brokerovic'},
		{id: id++, name: 'Other Brokerovic'},
		{id: id++, name: 'Broker Brokerstein'}
		]
};

// Brokers Model
function Brokers() {
	EventEmitter.call(this);
};

util.inherits(Brokers, EventEmitter);


Brokers.prototype.getAll = function(cb) {
	setTimeout(function() {
		cb(null, dataStore.brokers);
	}, 0);
};

Brokers.prototype.add = function(brokerName) {
	var self = this;
	setTimeout(function() {
		var newBroker = {id: id++, name: brokerName};
		dataStore.brokers.push(newBroker);
		self.emit('added', newBroker);
	}, 5000);
};

module.exports = Brokers;