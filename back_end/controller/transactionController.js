const mongoose = require('mongoose');
const transactionModel = require('../model/transactionModel');

exports.tranListController = (req, res, next) => {
    const user_id = req.query.user_id;
    transactionModel.find({ 'user_id': user_id }).populate('user_id').populate('hotel_id').then(respon => {
        res.send(respon);
    });

}

exports.allTranListController = (req, res, next) => {
    transactionModel.find({}).populate('user_id').populate('hotel_id').sort({ '_id': -1 }).limit(8).then(respon => {
        res.send(respon);
    })
}

exports.tranAddController = (req, res, next) => {
    let newTransaction = new transactionModel({
        _id: String(new mongoose.Types.ObjectId()),
        user_id: req.body.dataBooked.user_id,
        hotel_id: req.body.dataBooked.hotel_id,
        room: req.body.dataBooked.room,
        dateStart: req.body.dataBooked.dateStart,
        dateEnd: req.body.dataBooked.endStart,
        price: parseInt(req.body.dataBooked.price),
        payment: req.body.dataBooked.payment,
        status: req.body.dataBooked.status
    })
    newTransaction.save((err) => {
        if (!err) {
            console.log('SUCESSFULL !!!');
        } else {
            console.log('Something is wrong: ' + err);
        }
    });
    res.redirect('http://localhost:3333/')
}