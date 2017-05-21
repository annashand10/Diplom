const mongoose = require('mongoose')
    , config = require('config')
    , pug = require('pug')
    , sendgrid = require('sendgrid')
    , utils = require('../utils')
    , Schema = mongoose.Schema;

const emailConfirmationPlaintextTemplate = pug.compileFile('views/email/email_confirmation.plaintext.pug')
    , passwordResetEmailPlaintextTemplate = pug.compileFile('views/email/password_reset.plaintext.pug');

//=========================
// Confirmation Schema
//=========================
const ConfirmationSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    /* type: {
        type: String,
        enum: ['email'],
        required: true
    }, */
    action: {
        type: String,
        enum: ['email_confirmation', 'password_reset'],
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    expire_date: {
        type: Date
    }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

ConfirmationSchema.methods.send = function(cb) {
    let helper = sendgrid.mail;
    let fromEmail = new helper.Email('sender@anna.com');
    let toEmail = new helper.Email(this.destination);
    let subject, content;
    switch (this.action) {
        case 'email_confirmation':
            subject = 'E-mail confirmation';
            content = new helper.Content('text/plain', emailConfirmationPlaintextTemplate({
                email_confirmation_url: utils.frontendUrl('confirm/' + this.token)
            }));
            break;
        case 'password_reset':
            subject = 'Password reset';
            content = new helper.Content('text/plain', passwordResetEmailPlaintextTemplate({
                password_reset_url: utils.frontendUrl('reset-password/' + this.token)
            }));
            break;
    }
    let mail = new helper.Mail(fromEmail, subject, toEmail, content);

    let sg = sendgrid(config.get('services.sendgrid.apiKey'));
    let request = sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: mail.toJSON(),
    });

    sg.API(request, cb);
};

module.exports = mongoose.model('Confirmation', ConfirmationSchema);