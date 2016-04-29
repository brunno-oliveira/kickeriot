/*
 * Client for publishing on localhost broker
 * Brunno Cunha
 * 28/04/2016
 * Version: 1.0.0
 */
var mqtt = require('mqtt');

var client = mqtt.connect('', [{ 
        host: '192.168.1.6', 
        clientId: 'raspberry-sub',
        clean: false
    }]
);

exports.publish = function(topic, message){
    console.log('Connecting to local broker..')
    console.log('Topico: ' + topic +  ' Payload: ' + message);
    client.on('connect', function() {
        console.log('Connected!');   
        client.publish(topic, message, [{qos: 1, retain: true}]);
        client.end();
    });
};