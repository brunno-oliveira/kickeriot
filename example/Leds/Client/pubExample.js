/*
 * Brunno Cunha
 * 26/04/2016
 * Version: 1.0.0
 */
var mqtt = require('mqtt');

var client = mqtt.connect('', [
    { 
        host: 'localhost', 
        clientId: 'raspberry-sub',
        clean: false
    }]
);

client.on('connect', function() {
	console.log('Publishing..')
	client.publish('example/leds/red', 'ON', 1, true);
	client.publish('example/leds/green', 'OFF', 1, true);
	client.publish('example/leds/yellow', 'ON', 1, true);	
        client.close();
});


