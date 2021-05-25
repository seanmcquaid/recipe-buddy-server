const express = require('express');
const usersRouter = express.Router();
const usersController = require('../controllers/usersController');

usersRouter.post('/login', usersController.postLogin);

usersRouter.post('/register', usersController.postRegister);

module.exports = usersRouter;
