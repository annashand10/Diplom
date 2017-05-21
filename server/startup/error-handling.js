const mongoose = require('mongoose')
    , apiResponse = require('../utils').apiResponse;

function logErrors (err, req, res, next) {
    if (err instanceof mongoose.Error) {
        console.error(`${err.name}: ${err.message}`);
        for (let field in err.errors) {
            if (!err.errors.hasOwnProperty(field)) continue;
            console.error(`    ${field}: ${err.errors[field].message}`);
        }
    } else {
        console.error(err);
    }
    next(err);
}

function clientErrorHandler (err, req, res, next) {
    if (err instanceof apiResponse.Response) {
        err.send(res);
        return;
    }

    res.status(500).send({
        error: {
            message: 'Server error!'
        }
    });
}

module.exports = (app) => {
    app.use(logErrors);
    app.use(clientErrorHandler);
};
