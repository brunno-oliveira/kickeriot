var Promise = require('promise');
var mysql      = require('mysql');
var async = require('async');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'k3vds',
    database : 'IOT'
});

exports.getAllData = function(){    
    var promise = new Promise(function (resolve, reject) {
        connection.connect();
        connection.query('SELECT * from AWS_SUBSCRIBE_INFO',
            function(err, results){
                if (err) {            
                    reject(err);
                } else {                                
                    resolve(results);                 
                }        
        });   
    });     
   
    promise.then(function(){                           
       return promise;              
    });  
}