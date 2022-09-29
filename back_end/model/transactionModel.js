const mongoose = require('mongoose');

const modelTransactions = mongoose.Schema(
    {
        _id: {
            type: String,
            required: true
        },
        user_id: {
            type: String,
            ref: 'User',
            required: true
        },
        hotel_id: {
            type: String,
            ref: 'Hotel',
            required: true
        },
        room: {
            type: Array,
            required: true
        },
        dateStart: {
            type: Date,
            required: true
        },
        dateEnd: {
            type: Date,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        payment: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        }
    },
    {
        versionKey: false
    }

)

module.exports = mongoose.model('Transaction', modelTransactions);