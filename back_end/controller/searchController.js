const hotelModel = require('../model/hotelModel');
const roomModel = require('../model/roomModel');
const transactionModel = require('../model/transactionModel');
const { handleObjectRoom, handleObjectTitle } = require('../util/search');

exports.searchController = async (req, res, next) => {
    let adult = req.query.adult;
    let child = req.query.child;
    let maxPeople = parseInt(adult) + parseInt(child);
    // let room = req.query.room;
    let city = req.query.city;
    let dateStart = req.query.dateStart;
    let dateEnd = req.query.dateEnd;
    let roomBooked = await transactionModel.find({
        $or: [
            { dateStart: { $lte: dateStart }, dateEnd: { $gte: dateStart } },
            { dateStart: { $lte: dateEnd }, dateEnd: { $gte: dateEnd } }
        ],
    });


    if (roomBooked.length > 0) {
        let rooms = handleObjectRoom(roomBooked);
        let roomType = await roomModel.find({ 'maxPeople': maxPeople, 'roomNumbers': { $elemMatch: { $nin: rooms } } });
        let roomTitle = handleObjectTitle(roomType);
        hotelModel.find({
            'city': city, 'rooms': { $elemMatch: { $in: roomTitle } }
        }).then(respon => {
            res.send(respon);
        })
    } else {
        hotelModel.find({
            'city': city
        }).then(respon => {
            res.send(respon);
        })
    }


}