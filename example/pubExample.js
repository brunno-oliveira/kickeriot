/*
 * Brunno Cunha
 * 26/04/2016
 * Version: 1.0.0
 */
var mqtt = require('mqtt');

var client = mqtt.connect('', [{ 
        host: 'localhost', 
        clientId: 'raspberry-pub',
        clean: false,
        will: {topic : "willtopic", payload: 'something happened here..'},
    }]
);

var ledOff = JSON.stringify({ "state_mode": "OFF"});    
var ledOn = JSON.stringify({ "state_mode": "ON"});

client.on('connect', function() {
	console.log('Publishing..')
	client.publish('example/leds/red', ledOn, 
		[{qos: 1, retain: true}]);
        client.end();
});