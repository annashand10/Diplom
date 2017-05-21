const Joi = require('joi');

module.exports = (validationRules, requestPropertyName = 'body', options = {}) => {
    return (req, res, next) => {
        const validation = Joi.validate(req[requestPropertyName], validationRules, options);

        if (validation.error) {
            return res.status(422).send({
                success: false,
                error: {
                    message: validation.error.details[0].message
                }
            });
        }

        next();
    };
};
