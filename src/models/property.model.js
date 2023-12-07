const mongoose = require('mongoose')

const PropertySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        require: true,
        unique: true,
    },
    logo: {
        type: String,
    },
    status: {
        type: Boolean,
        default: true,
    },
})

module.exports = mongoose.model('Property', PropertySchema);
