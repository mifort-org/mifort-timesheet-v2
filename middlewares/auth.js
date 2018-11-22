'use strict';

const Passport = require('passport-jwt');
const passport = require('koa-passport');
const _isEmpty = require('lodash/isEmpty');

const { User } = require('../data/models');
const config = require('../config');

const JwtStrategy = Passport.Strategy;
const ExtractJwt = Passport.ExtractJwt;

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.get('jwt:secret')
};

passport.use(
    new JwtStrategy(jwtOptions, async (payload, done) => {
        try {
            const user = await User.findById(payload.id);
            if (_isEmpty(user) || user.accessTokenSalt !== payload.salt) {
                return done(null, null);
            }

            done(null, user);
        } catch (e) {
            done(e, null);
        }
    })
);

module.exports = passport.authenticate('jwt', { session: false });
