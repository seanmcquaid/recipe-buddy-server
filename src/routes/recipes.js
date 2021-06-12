const express = require('express');
const checkAuth = require('../utils/checkAuth');
const recipesRouter = express.Router();
const recipesController = require('../controllers/recipesController');

recipesRouter.get('/', checkAuth, recipesController.getRecipes);

module.exports = recipesRouter;
