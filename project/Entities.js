var Sequelize = require('sequelize');
var conn = new Sequelize('IOT', 'root', '123456', 'mysql');

exports.thingTopic = function(){
    return conn.define('AWS_THING_TOPIC', { 
        id   : { type: Sequelize.INTEGER, primaryKey: true},
        thing   : Sequelize.STRING,
        topic   : Sequelize.STRING,
        created : Sequelize.DATE,
        updated : Sequelize.DATE
    }, {
        timestamps: false,
        freezeTableName: true
    });  
};