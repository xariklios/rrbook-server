const express = require('express');
const router = express.Router();
const guestController = require('../controllers/guest.controller');
const {isAuthenticated} = require("../middlewares/auth.middleware");

router.route('/')
    .get(isAuthenticated,guestController.getGuests)
    // .post(guestController.createGuest)

router.route('/:guestId')
    .get(isAuthenticated,guestController.getGuest)
    .put(isAuthenticated,guestController.updateGuest)
    .delete(isAuthenticated,guestController.deleteGuest)

module.exports = router;
