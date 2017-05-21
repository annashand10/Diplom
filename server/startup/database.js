const mongoose = require('mongoose')
    , config = require('config');

var databaseURL = "mongodb://localhost:27017/diplom";
// Use native promises
mongoose.Promise = global.Promise;
// Connect to database
mongoose.connect(databaseURL);
