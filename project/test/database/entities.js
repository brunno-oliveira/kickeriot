var Sequelize = require('sequelize');
var conn = new Sequelize('IOT', 'root', '123456', 'mysql');

var ThingTopic = conn.define('AWS_THING_TOPIC', { 
    id      : { type: Sequelize.INTEGER, primaryKey: true},
    thing   : Sequelize.STRING,
    topic   : Sequelize.STRING,
    created : Sequelize.DATE,
    updated : Sequelize.DATE
    }, {
        timestamps: false,
        freezeTableName: true
});  

console.log(ThingTopic);


ThingTopic.findAll().then(function(thingTopic){
    console.log(thingTopic[0].dataValues);
});
