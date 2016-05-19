/*
 * Classe para registrar nas things e topicos do Aws IOT
 * Brunno Cunha
 * 11/05/2016
 * Version: 1.0.0
 */
var db = require('./DataAcess.js');
var awsIot = require('aws-iot-device-sdk');
var mysql      = require('mysql');
//var mqttLocal = require('./LocalPublisher.js');


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
      
    RegisterAndSubscribe(function(err, rows){
        console.log(rows);
    });
    
    tShadow.register('led1');      
    tShadow.subscribe('example/led/led1'); 	   
    
    
    
    console.log('Connected!!');
});

tShadow.on('message', 
    function(topic, message) {
       console.log('Message! Topic: '+topic+' Message: ' + message);      
       //mqttLocal.publisher(topic, message);
});

//Função para buscar os dados da tabela AWS_SUBSCRIBE_INFO
//que são utilizado para registar tópicos e things na aws
function RegisterAndSubscribe(callback){  
    db.getAllFromTable('AWS_SUBSCRIBE_INFO', function(err, rows, table){
        if (err) return callback(err);        
        callback(null, rows)        
    });
};
