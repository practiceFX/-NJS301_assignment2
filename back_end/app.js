const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');



const app = express();
const server = http.createServer(app);
const db = require('./config/db');
const hotelRouter = require('./router/hotelRouter');
const roomRouter = require('./router/roomRouter');
const transactionRouter = require('./router/transactionRouter');
const userRouter = require('./router/userRouter');
const searchRouter = require('./router/searchRouter');


// const userRouter = require('./router/userRouter');


app.use(cors());
app.use(bodyParser.urlencoded({}));
app.use(bodyParser.json());
app.use(hotelRouter.hotelRouter);
app.use(roomRouter.roomRouter);
app.use(transactionRouter.transactionRouter);
app.use(userRouter.userRouter);
app.use(searchRouter.searchRouter);
// app.use(userRouter.userRouter);


// app.use(userRouter.userRouter);

mongoose.connect(db.url, {
    dbName: 'booking',
}).then(res => {
    console.log('Connet Success !!!');
    server.listen(db.port);
}).catch(err => {
    console.log(err);
})
