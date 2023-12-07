const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user.model');
const bcrypt = require('bcrypt');

// Passport Local Strategy
passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {

            const user = await User.findOne({
                $or: [{email: username}, {username: username}],
            });

            if (!user) {
                return done(null, false, {message: 'Incorrect username.'});
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                return done(null, false, {message: 'Incorrect password.'});
            }

            return done(null, user);
        } catch (error) {
            return done(error);
        }
    })
);

// Serialize and deserialize user for session management
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});

module.exports = passport;
