const hotelModel = require('../model/hotelModel');
const roomModel = require('../model/roomModel');
const transactionModel = require('../model/transactionModel');
const mongoose = require('mongoose');



exports.roomTypeController = (req, res, next) => {
    roomModel.find().limit(6).then().then(respon => {
        let room = respon;
        let roomType = room.map(item => { return item.title })
        let dataRoomType = [];
        //filter type of room by tilte key
        for (let i = 0; i <= roomType.length; i++) {
            let infoRoomItem = room.filter((item) => {
                if (item.title == roomType[i]) {
                    return item
                }
            })
            infoRoomItem[0] != undefined ? (dataRoomType.push({
                name: infoRoomItem[0].title,
                amount: infoRoomItem[0]?.roomNumbers.length
            })) : ''
        }

        res.send(dataRoomType);
    })
}





exports.roomListController = (req, res, next) => {
    roomModel.find().then(respon => {
        res.send(respon)
    })
}





exports.addRoomController = (req, res, next) => {
    let newRoom = new roomModel({
        _id: String(new mongoose.Types.ObjectId),
        title: req.body.dataRoom.title,
        price: req.body.dataRoom.price,
        maxPeople: req.body.dataRoom.maxPeople,
        desc: req.body.dataRoom.desc,
        roomNumbers: req.body.dataRoom.roomNumbers
    })
    newRoom.save((err) => {
        if (!err) {
            console.log('SUCESSFULL !!!')
        } else {
            console.log('Something is wrong: ' + err);
        }
    })
    res.redirect();
}





exports.updateHotelController = (req, res, next) => {
    let id = req.params.id;
    roomHotel.findOne({ _id: id }).then(respon => {
        respon.title = req.body.title;
        respon.price = req.body.price;
        respon.maxPeople = req.body.maxPeople;
        respon.desc = req.body.desc;
        respon.roomNumbers = req.body.roomNumbers;
    }).then(
        results => {
            console.log('UPDATE SUCESSFULL !!!')
        }
    )
}


exports.deleteRoomController = (req, res, next) => {
    let id = req.params.id;
    roomModel.deleteOne({ _id: id }, (err) => {
        !err ? console.log('SUCESSFUL !!!') : console.log('Something is wrong: ' + err)
    })
}

exports.roomEmptyController = async (req, res, next) => {
    let idHotel = req.query.id;
    let dateStart = new Date(req.query.dateStart);
    let dateEnd = new Date(req.query.dateEnd);
    let roomBooked = await transactionModel.find({
        $or: [
            { dateStart: { $lte: dateStart }, dateEnd: { $gte: dateStart } },
            { dateStart: { $lte: dateEnd }, dateEnd: { $gte: dateEnd } }
        ],
        hotel_id: idHotel
    }, { room: 1, _id: 0 });


    let typeRoomHotel = await hotelModel.find({
        _id: idHotel
    }, { rooms: 1 });


    let roomAll = await roomModel.find({
        title: { $in: typeRoomHotel[0]?.rooms }
    })
    console.log(roomBooked)

    res.send({
        allRoom: roomAll,
        arrayRoomBook: roomBooked
    });

}