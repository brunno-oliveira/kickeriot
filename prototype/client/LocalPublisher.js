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
exports.publisher = function(topic, JsonMsg){
    console.log('LocalPublisher...')   
    var TipoSensor = getTipoSensor(topic);    
    if (TipoSensor === null) {
        process.on('exit', function() { process.exit(1); });
    }    
    
    var message = getMessage(TipoSensor, JsonMsg);
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
var getMessage = function(TipoSensor, JsonMsg){
    var objMsg = JSON.parse(JsonMsg);
    switch (TipoSensor){  
        case 'switch':
            return switchMessage(objMsg);
        break;         
        case 'dht':
            //return
        break;
        case 'pir':
            //return
        break;
    }
};

var switchMessage = function(objMsg){
    if (objMsg.state_mode === 'ON'){
        return 'ON';
    } else if (objMsg.state_mode === 'OFF') {
        return 'OFF';
    } else {
        console.log('Estado: ' + objMsg.state_mode + 
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


