const mongoose = require('mongoose');

const modelRoom = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    maxPeople: {
        type: Number,
        require: true
    },
    desc: {
        type: String,
        required: true
    },
    roomNumbers: {
        type: Array,
        required: true
    }
}, { versionKey: '_somethingElse' })

module.exports = mongoose.model('Room', modelRoom);