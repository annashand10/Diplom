const mongoose = require('mongoose')
    , bcrypt = require('bcrypt-nodejs')
    , request = require('request-promise')
    , config = require('config')
    , randomstring = require('randomstring')
    , Confirmation = require('../models/confirmation')
    , Schema = mongoose.Schema;


const UserRequest = new Schema({
    received_at: {
        type: Date,
        default: Date.now,
        required: true
    },
    ip: String,
    method: String,
    url: String
});

const UserActivitySession = new Schema({
    requests: [UserRequest]
});

//=========================
// User Schema
//=========================
const UserSchema = new Schema({
    role: {
        type: String,
        required: true,
        enum: ['disabled', 'member', 'admin'],
        default: 'member'
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        lowercase: true
    },
    email_confirmed: {
        type: Boolean,
        default: false
    },
    auth_strategy: {
        type: String,
        required: true,
        enum: ['local', 'google']
    },
    password: {
        type: String,
        required: true
    },
    profile: {
        avatar: String,
        first_name: String,
        last_name: String,
        company_name: String
    },
    last_activity_at: Date,
    activity_sessions: [UserActivitySession]
    // reset_password_token: String,
    // reset_password_expires: String
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

UserSchema.methods.can = function(permission) {
    return config.get(`roles.${this.role || 'member'}.permissions`).includes(permission);
};

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) { return cb(err); }

        cb(null, isMatch);
    });
};

UserSchema.methods.sendEmailConfirmation = function(email) {
    let confirmation = new Confirmation({
        user_id: this._id,
        // type: 'email',
        action: 'email_confirmation',
        destination: email ? email : this.email,
        token: randomstring.generate(32)
    });

    return confirmation.save()
        .then(confirmation => confirmation.send())
        .catch(console.error);
};

UserSchema.methods.sendPasswordResetEmail = function(email) {
    let confirmation = new Confirmation({
        user_id: this._id,
        // type: 'email',
        action: 'password_reset',
        destination: email ? email : this.email,
        token: randomstring.generate(32)
    });

    return confirmation.save()
        .then(confirmation => confirmation.send())
        .catch(console.error);
};



module.exports = mongoose.model('User', UserSchema);
