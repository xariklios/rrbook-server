const express = require('express');
const httpStatus = require("http-status");

const guestRoutes = require('./guests.route')
const bookingRoutes = require('./bookings.route');
const userRoutes = require('./users.route');
const {isAuthenticated} = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/status', (req, res) => res.send({
    status: httpStatus.OK
}));

router.use('/', userRoutes);

router.use('/api/guest', guestRoutes);
// router.use('/api/reservation', reservationRoutes);
router.use('/api/booking', bookingRoutes);

module.exports = router;
