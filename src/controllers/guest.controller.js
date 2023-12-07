const Guest = require('../models/guest.model');
const Reservation = require('../models/reservation.model');
const httpStatus = require("http-status");

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.getGuests = async (req, res) => {
    try {
        const guests = await Guest.find().populate('reservations');
        res.json(guests);
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
exports.getGuest = async (req, res, next) => {
    try {
        const guest = await Guest.findById(req.params.guestId).populate('reservations');
        res.status(httpStatus.OK);
        res.json({
            status: true,
            guest
        })
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

/**
 *
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
exports.updateGuest = async (req, res, next) => {
    try {
        const guest = await Guest.findByIdAndUpdate(req.params.guestId, req.body, {new: true});
        res.status(httpStatus.OK);
        res.json({
            status: true,
            guest
        })

    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

/**
 *
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
exports.deleteGuest = async (req, res, next) => {
    try {
        const { guestId } = req.params;
        const guest = await Guest.findById(guestId);

        if (!guest) {
            return res.status(404).json({ error: 'Guest not found' });
        }

        // Delete all reservations associated with the guest
        await Reservation.deleteMany({ guest: guestId });

        // Delete the guest
        await Guest.findByIdAndDelete(guestId);
        res.status(httpStatus.OK);
        res.json({
            status: true
        })
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
