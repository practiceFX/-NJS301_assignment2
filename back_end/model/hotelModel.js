const mongoose = require('mongoose');

const modelHotel = mongoose.Schema({
    _id: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    type: {
        type: String,
        require: true
    },
    city: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    distance: {
        type: Number,
        require: true
    },
    photos: {
        type: Array,
        require: true
    },
    desc: {
        type: String,
        require: true
    },
    rating: {
        type: Number,
        require: true
    },
    featured: {
        type: String,
        require: true
    },
    rooms: {
        type: Array,
        require: true
    }
})

module.exports = mongoose.model('Hotel', modelHotel);