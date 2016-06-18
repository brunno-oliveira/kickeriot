/*
 * AWS Iot Publisher
 * Brunno Cunha
 * 18/06/2016
 * Version: 2.1.0
 */
var awsIot = require('aws-iot-device-sdk');

var tShadow  = awsIot.thingShadow({
   keyPath: './certs/61c0a19acc-private.pem.key',
  certPath: './certs/61c0a19acc-certificate.pem.crt',
    caPath: './certs/Root-CA.pem',
  clientId: 'Raspberry-Publisher',
    region: 'us-east-1'
});

var clientTokenUpdate;

var ledState = {"state":{"desired":{"state_mode":"ON"}}};    
var ledOff = "OFF";    
var ledOn ="ON";

var led1 = ('brunno/sala/switch/led1');
var led2 = ('brunno/sala/switch/led2');
var led3 = ('brunno/sala/switch/led3');

//Procedure que conecta na Amazon e registra os t�picos de interesse
//Ao conseguir registrar deve reportar com os valor locais dos sensores
tShadow.on('connect', function() {
    console.log('Connecting....');
    tShadow.register('led1');      
    tShadow.subscribe('brunno/sala/switch/led1');    
    console.log(led1 + ' : ' + ledOn);
    tShadow.publish(led1, ledOn);            
    //Atualizando o status da thing com o estado atual
    /*setTimeout( function() {              
        clientTokenUpdate = tShadow.update('led1', ledState);
        if (clientTokenUpdate === null)       {
            console.log('update shadow failed, operation still in progress');
        }
        else{
            tShadow.publish('brunno/sala/switch/led1', ledOn);            
        }        
    }, 5000 );	*/
});

//O status vem do clientTokenUpdate
tShadow.on('status', 
    function(thingName, stat, clientToken, stateObject) {
       console.log('received '+stat+' on '+thingName+': '+
                   JSON.stringify(stateObject));
        //log.add(received, stat, thingname, payload )   
});

tShadow.on('timeout',
    function(thingName, clientToken) {
       console.log('received timeout on '+thingName+
                   ' with token: '+ clientToken)
});