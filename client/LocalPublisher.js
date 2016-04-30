/*
 * Client for publishing on localhost broker
 * Brunno Cunha
 * 28/04/2016
 * Version: 1.0.0
 */
var mqtt = require('mqtt');

/* 
 * Função que recebe o Tópico e a Menssagem
 * para publicar no broker local
 */
exports.publisher = function(topic, message){
var client = mqtt.connect('', [{ 
        host: 'localhost', 
        clientId: 'raspberry-sub',
        clean: false
    }]
);    
    console.log('LocalPublisher...')
    console.log('Topico: ' + topic +  ' Payload: ' + message);     
    client.on('connect', function() {        
        console.log('Publishing to: ');                   
        client.publish(topic, message, [{qos: 1, retain: true}]);
        client.end();
    });    

};

var publish = function(topic, message){
    console.log('porra');
    client.on('connect', function() {        
        console.log('Publishing to: ' + hostname);                   
        client.publish(topic, message, [{qos: 1, retain: true}]);
        client.end();
    });    
};

