const passport = require('passport');
const JwtStratgey = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local');
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const keys = require('../config/keys');

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: keys.secret
}

const jwtLogin = new JwtStratgey(jwtOptions, (payload, done) => {
    User.findById(payload.sub, (err, user) => {
        if (err) {
            return done(err, false);
        }
        if (user) {
            done(null,user);
        } else {
            done(null,false);
        }
    });
});

const localOptions = {usernameField: 'email'};

const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
    User.findOne({email: email}, (err, user) => {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false);
        }
        user.comparePassword(password, function(err, isMatch) {
            if (err) {
                return done(err);
            }
            if (!isMatch) {
                return done(null, false);
            }
            return done(null, user)
        });
    });
});

passport.use(jwtLogin);
passport.use(localLogin);