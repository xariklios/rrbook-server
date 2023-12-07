const mongoose = require('mongoose');

const GuestSchema = new mongoose.Schema({
    fname: {
        type: String,
        trim: true,
        required: [true, 'Please enter guest first name'],
    },
    lname: {
        type: String,
        trim: true,
        required: [true, 'Please enter guest last name'],
    },
    email: {
        type: String,
        trim: true,
        required: false,
        unique: true
    },
    passportId: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    reservations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reservation',
    }],
});

module.exports = mongoose.model('Guest', GuestSchema);
