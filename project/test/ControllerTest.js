var db = require('./DbTest.js');
var Promise = require('promise');
var async = require('async');

var data;

function getData(){
    return db.getAllData();
};

data = getData();
console.log(data);


