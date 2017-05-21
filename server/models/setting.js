const mongoose = require('mongoose')
    , Schema = mongoose.Schema;

//=========================
// Setting Schema
//=========================
const SettingSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        index: true
    },
    data: {
        type: Schema.Types.Mixed
    }
});

/**
 * Set settings
 * @param {String} key
 * @param {*} value
 */
SettingSchema.statics.set = function(key, value) {
    return this.findOne({ name: key })
        .then((doc) => {
            if (!doc) {
                doc = new this({ name: key });
            }
            doc.data = value;
            return doc.save();
        });
};

/**
 * Get setting value
 * @param {String} key
 */
SettingSchema.statics.get = function(key) {
    return this.findOne({ name: key }, '-_id data', { lean: true })
        .then((doc) => {
            return doc ? doc.data : doc;
        });
};

/**
 * Get settings values in object
 * @param {String[]} keys
 */
SettingSchema.statics.getObject = function(keys) {
    return this.find({ name: { $in: keys } }, '-_id name data', { lean: true, limit: keys.length })
        .then((docs) => {
            const obj = {};
            docs.forEach(doc => obj[doc.name] = doc.data);
            return obj;
        });
};

/**
 * Unset setting value
 * @param {Stream} key
 */
SettingSchema.statics.unset = function(key) {
    return this.remove({ name: key });
};

module.exports = mongoose.model('Setting', SettingSchema);