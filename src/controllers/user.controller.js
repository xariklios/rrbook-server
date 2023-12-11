const User = require('../models/user.model');
const httpStatus = require("http-status");
const passport = require('passport');

exports.registerUser = async (req, res, next) => {
    try {
        const {username, email, password} = req.body;

        if (!username || !email || !password) {
            throw new Error("Send all data.")
        }

        const user = await User.create({username, email, password});
        res.json({
            status: true,
            user,
        })
    } catch (error) {
        next(error)
    }
}

exports.loginUser = passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true,
});

exports.logoutUser = async (req, res, next) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
}
