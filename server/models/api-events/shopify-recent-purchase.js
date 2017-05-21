const mongoose = require('mongoose')
    , ApiEvent = require('./api-event');

const ShopifyRecentPurchaseSchema = new mongoose.Schema({
    data: {
        product_id: {
            type: String,
            required: true
        },
        product_name: {
            type: String,
            required: true
        },
        first_name: {
            type: String,
            required: true
        }
    }
});

ShopifyRecentPurchaseSchema.statics.extractWebhookEvents = function(data) {
    return data.line_items.map((item) => {
        let eventData =  {
            product_id: String(item.id),
            product_name: item.title,
        };

        if (data.customer && data.customer.first_name) {
            eventData.first_name = data.customer.first_name;
        } else if (data.billing_address && data.billing_address.first_name) {
            eventData.first_name = data.billing_address.first_name;
        } else if (data.shipping_address && data.shipping_address.first_name) {
            eventData.first_name = data.shipping_address.first_name;
        }

        return eventData;
    });
};

module.exports = ApiEvent.discriminator('ShopifyRecentPurchase', ShopifyRecentPurchaseSchema);

