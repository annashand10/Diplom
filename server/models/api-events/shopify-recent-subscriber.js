const mongoose = require('mongoose')
    , ApiEvent = require('./api-event');

const ShopifyRecentSubscriberSchema = new mongoose.Schema({
    data: {
        first_name: {
            type: String
        },
        second_name: {
            type: String
        }
    }
});

ShopifyRecentSubscriberSchema.statics.extractWebhookEvents = function(data) {
    const result = {
        first_name: data.first_name,
        last_name: data.last_name
    };

    return [result];
};

module.exports = ApiEvent.discriminator('ShopifyRecentSubscriber', ShopifyRecentSubscriberSchema);

