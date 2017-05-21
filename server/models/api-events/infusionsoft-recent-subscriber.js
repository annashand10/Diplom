const mongoose = require('mongoose')
    , randomstring = require('randomstring')
    , utils = require('../../utils')
    , ApiEvent = require('./api-event')
    , User = require('../user');

const InfusionsoftRecentSubscriberSchema = new mongoose.Schema({
    data: {
        first_name: {
            type: String
        },
        second_name: {
            type: String
        }
    }
});

InfusionsoftRecentSubscriberSchema.statics.extractPollingEvents = function(data) {
    const result = {
        first_name: data.FirstName,
        last_name: data.LastName
    };

    return [result];
};

InfusionsoftRecentSubscriberSchema.statics.poll = function(apiConnection) {
    const apiEventModel = discriminator;
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
            const xmlRpcApiClient = new utils.InfusionsoftXmlRpcApi.Client(user.get('services.infusionsoft'), user.refreshInfusionsoftTokens.bind(user));
            return xmlRpcApiClient.Contacts().list({ perPage: 100, page: 0 })
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
        .then(function(results) {
            const promises = results.reduce((accumulator, remoteEvent) => {
                if (!apiConnection.get('last_remote_id') || remoteEvent.Id > apiConnection.get('last_remote_id')) {
                    last_remote_id = last_remote_id ? Math.max(last_remote_id, remoteEvent.Id) : remoteEvent.Id;
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

const discriminator = ApiEvent.discriminator('InfusionsoftRecentSubscriber', InfusionsoftRecentSubscriberSchema);

module.exports = discriminator;
