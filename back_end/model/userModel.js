const mongoose = require('mongoose');

const modelUser = mongoose.Schema({
    _id: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    fullName: {
        type: String,
        require: true
    },
    phoneNumber: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    isAdmin: {
        type: String,
        require: true
    }
},
    {
        versionKey: false
    }
)

module.exports = mongoose.model('User', modelUser);