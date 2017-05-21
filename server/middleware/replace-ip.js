const config = require('config');

module.exports = (req, res, next) => {
    if (req.ip && config.has('replaceIps')) {
        req.ipReplacement = config.get('replaceIps')[req.ip];
    }

    next();
};
