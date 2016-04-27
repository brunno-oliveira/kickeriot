/*
 * AWS Iot Client for raspberry
 * Brunno Cunha
 * 26/04/2016
 * Version: 1.0.0
 */
var awsIot = require('aws-iot-device-sdk');
//var localClient = require('LocalClient');

var tShadow  = awsIot.thingShadow({
   keyPath: './certs/61c0a19acc-private.pem.key',
  certPath: './certs/61c0a19acc-certificate.pem.crt',
    caPath: './certs/Root-CA.pem',
  clientId: 'arduinoSala',
    region: 'us-east-1'
});

var clientTokenUpdate;

var ledState = {"state":{"reported":{"state_mode":"OFF"}}};
    console.log("Led State: " + JSON.stringify(ledState));

//Procedure que conecta na Amazon e registra os t�picos de interesse
//Ao conseguir registrar deve reportar com os valor locais dos sensores
tShadow.on('connect', function() {
	console.log('connect');
	tShadow.register('led1');
      
   setTimeout( function() {       
      clientTokenUpdate = tShadow.update('led1', ledState);
   }, 2000 );
	   
});

//Log 
tShadow.on('status', 
    function(thingName, stat, clientToken, stateObject) {
       console.log('received '+stat+' on '+thingName+': '+
                   JSON.stringify(stateObject));
        //log.add(received, stat, thingname, payload )   
});

//O Delta é o igual ao DESIRED se o REPORTED for difirente
tShadow.on('delta', 
    function(thingName, stateObject) {
       console.log('received delta '+' on '+thingName+': '+
                   JSON.stringify(stateObject));
				   
	if (stateObject.state.state_mode === "ON"){
		console.log("Atualizando o Delta para ON");
		
		setTimeout( function() {
			clientTokenUpdate = tShadow.update('led1', {"state":{"reported":{"state_mode":"ON"}}});
		}, 2000 );		
		
	} else if (stateObject.state.state_mode === "OFF") {
		console.log("Atualizando o Delta para OFF");
		
		setTimeout( function() {
			clientTokenUpdate = tShadow.update('led1', {"state":{"reported":{"state_mode":"OFF"}}});
		}, 2000 );
	}				   
		
});

tShadow.on('timeout',
    function(thingName, clientToken) {
       console.log('received timeout '+' on '+operation+': '+
                   clientToken);
});


