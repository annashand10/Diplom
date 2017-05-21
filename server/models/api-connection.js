const config = require('config')
    , mongoose = require('mongoose')
    , randomstring = require('randomstring')
    , Schema = mongoose.Schema;

const pollingSessions = [];

//=========================
// ApiConnection Schema
//=========================
const ApiConnectionSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    event_type: {
        type: String,
        required: true,
        enum: ['recent_subscriber', 'recent_purchase']
    },
    integration_type: {
        type: String,
        required: true,
        enum: ['shopify', 'infusionsoft']
    },
    delivery: {
        method: {
            type: String,
            required: true,
            enum: ['polling', 'webhook']
        },
        settings: {
            polling: {
                token: String,
                url: String,
                interval: Number
            },
            webhook: {
                token: String
            }
        }
    },
    last_remote_id: String,
    last_polled_at: Date
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

ApiConnectionSchema.pre('save', function (next) {
    if (this.isNew && this.get('delivery.method') == 'webhook') {
        this.delivery.settings.webhook.token = randomstring.generate(32);
    }
    if (this.isModified('delivery')) {
        this.endPollingSession();
    }
    next();
});

ApiConnectionSchema.post('remove', (apiConnection) => {
    apiConnection.endPollingSession();
});

ApiConnectionSchema.post('save', function(apiConnection) {
    if (apiConnection.get('delivery.method') === 'polling') {
        apiConnection.startPollingSession();
    }
});

ApiConnectionSchema.statics.getPollingSessions = () => pollingSessions;
ApiConnectionSchema.statics.getPollingSessionById = function(pollingSessionId) {
    return pollingSessions
        .find(pollingSession => pollingSession.id === pollingSessionId);
};
ApiConnectionSchema.statics.getPollingSessionByApiConnectionId = function(apiConnectionId) {
    return pollingSessions
        .find(pollingSession => pollingSession.apiConnection.get('_id').toString() === apiConnectionId);
};

ApiConnectionSchema.methods.startPollingSession = function() {
    const apiConnection = this;
    if (apiConnection.delivery.method != 'polling') return false;
    let pollingSession = ApiConnectionSchema.statics.getPollingSessionByApiConnectionId(apiConnection.get('_id').toString());
    if (pollingSession) return false;

    pollingSession = {
        id: randomstring.generate(32),
        apiConnection
    };
    pollingSessions.push(pollingSession);

    console.log(`Started a new polling session (id: ${pollingSession.id}, API connection id: ${pollingSession.apiConnection.get('id')})`);

    const pollWithTimeout = (pollingSession) => {
        if (!pollingSessions.includes(pollingSession)) return;
        let timeout;
        if (!pollingSession.apiConnection.last_polled_at) {
            timeout = 0;
        } else {
            timeout = Math.max(
                pollingSession.apiConnection.get('delivery.settings.polling.interval') -
                (Date.now() - pollingSession.apiConnection.get('last_polled_at'))
            , 0);
        }
        pollingSession.timeout = setTimeout(() => {
            console.log(`Polling (session id: ${pollingSession.id}, API connection id: ${pollingSession.apiConnection.get('id')})`);
            pollingSession.apiConnection.poll()
                .then(() => {
                    pollingSession.apiConnection.set('last_polled_at', new Date());
                    return pollingSession.apiConnection.save();
                })
                .then(() => {
                    pollWithTimeout(pollingSession);
                });
        }, timeout);
    };
    pollWithTimeout(pollingSession);
};

ApiConnectionSchema.methods.endPollingSession = function() {
    const apiConnection = this;
    const pollingSession = ApiConnectionSchema.statics.getPollingSessionByApiConnectionId(apiConnection.get('_id').toString());
    if (!pollingSession) return false;
    clearTimeout(pollingSession.timeout);
    pollingSessions.splice(pollingSessions.indexOf(pollingSession), 1);
    console.log(`Ended the polling session (id: ${pollingSession.id}, API connection id: ${pollingSession.apiConnection.get('id')})`);
};

ApiConnectionSchema.methods.poll = function() {
    const apiConnection = this;

    if (apiConnection.get('delivery.method') !== 'polling') return false;

    const integration = config.get('integrations')[apiConnection.get('integration_type')];
    if (!integration) {
        return Promise.resolve(new Error(`Integration '${apiConnection.get('integration_type')}' doesn't exist!`));
    }
    const apiEvent = integration.apiEvents[apiConnection.get('event_type')];
    if (!apiEvent) {
        return Promise.resolve(new Error(`Event type '${apiConnection.get('event_type')}' is not supported by '${apiConnection.get('integration_type')}' integration!`));
    }
    if (!apiEvent.deliveryMethods.includes('polling')) {
        return Promise.resolve(new Error(`Delivery method 'polling' is not supported by event type '${apiConnection.get('event_type')}' of '${apiConnection.get('integration_type')}' integration!`));
    }
    return apiEvent.model.poll(apiConnection)
        .catch((error) => {
            console.error(error.message);
        });
};

module.exports = mongoose.model('ApiConnection', ApiConnectionSchema, 'api_connections');