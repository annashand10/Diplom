const config = require('config')
    , utils = require('../utils')
    , integrations = require('../config/integrations')
    , eventTypes = require('../config/event-types')
    , visitorProperties = require('../config/visitor-properties')
    , roles = require('../config/roles');

config.tracker.server_url = utils.backendUrl('analytic');
config.services.facebook.callbackURL = utils.frontendUrl('login/facebook');
config.services.google.callbackURL = utils.frontendUrl('login/google');
config.services.infusionsoft.callbackURL = utils.frontendUrl('login/infusionsoft');
config.integrations = integrations;
config.eventTypes = eventTypes;
config.visitorProperties = visitorProperties;
config.roles = roles;
