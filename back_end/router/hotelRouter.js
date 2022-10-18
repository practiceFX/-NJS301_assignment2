const express = require('express');
const hotelRouter = express.Router();
const hotelController = require('../controller/hotelController');


hotelRouter.get('/hotel', hotelController.hotelListController);
hotelRouter.get('/hotel/city', hotelController.cityController);
hotelRouter.get('/hotel/top-rate', hotelController.topRateHotelController);
// hotelRouter.get('/hotel/serach-info', hotelController.seachInfoHotelController);
hotelRouter.get('/hotel/detail/:id', hotelController.inforDetailHotelController);
hotelRouter.post('/hotel/update-room-hotel', hotelController.updateRoomHotelController);
hotelRouter.post('/hotel/update-hotel', hotelController.updateHotelController);
hotelRouter.post('/hotel/add-hotel', hotelController.addHotelController);
hotelRouter.post('/hotel/delete-hotel', hotelController.deleteHotelController);



exports.hotelRouter = hotelRouter;