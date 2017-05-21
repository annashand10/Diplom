const mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , utils = require('../../utils');

const ApiEventSchema = new Schema({
    api_connection_id: {
        type: Schema.Types.ObjectId,
        ref: 'ApiConnection',
        required: true
    },
    delivery_method: {
        type: String,
        required: true,
        enum: ['polling', 'webhook']
    },
    origin: {
        type: String
    },
    data: {
        type: Object,
        required: true
    },
    group: {
        type: String,
        required: true
    }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

ApiEventSchema.methods.testQuery = function(query) {
    return utils.testQuery(this.data, query);
};

module.exports = mongoose.model('ApiEvent', ApiEventSchema, 'api_events');
