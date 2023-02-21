const mongoose = require('mongoose');


const ImageSchema = new mongoose.Schema({
    originalName: {
        type: String,
        required: true,
    },
    mimetype: {
        type: String,
        required: true,
    },
    size: {
        type: Number,
        required: true,
    },
    destination: {
        type: String,
        required: true,
    },

    createdBy: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model('Image', ImageSchema);