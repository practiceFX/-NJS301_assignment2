const express = require('express');
const roomRouter = express.Router();
const roomController = require('../controller/roomController');

roomRouter.get('/room', roomController.roomListController);
roomRouter.get('/room/room-type', roomController.roomTypeController);
roomRouter.get('/room/empty-room', roomController.roomEmptyController);
roomRouter.post('/room/add-room', roomController.addRoomController);
roomRouter.post('/room/delete-room', roomController.deleteRoomController);
roomRouter.post('/room/update-room', roomController.updateHotelController);

exports.roomRouter = roomRouter;