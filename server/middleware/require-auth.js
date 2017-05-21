const passport = require('passport')
    , composableMiddleware = require('composable-middleware')
    , requirePermissions = require('./require-permissions')
    , saveUserRequests = require('./save-user-requests');

const authenticate = passport.authenticate('jwt', { session: false });
const checkPermission = requirePermissions('auth');
const saveRequest = saveUserRequests;

module.exports = composableMiddleware(
    authenticate,
    checkPermission,
    saveRequest
);
