const userModel = require('../model/userModel');
const mongoose = require('mongoose');

let isUser = false;
let creteUser = false;
exports.authController = async (req, res, next) => {
    isUser = null;
    const dataUser = req.body.dataAuth;
    const user = await userModel.find({ 'username': dataUser.username, 'password': dataUser.password })
    if (user.length > 0) {
        isUser = user;
    } else {
        isUser = 'false';
    }
}


exports.isAuthController = (req, res, next) => {
    res.send(isUser);
}


exports.logOutController = (req, res, next) => {
    isUser = req.body.logoutUser;
}

exports.createUserController = async (req, res, next) => {
    creteUser = false;
    const dataUser = req.body.dataUser;
    const checkUser = await userModel.find({ 'username': dataUser.username });
    if (checkUser.length == 0) {
        let newUser = new userModel({
            _id: String(new mongoose.Types.ObjectId()),
            username: dataUser.username,
            password: dataUser.password,
            fullName: dataUser.username,
            phoneNumber: '6868686868',
            email: dataUser.username + '@gmail.com',
            isAdmin: 'false'
        })
        newUser.save((err) => {
            if (!err) {
                console.log('SUCESSFULL !!!');
            } else {
                console.log('Something is wrong: ' + err);
            }
        });
        creteUser = true;
    } else {
        creteUser = false;
    }
}

exports.sucessfullAddUerController = (req, res, next) => {
    res.send(creteUser);
}
