var Promise = require('promise');
var mysql      = require('mysql');
var sleep = require('sleep');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'k3vds',
    database : 'IOT'
});

exports.getAllData = function(){    
    var data;
    var promise = new Promise(function (resolve, reject) {
        connection.connect();
        connection.query('SELECT * from AWS_SUBSCRIBE_INFO',
            function(err, results){
                if (err) {            
                    reject(err);
                } else {                                 
                    data = results;
                    resolve(results);                       
                }        
        });   
    });     
   
    promise.then(function(){            
       connection.end();       
       return data;             
    });  
    console.log(data);
};

exports.teste = function(){
  var teste;
  connection.connect();
        connection.query('SELECT * from AWS_SUBSCRIBE_INFO',    
            function(err, results){
                if (err) {            
                    console.log(err)
                } else {                   
                    teste = results;
            }  
        });
    sleep(1000);
    console.log(teste)
    return teste;
};