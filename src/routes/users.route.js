const express = require('express');
const router = express.Router();
const userController = require("../controllers/user.controller");
const {isAuthenticated} = require("../middlewares/auth.middleware");

router.route('/login')
    .post(userController.loginUser)

router.route('/register')
    .post(userController.registerUser)

router.route('/logout')
    .post(isAuthenticated,userController.logoutUser)

module.exports = router;
