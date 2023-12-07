const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/booking.controller');
const {isAuthenticated} = require("../middlewares/auth.middleware");

router.route('/')
    .get(isAuthenticated, bookingController.getBookings)
    .post(isAuthenticated, bookingController.createBooking)

module.exports = router;
