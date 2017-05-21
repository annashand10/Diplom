const bodyParser = require('body-parser')
    , express = require('express')
    , config = require('config')
    , cors = require('cors')
    , morgan = require('morgan');

module.exports = (app) => {
    // Add middleware
    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(morgan('dev'));
};