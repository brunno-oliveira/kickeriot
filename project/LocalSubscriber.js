/*
 * Conecta no Broker local e repssa 
 * para a classe AwsPublisher
 * Brunno Cunha
 * 22/06/2016
 * Version: 2.0.0
 */
var awsPub = require('./AwsPublisher.js');
var mqtt = require('mqtt');
var client = mqtt.connect('', [{ host: 'localhost' }]);

client.on('connect', function() {
	console.log('Subscribing to topics..')
	client.subscribe('brunno/sala/dht22/#');
	console.log('Subscribed!');
	console.log('Waiting for messages....');
});

client.on('message', function (topic, message) {
    console.log('Topic: ' + topic.toString() + ' Message: ' + message.toString());	
    awsPub.Publisher(topic.toString(), message.toString());
});
