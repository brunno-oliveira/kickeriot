/*
 * Connects to a local Broker
 * Brunno Cunha
 * 19/04/2016
 * Version: 1.0.0
 */
var mqtt = require('mqtt');
var client = mqtt.connect('', [{ host: 'localhost' }]);

client.on('connect', function() {
	console.log('Subscribing to topics..')
	client.subscribe('led1');
	console.log('Subscribed!');
	console.log('Waiting for messages....');
});

client.on('message', function (topic, message) {
	console.log('Topic: ' + topic.toString() + ' Message: ' + message.toString());	
});
