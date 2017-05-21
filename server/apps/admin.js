const express = require('express')
    , fs = require('fs')
    , config = require('config');

module.exports = () => {
    const app = express();

    app.use(express.static(config.get('apps.admin.publicDir')));

    app.get('*', function (request, response, next) {
        response.sendFile(fs.realpathSync(config.get('apps.admin.publicDir') + '/index.html'));
    });

    return app;
};
