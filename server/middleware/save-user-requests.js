const moment = require('moment')
    , config = require('config');

module.exports = (req, res, next) => {
    const request = {
        received_at: new Date(),
        ip: req.ip,
        method: req.method,
        url: req.originalUrl
    };

    let activitySession;

    if (
        !req.user.get('last_activity_at') ||
        !req.user.get('activity_sessions').length ||
        moment().diff(moment(req.user.get('last_activity_at'))) > config.get('User.onlineThreshold')
    ) {
        activitySession = {
            requests: [request]
        };
        req.user.get('activity_sessions').push(activitySession);
    } else {
        activitySession = req.user.get('activity_sessions')[req.user.get('activity_sessions').length - 1];
        activitySession.get('requests').push(request);
    }

    req.user.set('last_activity_at', new Date());

    req.user.save()
        .then(() => {
            next();
        });
};
