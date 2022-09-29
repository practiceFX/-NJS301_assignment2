const express = require('express');
const transactionRouter = express.Router();
const transactionController = require('../controller/transactionController');




transactionRouter.get('/transaction', transactionController.tranListController);
transactionRouter.get('/all-transactions', transactionController.allTranListController);
transactionRouter.post('/transaction/add', transactionController.tranAddController);




exports.transactionRouter = transactionRouter