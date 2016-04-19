var awsIot = require('aws-iot-device-sdk');

var tShadow  = awsIot.thingShadow({
   keyPath: './certs/61c0a19acc-private.pem.key',
  certPath: './certs/61c0a19acc-certificate.pem.crt',
    caPath: './certs/root-CA.pem',
  clientId: 'arduinoSala',
    region: 'us-east-1'
});

var clientTokenUpdate;

//Criar uma função para verificar o Broker Local e passar o State
var ledState = {"state":{"reported":{"state_mode":"OFF"}}};
console.log("Led State: " + JSON.stringify(ledState));


tShadow.on('connect', function() {
	console.log('connect');
	tShadow.register('led1');
   
   setTimeout( function() {
      clientTokenUpdate = tShadow.update('led1', ledState);
   }, 2000 );
	   
});


tShadow.on('status', 
    function(thingName, stat, clientToken, stateObject) {
       console.log('received '+stat+' on '+thingName+': '+
                   JSON.stringify(stateObject));
});


tShadow.on('delta', 
    function(thingName, stateObject) {
       console.log('received delta '+' on '+thingName+': '+
                   JSON.stringify(stateObject));
				   
	//Verificar o Delta e atualizar a partir do mesmo
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


