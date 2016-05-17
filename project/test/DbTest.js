var mysql      = require('mysql');

var conn = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '123456',
    database : 'IOT'
});

exports.getAwsSubInfo = function(callback) {
  query("SELECT * FROM AWS_SUBSCRIBE_INFO", callback)
}

function query(queryString, callback) {
    conn.connect();
    conn.query(queryString, function(err, rows, fields) {
    conn.end();
    if (err) return callback(err);
    callback(null,rows);
  });
};


