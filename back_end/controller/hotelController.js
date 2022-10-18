const hotelModel = require('../model/hotelModel');
const roomModel = require('../model/roomModel');
const transactionModel = require('../model/transactionModel');
const mongoose = require('mongoose');

const { handleAmount } = require('../util/search');


exports.cityController = (req, res, next) => {
    let cityName = ['Hà Nội', 'Hồ Chí Minh', 'Đà Nẵng']
    hotelModel.find({
        city: { $in: cityName }
    }).then(respon => {
        let city = respon;
        let dataTopCity = [];

        //filter name of city by name key
        for (let i = 0; i < cityName.length; i++) {
            let topCity = city.filter((item) => {
                if (item.city == cityName[i]) {
                    return item
                }
            })
            dataTopCity.push({
                name: cityName[i],
                amount: topCity.length
            })
        }

        res.send(dataTopCity);
    })
}



exports.topRateHotelController = async (req, res, next) => {
    let topHomeList = [];
    let hotelList = await hotelModel.find().sort({ rating: -1 }).limit(4);
    for (let i = 0; i < hotelList.length; i++) {
        let roomType = hotelList[i]?.rooms;
        let price = await roomModel.find({ title: { $in: roomType } }, { price: 1, _id: 0 })
        let minPrice = price.sort()[0];
        topHomeList.push({
            dataHotel: hotelList[i],
            minPrice: minPrice
        })
    }
    res.send(topHomeList);
}




exports.hotelListController = (req, res, next) => {
    hotelModel.find().then(respon => {
        res.send(respon)
    })
}




exports.seachInfoHotelController = (req, res, next) => {
    let locationCity = req.body.city;
    let dateStart = req.body.dateStart;
    let dateEnd = req.body.dateEnd;
    let amount = req.body.amount;
    let amountArray = handleAmount(amount);
    amountPeople = amountArray[0] + amountArray[1];
    amountRooms = amountArray[2];
    transactionModel.find({
        maxPeople: { $lt: amountPeople },
        city: locationCity,
        roomNumbers: { $gt: amountRooms },
        $or: [
            { dateStart: { $gt: dateEnd } },
            { dateEnd: { $lt: dateStart } }
        ]
    }).populate('Room').populate('Hotel').then(respon => {
        res.send(respon);
    })
}


exports.inforDetailHotelController = async (req, res, next) => {
    let idHotel = req.params.id;
    let infoHotel = await hotelModel.find({ _id: idHotel });
    res.send(infoHotel)
}





exports.addHotelController = (req, res, next) => {
    let newHotel = new hotelModel({
        _id: String(new mongoose.Types.ObjectId),
        name: req.body.dataHotel.name,
        type: req.body.dataHotel.type,
        city: req.body.dataHotel.city,
        address: req.body.dataHotel.address,
        distance: req.body.dataHotel.distance,
        photos: req.body.dataHotel.photos,
        desc: req.body.dataHotel.desc,
        rating: '',
        feating: req.body.dataHotel.feating,
        rooms: req.body.dataHotel.rooms
    })
    newHotel.save((err) => {
        if (!err) {
            console.log('SUCESSFULL !!!')
        } else {
            console.log('Something is wrong: ' + err);
        }
    })
}



exports.updateHotelController = (req, res, next) => {
    const id = req.body.dataUpdate._id;
    hotelModel.findOne({ '_id': id }).then(respon => {
        respon.name = req.body.dataUpdate.name;
        respon.type = req.body.dataUpdate.type;
        respon.city = req.body.dataUpdate.city;
        respon.address = req.body.dataUpdate.address;
        respon.distance = req.body.dataUpdate.distance;
        respon.photos = req.body.dataUpdate.photos;
        respon.desc = req.body.dataUpdate.desc;
        respon.rating = req.body.dataUpdate.rating;
        respon.feating = req.body.dataUpdate.feating;
        respon.rooms = req.body.dataUpdate.rooms;
        return respon.save();
    }).then(results => {
        console.log('UPDATE SUCESSFULL !!!');
        res.redirect('');
    })
}


exports.updateRoomHotelController = (req, res, next) => {
    let idHotel = req.body.dataUpdate._id;
    let rooms = req.body.dataUpdate.rooms;

    hotelModel.findOne({ '_id': idHotel }).then(respon => {
        respon.rooms = [...respon.rooms, rooms];
        return respon.save()
    }).then(
        console.log('ADD ROOMS SUCESSFULL !!!')
    ).catch((err) => {
        console.log('Something is wrong:' + err);
    })
}


exports.deleteHotelController = (req, res, next) => {
    let id = req.body.idHotel;
    hotelModel.deleteOne({ '_id': id }, (err) => {
        !err ? console.log('SUCESSFUL !!!') : console.log('Something is wrong: ' + err)
    })
}