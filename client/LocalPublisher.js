/*
 * Client for publishing on localhost broker
 * Brunno Cunha
 * 28/04/2016
 * Version: 1.0.0
 */
var mqtt = require('mqtt');

var client = mqtt.connect('', [{ 
        host: 'localhost', 
        clientId: 'raspberry-sub',
        clean: false
    }]
);

/* 
 * Função que recebe o Tópico e a Menssagem
 * para publicar no broker local
 */
exports.publisher = function(topic, message){
    console.log('LocalPublisher...')
    console.log('Topico: ' + topic +  ' Payload: ' + message);    
    publish(topic, message);
};

var publish = function(topic, message){
    client.on('connect', function() {        
        console.log('Publishing to: ' + hostname);                   
        client.publish(topic, message, [{qos: 1, retain: true}]);
        client.end();
    });    
};

