const mqtt = require('mqtt');
var client = mqtt.connect('', [{ host: 'localhost' }]);

client.on('connect', function() {
	console.log('Publishing..')
	client.publish('example/leds/red', 'ON', 1);
	client.publish('example/leds/green', 'OFF', 1);
	client.publish('example/leds/yellow', 'ON', 1);	
});


