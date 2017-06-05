const express = require('express')
    , frontend = require('./server/apps/frontend')
    , backend = require('./server/apps/backend')
    , admin = require('./server/apps/admin');

const port = 8000;

const server = express()
    .use(backend());

server.use(frontend());

// if (config.get('apps.admin.enabled')) {
//     server.use(vhost(config.get('apps.admin.hostname'), admin()));
// }

server.listen(port);
console.log(`Your server is running on port ${ port }.`);
