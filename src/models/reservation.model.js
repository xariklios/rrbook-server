const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
    checkInDate: {
        type: Date,
        required: true,
    },
    checkOutDate: {
        type: Date,
        required: true,
    },
    roomNumber: {
        type: Number,
        required: true,
    },
    guestsNumber: {
        type: Number,
        required: true,
    },
    amount: {
        type: Number,
        required: false,
    },
    notes: {
        type: String
    },
    guest: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Guest',
    },
})

module.exports = mongoose.model('Reservation', ReservationSchema);

