const express = require('express');
const userRouter = express.Router();
const userController = require('../controller/userController');

// userRouter.get('/', userController)
userRouter.get('/auth', userController.isAuthController)
userRouter.post('/createUser', userController.createUserController)
userRouter.get('/createUser', userController.sucessfullAddUerController);
userRouter.post('/logout', userController.logOutController)
userRouter.post('/auth', userController.authController);


exports.userRouter = userRouter;