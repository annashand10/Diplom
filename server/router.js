const express = require('express');

// AuthenticationController = require('./controllers/authentication')
//     , CurrentUserController = require('./controllers/current-user')
//     , CampaignController = require('./controllers/campaign')
//     , DomainController = require('./controllers/domain')
//     , ApiConnectionController = require('./controllers/api-connection')
//     , AnalyticController = require('./controllers/analytic')
//     , PopupController = require('./controllers/popup')
//     , ConfigurationController = require('./controllers/configuration')
//     , UserController = require('./controllers/user')
//     , SettingController = require('./controllers/settings')
//     , inviteLandingController = require('./controllers/invite-landing-lead')
//     , uploadPopupImage = require('./middleware/upload-popup-image')
//     , uploadAvatar = require('./middleware/upload-avatar')
//     , replaceIp = require('./middleware/replace-ip')
//     , requireAuth = require('./middleware/require-auth')
//     , requirePermissions = require('./middleware/require-permissions')
//     , validateRequest = require('./middleware/validate-request')
//     , Setting = require('./models/setting')
//     , apiResponse = require('./utils').apiResponse

module.exports = (app) => {
    // Initializing route groups
    const mainRoutes = express.Router()
        , currentUserRoutes = express.Router()
        , authRoutes = express.Router()
        , campaignRoutes = express.Router()
        , apiConnectionRoutes = express.Router()
        , domainRoutes = express.Router()
        , userRoutes = express.Router()
        , analyticRoutes = express.Router()
        , popupRoutes = express.Router()
        , configurationRoutes = express.Router()
        , inviteLandingLeadRoutes = express.Router()
        , settingRoutes = express.Router();

    // Replace the local IP address to make the geoip lookup work when request came from the local host
    // app.use(replaceIp);

    //=========================
    // Main Routes
    //=========================
    app.use('/', mainRoutes);
    // mainRoutes.get('/url_go', AnalyticController.redirect);
    //
    // //=========================
    // // Invite Landing Routes
    // //=========================
    // inviteLandingLeadRoutes.use((req, res, next) => {
    //     return Setting.get('leadSource')
    //         .then((leadSource) => {
    //             if (leadSource !== 'invite-landing') {
    //                 throw new apiResponse.ErrorResponse(423, 'Resource locked');
    //             }
    //             next();
    //         })
    //         .catch(next);
    // });
    // mainRoutes.use('/invite-landing-lead', inviteLandingLeadRoutes);
    //
    // inviteLandingLeadRoutes.post('/',
    //     validateRequest(config.get('validation.inviteLandingLead.create')),
    //     inviteLandingController.create);
    // inviteLandingLeadRoutes.get('/', requireAuth,
    //     requirePermissions('viewInviteLandingLeads'),
    //     inviteLandingController.index);
    // inviteLandingLeadRoutes.post('/:leadId/registration', requireAuth,
    //     requirePermissions('toggleInviteLandingLeadsRegistration'),
    //     inviteLandingController.toggleRegistration);
    // inviteLandingLeadRoutes.post('/ref/:inviteToken', inviteLandingController.referral);
    //
    // //=========================
    // // Current User Routes
    // //=========================
    // mainRoutes.use('/me', currentUserRoutes);
    //
    // currentUserRoutes.get('/', requireAuth, CurrentUserController.view);
    // currentUserRoutes.post('/', requireAuth, CurrentUserController.edit);
    // currentUserRoutes.post('/avatar', requireAuth, uploadAvatar, CurrentUserController.uploadAvatar);
    // currentUserRoutes.post('/password', requireAuth, CurrentUserController.updatePassword);
    // currentUserRoutes.post('/email', requireAuth, CurrentUserController.updateEmail);
    //
    // //=========================
    // // Campaign Routes
    // //=========================
    // mainRoutes.use('/campaign', campaignRoutes);
    //
    // campaignRoutes.get('/', requireAuth, CampaignController.index);
    // campaignRoutes.get('/:campaignId', requireAuth, CampaignController.view);
    // campaignRoutes.post('/', requireAuth,
    //     validateRequest(config.get('validation.campaign.create'), 'body', { allowUnknown: true }),
    //     CampaignController.updateOrCreate);
    // campaignRoutes.post('/popup-image', requireAuth, uploadPopupImage, CampaignController.uploadPopupImage);
    // campaignRoutes.post('/:campaignId', requireAuth,
    //     validateRequest(config.get('validation.campaign.edit'), 'body', { allowUnknown: true }),
    //     CampaignController.updateOrCreate);
    // campaignRoutes.delete('/:campaignId', requireAuth, CampaignController.delete);
    // campaignRoutes.get('/:campaignId/stats',
    //     requireAuth,
    //     validateRequest(config.get('validation.campaign.stats'), 'query'),
    //     CampaignController.stats);
    //
    // //=========================
    // // Domain Routes
    // //=========================
    // mainRoutes.use('/domain', domainRoutes);
    //
    // domainRoutes.get('/', requireAuth, DomainController.index);
    // domainRoutes.post('/', requireAuth, DomainController.create);
    // domainRoutes.get('/:domainId', requireAuth, DomainController.view);
    // domainRoutes.delete('/:domainId', requireAuth, DomainController.delete);
    // domainRoutes.post('/:domainId/verify', requireAuth, DomainController.verify);
    //
    // //=========================
    // // User Routes
    // //=========================
    // mainRoutes.use('/user', userRoutes);
    //
    // userRoutes.get('/', requireAuth, requirePermissions('viewOthers'), UserController.index);
    // userRoutes.post('/', requireAuth, requirePermissions('createOthers'), UserController.updateOrCreate);
    // userRoutes.get('/:userId', requireAuth, requirePermissions('viewOthers'), UserController.view);
    // userRoutes.post('/:userId', requireAuth, requirePermissions('editOthers'), UserController.updateOrCreate);
    //
    // //=========================
    // // Setting Routes
    // //=========================
    // mainRoutes.use('/settings', settingRoutes);
    //
    // settingRoutes.get('/', SettingController.index);
    // settingRoutes.post('/', SettingController.update);
    //
    // //=========================
    // // Auth Routes
    // //=========================
    // mainRoutes.use('/auth', authRoutes);
    //
    // authRoutes.post('/login',
    //     validateRequest(config.get('validation.auth.login')),
    //     AuthenticationController.login);
    // authRoutes.post('/register',
    //     validateRequest(config.get('validation.auth.register'), 'body', { allowUnknown: true }),
    //     AuthenticationController.register);
    // authRoutes.post('/confirm-email/:token',
    //     //validateRequest(config.get('validation.auth.confirmEmail')),
    //     AuthenticationController.confirmEmail);
    // authRoutes.post('/reset-password/:token',
    //     validateRequest(config.get('validation.auth.resetPassword')),
    //     AuthenticationController.resetPassword);
    // authRoutes.post('/send-password-reset',
    //     validateRequest(config.get('validation.auth.sendPasswordReset')),
    //     AuthenticationController.sendPasswordReset);
    //
    // /*
    // // Facebook auth
    // authRoutes.get('/facebook', AuthenticationController.facebookLogin);
    // authRoutes.get('/facebook/callback', AuthenticationController.facebookCallback);
    //
    // // Google auth
    // authRoutes.get('/google', AuthenticationController.googleLogin);
    // authRoutes.get('/google/callback', AuthenticationController.googleCallback);
    // */
    //
    // // Infusionsoft auth
    // authRoutes.get('/infusionsoft', AuthenticationController.infusionsoftLogin);
    // authRoutes.get('/infusionsoft/callback', requireAuth, AuthenticationController.infusionsoftCallback);
    //
    // //=========================
    // // Analytic Routes
    // //=========================
    // mainRoutes.use('/analytic', analyticRoutes);
    //
    // analyticRoutes.get('/', AnalyticController.index, validateRequest(config.get('validation.analytic.index'), 'query', { allowUnknown: true }));
    //
    // //=========================
    // // Api Connection Routes
    // //=========================
    // mainRoutes.use('/api-connection', apiConnectionRoutes);
    //
    // apiConnectionRoutes.get('/', requireAuth, ApiConnectionController.index);
    // apiConnectionRoutes.post('/', requireAuth,
    //     validateRequest(config.get('validation.apiConnection.create')),
    //     ApiConnectionController.updateOrCreate);
    // apiConnectionRoutes.get('/:apiConnectionId', requireAuth, ApiConnectionController.view);
    // apiConnectionRoutes.post('/:apiConnectionId', requireAuth,
    //     validateRequest(config.get('validation.apiConnection.edit'), 'body', { allowUnknown: true }),
    //     ApiConnectionController.updateOrCreate);
    // apiConnectionRoutes.delete('/:apiConnectionId', requireAuth, ApiConnectionController.delete);
    //
    // //=========================
    // // Popup Routes
    // //=========================
    // mainRoutes.use('/popup', popupRoutes);
    //
    // popupRoutes.post('/', requireAuth, PopupController.setPopupSettings);
    // popupRoutes.get('/test', requireAuth, PopupController.test);
    //
    // //=========================
    // // Configuration Routes
    // //=========================
    // mainRoutes.use('/config', configurationRoutes);
    //
    // configurationRoutes.get('/roles', requireAuth, requirePermissions('viewRolesConfig'), ConfigurationController.roles);
    // configurationRoutes.get('/settings', requireAuth, requirePermissions('viewSettingsConfig'), ConfigurationController.settings);
    // configurationRoutes.get('/event-types', requireAuth, ConfigurationController.eventTypes);
    // configurationRoutes.get('/integrations', requireAuth, ConfigurationController.integrations);
    // configurationRoutes.get('/visitor-properties', requireAuth, ConfigurationController.visitorProperties);
    //
    // // Webhooks
    // mainRoutes.post('/hook/:webhookToken', ApiConnectionController.webhook);
};
