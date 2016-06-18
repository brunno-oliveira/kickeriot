/*
 * Client for publishing on localhost broker
 * Brunno Cunha
 * 01/05/2016
 * Version: 2.0.0
 */
var mqtt = require('mqtt');

/* 
 * Função pública pra publicar em broker local
 */
exports.publisher = function(topic, msg){
    console.log('LocalPublisher...');
    consolog.log('topic: ' + msg);
    consolog.log('msg: ' + topic);
    
    var TipoSensor = getTipoSensor(topic); 
    
    console.log('TipoSensor: ' + TipoSensor);
    
    if (TipoSensor === null) {
        process.on('exit', function() { process.exit(1); });
    }    
    
    var message = getMessage(TipoSensor, msg);
    if (message === null) {
        process.on('exit', function() { process.exit(1); });
    }
    
    publish(topic, message);
};

/*
 * Função para para buscar o PENÚLTIMO tópico,
 * pois ele deve ser o que identifica o tipo do sensor.
 * E validar se esse tipo de sensor está sendo tratado
 */
var getTipoSensor = function(topic){      
    console.log('getTipoSensor... topic: ' + topic);    
    var arrSensores = ["switch"]
    var topicArray = topic.split("/");   
    topicArray.pop();
    var TipoSensor = topicArray.pop();     
    if (arrSensores.indexOf(TipoSensor) > -1) {
        return TipoSensor;
    } else {        
        console.log('Sensor do tipo: ' + TipoSensor + ' não registrado!');  
        return null;
    }
};

/*
 * Retorna a ação da mensagem em uma STRING
 */
var getMessage = function(TipoSensor, msg){
    console.log('getMessage...Tipo Sensor:' + TipoSensor
                + ' message: ' + msg);    
    switch (TipoSensor){  
        case 'switch':
            return switchMessage(msg);
        break;         
        case 'dht':
            //return
        break;
        case 'pir':
            //return
        break;
    }
};

var switchMessage = function(msg){
    if (msg.state_mode === 'ON'){
        return 'ON';
    } else if (msg.state_mode === 'OFF') {
        return 'OFF';
    } else {
        console.log('Estado: ' + msg + 
                ' para o sensor do tipo Led não cadastrado!')
        return null;
    }   
};

var publish = function(topic, message){
    var client = mqtt.connect('', [{ 
            host: 'localhost', 
            clientId: 'raspberry-sub',
            clean: false }]);
    
    console.log('Connecting to local broker..')
    client.on('connect', function() {        
        console.log('Connected and publishing..');                   
        client.publish(topic, message, [{qos: 1, retain: true}]);
        client.end();
    });    
};


