var util = require('util');
var express = require('express');
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');


var app = express();

var mongoose = require("mongoose");
var connection = mongoose.connect("mongodb://localhost:27017/diplom");
var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(connection);


var port = 8000;


var env = process.env.NODE_ENV || 'development';
app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = env == 'development';

app.use(bodyParser.urlencoded({extended: true}));
//app.use(compress());
app.use(bodyParser.json({limit: '10mb'}));

module.exports = {app: app};


app.use(express.static(__dirname + '/client')); //TODO: enable caching later

app.all('*', function (req, res) {
    res.sendFile(__dirname + '/client/index.html');
});

app.listen(port);
console.log("Server listening on port %d", port);
