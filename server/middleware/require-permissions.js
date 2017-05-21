const apiResponse = require('../utils').apiResponse;

module.exports = (permissions) => {
    return (req, res, next) => {
        if (typeof permissions === 'string') {
            if (!req.user.can(permissions)) {
                throw new apiResponse.AccessDeniedResponse;
            }
        } else {
            for (let permission of permissions) {
                if (!req.user.can(permission)) {
                    throw new apiResponse.AccessDeniedResponse;
                }
            }
        }

        next();
    };
};
