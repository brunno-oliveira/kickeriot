/*
 * Brunno Cunha
 * 26/04/2016
 * Version: 1.0.0
 */
var mqtt  = require('mqtt');

var client = mqtt.connect('', [{ 
        host: 'localhost', 
        clientId: 'raspberry-sub',
        clean: false
    }]
);

client.on('connect', function() {
    console.log('Subscribing to topics..')
    client.subscribe('example/#', 0);
    console.log('Subscribed!');
    console.log('Waiting for messages....');
});

client.on('message', function (topic, message) {
    console.log('Topic: ' + topic.toString() + ' Message: ' + message.toString());	
});
