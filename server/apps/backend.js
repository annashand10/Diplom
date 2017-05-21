const express = require('express')
    , startup = require('../startup');

module.exports = () => {
    const app = express();

    // Start the application
    startup(app);

    // Export app for testing purposes
    return app;
};
