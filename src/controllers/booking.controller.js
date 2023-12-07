const Guest = require('../models/guest.model');
const Reservation = require('../models/reservation.model');
const httpStatus = require("http-status");

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.getBookings = async (req, res) => {
    try {
        const bookings = await Reservation.find().populate('guest');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

/**
 *
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
exports.createBooking = async (req, res, next) => {
    try {
        const {guestData, reservationData} = req.body;

        // Check if the guest already exists
        let guest = await Guest.findOne({ email: guestData.email });

        if (!guest){
            guest = await Guest.create(guestData);
        }

        const reservation = await Reservation.create({...reservationData, guest: guest._id}); // create reservation

        await Guest.findByIdAndUpdate(guest._id, {$push: {reservations: reservation._id}}, {new: true}) //update the guest reservation field with the new one

        res.status(httpStatus.OK);
        res.json({
            status: true,
            guest,
            reservation
        })
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

exports.updateBooking = async (req,res,next) =>{
    try {
        const booking = await Client.findByIdAndUpdate(req.params.clientId, req.body, {new: true});
        res.status(httpStatus.OK);
        res.json({
            status: true,
            client
        })

    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

