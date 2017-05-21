const express = require('express')
    , fs = require('fs')

module.exports = () => {
    const app = express();

    app.use(express.static(__dirname + '../../../client')); //TODO: enable caching later

    app.get('*', function (request, response, next) {
        response.sendFile(fs.realpathSync(__dirname + '../../../client/index.html'));
    });

    return app;
};
