/*
 * Classe para registrar nas things e topicos do Aws IOT
 * Brunno Cunha
 * 11/05/2016
 * Version: 1.0.0
 */
var entities = require('./Entities.js');
var awsIot = require('aws-iot-device-sdk');
var Sequelize = require('sequelize');
//var mqttLocal = require('./LocalPublisher.js');

var conn = new Sequelize('IOT', 'root', '123456', 'mysql');

//Verificar se é possivel carregar como string
var tShadow  = awsIot.thingShadow({
   keyPath: './certs/61c0a19acc-private.pem.key',
  certPath: './certs/61c0a19acc-certificate.pem.crt',
    caPath: './certs/Root-CA.pem',
  clientId: 'Raspberry-Subscriber',
    region: 'us-east-1'
});

tShadow.on('connect', function() {    
    console.log('Connecting....');  
    RegisterAndSubscribe();        
    //tShadow.register('led1');
   // tShadow.subscribe('example/led/led1');
    console.log('Connected!!');
});

tShadow.on('message', 
    function(topic, message) {
       console.log('Message! Topic: '+topic+' Message: ' + message);      
       //mqttLocal.publisher(topic, message);
});

function RegisterAndSubscribe(){  
    var ListaThingTopic = entities.thingTopic();             
    ListaThingTopic.findAll().then(function(thingTopic){                            
        for (var i = 0, len = thingTopic.length; i < len; i++){            
            RegiterThing(thingTopic[i].thing);
            SubscribeTopic(thingTopic[i].topic);
        };
    });
};

function RegiterThing(thing){        
    tShadow.register(thing);
    console.log('Registrando para thing: ' + thing.toString());
};

function SubscribeTopic(topic){        
    tShadow.subscribe(topic);
    console.log('Subscribe para topico ' + topic.toString());
};
