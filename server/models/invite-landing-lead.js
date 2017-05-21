const mongoose = require('mongoose')
    , config = require('config')
    , Schema = mongoose.Schema;

//=========================
// Invite Landing Lead Schema
//=========================
const InviteLandingLeadSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    invite_token: {
        type: String,
        required: true
    },
    invited_ips: {
        type: Array,
        default: []
    },
    allow_registration: {
        type: Boolean,
        default: false
    },
    contact_id: Number
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

InviteLandingLeadSchema.pre('save', function(next) {
    const lead = this;

    const addInfusionsoftContact = (fields) => {
        return new Promise((resolve, reject) => {
            infusionsoftClient.addCon(fields, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    };

    const optInInfusionsoftEmail = (email, reason) => {
        return new Promise((resolve, reject) => {
            infusionsoftClient.optIn(email, reason, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        })
    };

    const assignInfusionsoftGroup = (contactId, groupId) => {
        return new Promise((resolve, reject) => {
            infusionsoftClient.grpAssign(contactId, groupId, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    };


    const syncInfusionsoft = () => {
        if (lead.isNew) {
            return addInfusionsoftContact({
                Email: lead.email
            })
                .then((contactId) => {
                    lead.set('infusionsoft_contact_id', contactId);
                    return assignInfusionsoftGroup(contactId, config.get('landings.invite.infusionsoftLeadDefaultGroupId'));
                })
                .then(() => {
                    return optInInfusionsoftEmail(lead.email, 'Invite landing lead');
                });
        } else {
            if (!lead.goal_reached && lead.invited_ips.length >= config.get('landings.invite.invitesRequired')) {
                lead.set({
                    goal_reached: true,
                    allow_registration: !!config.get('landings.invite.allowRegistrationOnGoalReach')
                });
                return assignInfusionsoftGroup(lead.get('infusionsoft_contact_id'), config.get('landings.invite.infusionsoftLeadGoalReachedGroupId'));
            }
        }

        return Promise.resolve();
    };

    syncInfusionsoft()
        .then(() => {
            next();
        });
});

module.exports = mongoose.model('InviteLandingLead', InviteLandingLeadSchema, 'invite_landing_lead');
