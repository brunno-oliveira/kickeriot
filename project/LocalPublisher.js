/*
 * Client for publishing on localhost broker
 * Brunno Cunha
 * 22/05/2016
 * Version: 2.0.0
 */
var mqtt = require('mqtt');

/* 
 * Função pública pra publicar em broker local
 */
exports.Publisher = function(topic, message){
    console.log('LocalPublisher...');       
    console.log('topic: ' + topic + ' topic: ' + message);  
    
    //Valido se o tipo do sensor é tratado
    var TipoSensor = GetTipoSensor(topic);    
    if (TipoSensor === null) {
        process.on('exit', function() { process.exit(1); });
    }    
    
    //Valido se a menssagem do sensor é tratada
    var message = GetMessage(TipoSensor, message);
    if (message === null) {
        process.on('exit', function() { process.exit(1); });
    }
    
    Publish(topic, message);
};

/*
 * Função para para buscar o PENÚLTIMO tópico,
 * pois ele deve ser o que identifica o tipo do sensor.
 * E validar se esse tipo de sensor está sendo tratado
 */
var GetTipoSensor = function(topic){  
    var SensoresRegistrados = ["switch"]
    var topicArray = topic.split("/");  
        
    topicArray.pop();
    var TipoSensor = topicArray.pop();     
    
   if (SensoresRegistrados.indexOf(TipoSensor) > -1) {
        return TipoSensor;
    } else {        
        console.log('Sensor do tipo: ' + TipoSensor + ' não registrado!');  
        return null;
    }    
};

/*
 * Retorna a ação da mensagem em uma STRING
 */
var GetMessage = function(TipoSensor, message){   
    console.log('GetMessage.. TipoSensor: '+ TipoSensor 
            + ' Message:' + message);  
    switch (TipoSensor){  
        case 'switch':
            return SwitchMessage(message);
        break;         
        case 'dht':
            //return
        break;
        case 'pir':
            //return
        break;
    }
};

//procura pela mensagem state_mode
//e retorna a menssagem que sera enviada para o local broker
var SwitchMessage = function(message){
    console.log('SwitchMessage... message: ' + message);
    if (message === 'ON'){
        return 'ON';
    } else if (message === 'OFF') {
        return 'OFF';
    } else {
        console.log('Estado: ' + message + 
                ' para o sensor do tipo Switch não cadastrado!')
        return null;
    }   
};

var Publish = function(topic, message){
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


