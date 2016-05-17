var db = require('./DbTest.js');
var mysql      = require('mysql');

var conn = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'k3vds',
    database : 'IOT'
});

function getAwsSubInfo(){
    db.getAwsSubInfo(function(err, rows){
        if (err) {
          console.log(err)
        } else {
          console.log(rows)
        }    
    });
};

getAwsSubInfo();