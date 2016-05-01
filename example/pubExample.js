/*
 * Brunno Cunha
 * 26/04/2016
 * Version: 1.0.0
 */
var mqtt = require('mqtt');

var client = mqtt.connect('', [{ 
        host: 'localhost', 
        clientId: 'raspberry-sub',
        clean: false
    }]
);

var ledOff = JSON.stringify({ "state_mode": "OFF"});    
var ledOn = JSON.stringify({ "state_mode": "ON"});

client.on('connect', function() {
	console.log('Publishing..')
	client.publish('example/leds/red', ledOn, 
		[{qos: 1, retain: true}]);
	client.publish('example/leds/green', ledOn,
		[{qos: 1, retain: true}]);	
	client.publish('example/leds/yellow', ledOn,
		 [{qos: 1, retain: true}]);
        client.end();
});


