const express = require('express');
const checkAuth = require('../utils/checkAuth');
const recipesRouter = express.Router();
// const usersController = require('../controllers/usersController');

recipesRouter.get('/', checkAuth);

module.exports = recipesRouter;
