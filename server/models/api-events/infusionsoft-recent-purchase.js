const mongoose = require('mongoose')
    , randomstring = require('randomstring')
    , ApiEvent = require('./api-event')
    , User = require('../user')
    , utils = require('../../utils');

const InfusionsoftRecentPurchaseSchema = new mongoose.Schema({
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
        },
        last_name: {
            type: String,
            required: true
        }
    }
});

InfusionsoftRecentPurchaseSchema.statics.extractPollingEvents = function(data) {
    return data.order_items.map((item) => {
        return {
            product_id: String(item.id),
            product_name: item.name,
            first_name: data.contact.first_name,
            last_name: data.contact.last_name,
        };
    });
};

InfusionsoftRecentPurchaseSchema.statics.poll = function(apiConnection) {
    const apiEventModel = this;
    const apiEventData = {
        api_connection_id: apiConnection._id,
        delivery_method: 'polling'
    };
    let last_remote_id = apiConnection.get('last_remote_id');

    return User
        .findOne({ _id: apiConnection.get('user_id') })
        .then((user) => {
            if (!user.get('infusionsoft_connected')) {
                throw new Error(`Can\'t poll because the infusionsoft was disconnected from the account (API connection id: ${apiConnection.get('id')}, user id: ${user.get('id')})`);
            }
            const restApiClient = new utils.InfusionsoftRestApi.Client(user.get('services.infusionsoft'), user.refreshInfusionsoftTokens.bind(user));
            return restApiClient.Orders().list({ since: apiConnection.get('last_polled_at') })
            // TODO: get rid of the code duplication
                .catch((error) => {
                    user.set('infusionsoft_connected', false);
                    return user.save()
                        .then(() => {
                            if (error.error.error === 'invalid_grant') {
                                error = new Error(`refreshInfusionsoftTokens: ${error.error.error_description}. User ID: ${user.get('id')}. 'infusionsoft_connected' flag was set to false.`);
                            } else if (error.statusCode === 401) {
                                error = new Error(`Infusionsoft REST API: ${error.message}. Possibly invalid access token. User ID: ${user.get('id')}. 'infusionsoft_connected' flag was set to false.`);
                            } else {
                                error = new Error(`${error}. User ID: ${user.get('id')}. 'infusionsoft_connected' flag was set to false.`);
                            }

                            throw error;
                        });
                });
        })
        .then((result) => {
            const promises = result.orders.reduce((accumulator, remoteEvent) => {
                if (!apiConnection.get('last_remote_id') || remoteEvent.id > apiConnection.get('last_remote_id')) {
                    last_remote_id = last_remote_id ? Math.max(last_remote_id, remoteEvent.id) : remoteEvent.id;
                    const group = randomstring.generate(64);
                    const arrayOfPromises = apiEventModel.extractPollingEvents(remoteEvent).map((event) => {
                        let newApiEvent = new apiEventModel(Object.assign({}, apiEventData, { data: event }, { group }));
                        return newApiEvent.save();
                    });
                    accumulator.push(...arrayOfPromises);
                }
                return accumulator;
            }, []);
            return Promise.all(promises);
        })
        .then(() => {
            apiConnection.set('last_remote_id', last_remote_id);
            return apiConnection.save();
        });
};

const discriminator = ApiEvent.discriminator('InfusionsoftRecentPurchase', InfusionsoftRecentPurchaseSchema);

module.exports = discriminator;

