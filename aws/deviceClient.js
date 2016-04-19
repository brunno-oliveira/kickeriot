var awsIot = require('aws-iot-device-sdk');

var device  = awsIot.thingShadow({
   keyPath: './certs/61c0a19acc-private.pem.key',
  certPath: './certs/61c0a19acc-certificate.pem.crt',
    caPath: './certs/root-CA.pem',
  clientId: 'arduinoSala',
    region: 'us-east-1'
});


device.on('connect', function() {
   	console.log('connect');
	device.subscribe('#');
});

device.on('message', function(topic, payload) {
	console.log('message', topic, payload.toString());
});
