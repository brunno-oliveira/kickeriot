/*
 * AWS Iot Client for raspberry
 * Brunno Cunha
 * 27/04/2016
 * Version: 1.0.0
 */
var awsIot = require('aws-iot-device-sdk');
var mqttLocal = require('./LocalPublisher.js');

var tShadow  = awsIot.thingShadow({
   keyPath: './certs/61c0a19acc-private.pem.key',
  certPath: './certs/61c0a19acc-certificate.pem.crt',
    caPath: './certs/Root-CA.pem',
  clientId: 'Raspberry-Subscriber',
    region: 'us-east-1'
});

tShadow.on('connect', function() {
    console.log('Connecting....');
    tShadow.register('led1');      
    tShadow.subscribe('example/led/led1'); 	   
    console.log('Connected!!');
});

tShadow.on('message', 
    function(topic, message) {
       console.log('Message! Topic: '+topic+' Message: ' + message);      
       mqttLocal.publisher(topic, message);
});
