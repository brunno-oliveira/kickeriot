/*
 * Connects to a local Broker 
 * ans listen to messages
 * Brunno Cunha
 * 01/05/2016
 * Version: 2.0.0
 */
var mqtt = require('mqtt');
var client = mqtt.connect('', [{ host: 'localhost' }]);

client.on('connect', function() {
	console.log('Subscribing to topics..')
	client.subscribe('#');
	console.log('Subscribed!');
	console.log('Waiting for messages....');
});

client.on('message', function (topic, message) {
	console.log('Topic: ' + topic.toString() + ' Message: ' + message.toString());	
});
