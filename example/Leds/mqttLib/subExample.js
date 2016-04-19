var mqtt = require('mqtt');
var client = mqtt.connect('', [{ host: 'localhost' }]);

client.on('connect', function() {
	console.log('Subscribing to topics..')
	client.subscribe('example/#')
	//client.subscribe('example/01');
	//client.subscribe('example/02');
	//client.subscribe('example/03');
	console.log('Subscribed!');
	console.log('Waiting for messages....');
});

client.on('message', function (topic, message) {
	console.log('Topic: ' + topic.toString() + ' Message: ' + message.toString());	
});
