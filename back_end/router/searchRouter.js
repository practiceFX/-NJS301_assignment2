const express = require('express');
const searchRouter = express.Router();
const searchController = require('../controller/searchController');


searchRouter.get('/search', searchController.searchController);

exports.searchRouter = searchRouter;