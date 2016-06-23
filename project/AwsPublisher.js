/*
 * AWS Iot Publisher
 * Brunno Cunha
 * 22/06/2016
 * Version: 2.1.0
 */
var mqtt = require('mqtt');
var client = mqtt.connect('', [{ host: 'localhost' }]);
var awsIot = require('aws-iot-device-sdk');

var ledOff = "OFF";    
var ledOn ="ON";

var led1 = ('brunno/sala/switch/led1');
var led2 = ('brunno/sala/switch/led2');
var led3 = ('brunno/sala/switch/led3');

var tShadow  = awsIot.thingShadow({
   keyPath: './certs/61c0a19acc-private.pem.key',
  certPath: './certs/61c0a19acc-certificate.pem.crt',
    caPath: './certs/Root-CA.pem',
  clientId: 'Raspberry-Publisher',
    region: 'us-east-1'
});

tShadow.on('connect', function() {
    console.log('AwsPublisher Connected....');    
});

exports.Publisher = function(topic, message){
    console.log('AwsPublisher... publishing to:')
    console.log('Topic: ' + topic + ' Message: ' + message);
}

tShadow.on('timeout',
    function(thingName, clientToken) {
       console.log('received timeout on '+thingName+
                   ' with token: '+ clientToken)
});