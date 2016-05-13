var async = require('async');
var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'k3vds',
    database : 'IOT'
});


function getData(err, callback){
    var resultado;
    connection.connect();
    async.series([
        function(callback){        
        connection.query('SELECT * from AWS_SUBSCRIBE_INFO',  function(err, results){
            if (err) {
                console.log(err);    
            } else {                
                resultado = results;
                callback();
            }        
        });        
    },
        function(callback){            
            callback();
        }
    ], function(err) {
        if (err) return next(err);
    });  
    connection.end();  
}

var data = teste();
