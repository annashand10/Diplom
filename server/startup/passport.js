const config = require('config')
    , randomstring = require('randomstring')
    , passport = require('passport')
    , JwtStrategy = require('passport-jwt').Strategy
    , FacebookStrategy = require('passport-facebook').Strategy
    , InfusionsoftStrategy = require('passport-infusionsoft').Strategy
    , GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
    , ExtractJwt = require('passport-jwt').ExtractJwt
    , LocalStrategy = require('passport-local')
    , User = require('../models/user')
    , utils = require('../utils');

const strategyOptions = {
    jwt: {
        jwtFromRequest: ExtractJwt.fromAuthHeader(),
        secretOrKey: config.get('secret')
    }
};

// Setting up local login strategy
const localLogin = new LocalStrategy((username, password, done) => {

    let authCriteria = username.includes('@') ? 'email' : 'username';
    const condition = {
        [authCriteria]: username.toLowerCase(),
        auth_strategy: 'local'
    };

    if (authCriteria == 'email') {
        condition.email_confirmed = true;
    }

    User.findOne(condition)
        .then((user) => {
            if (!user) { return done(null, false, { error: { message: `Incorrect ${authCriteria} or password.` } }); }

            user.comparePassword(password, (err, isMatch) => {
                if (err) { return done(err); }
                if (!isMatch) { return done(null, false, { error: { message: `Incorrect ${authCriteria} or password.` } }); }
                return done(null, user);
            });
        })
        .catch(done);
});

// Setting up JWT login strategy
const jwtLogin = new JwtStrategy(strategyOptions.jwt, (payload, done) => {
    User.findById(payload._id)
        .then((user) => {
            done(null, user ? user : false);
        })
        .catch(done);
});

// Google login strategy
const googleLogin = new GoogleStrategy(config.get('services.google'), (accessToken, refreshToken, profile, done) => {
    User.findOne({ 'services.google.id': profile.id, auth_strategy: 'google' })
        .then((user) => {
            if (user) return user;
            user = new User({
                username: `gl.${profile.id}`,
                email: profile.emails[0].value,
                auth_strategy: 'google',
                password: randomstring.generate(16),
                profile: {
                    avatar: utils.modifyUrlQuery(profile.photos[0].value, { sz: config.get('upload.avatar.size') }),
                    first_name: profile.name.givenName,
                    last_name: profile.name.familyName
                },
                services: {
                    google: {
                        id: profile.id
                    }
                },
                email_confirmed: true
            });
            return user.save();
        })
        .then((user) => {
            user.services.google.access_token = accessToken;
            return user.save();
        })
        .then((user) => {
            done(null, user);
        })
        .catch(done);
});

// Facebook login strategy
const facebookLogin = new FacebookStrategy(config.get('services.facebook'), (accessToken, refreshToken, profile, done) => {
    User.findOne({ 'services.facebook.id': profile.id, auth_strategy: 'facebook' })
        .then((user) => {
            if (user) return user;
            let avatarSize = config.get('upload.avatar.size');
            user = new User({
                username: `fb.${profile.id}`,
                auth_strategy: 'facebook',
                email: profile.emails[0].value,
                password: randomstring.generate(16),
                profile: {
                    avatar: `https://graph.facebook.com/${profile.id}/picture?width=${avatarSize}&height=${avatarSize}`,
                    first_name: profile.name.givenName,
                    last_name: profile.name.familyName
                },
                services: {
                    facebook: {
                        id: profile.id
                    }
                },
                email_confirmed: true
            });
            return user.save();
        })
        .then((user) => {
            user.services.facebook.access_token = accessToken;
            return user.save();
        })
        .then((user) => {
            done(null, user);
        })
        .catch(done);
});

const infusionsoftLogin = new InfusionsoftStrategy(config.get('services.infusionsoft'), (req, accessToken, refreshToken, profile, done) => {
    req.user.set('services.infusionsoft', {
        accessToken: accessToken,
        refreshToken: refreshToken
    });
    req.user.save()
        .then((user) => {
            done(null, user);
        })
        .catch(done);
});

passport.use(jwtLogin);
passport.use(localLogin);
passport.use(googleLogin);
passport.use(facebookLogin);
passport.use(infusionsoftLogin);
