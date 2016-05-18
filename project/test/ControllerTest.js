var db = require('./DbTest.js');
var mysql      = require('mysql');

function getAwsSubInfo(callback){  
    db.getAwsSubInfo('AWS_SUBSCRIBE_INFO', function(err, rows, table){
        if (err) return callback(err);        
        callback(null, rows)        
    });
};

getAwsSubInfo(function(err, rows){
    if (err) {
        console.log(err)
    } else {
        console.log(rows)
    }   
});