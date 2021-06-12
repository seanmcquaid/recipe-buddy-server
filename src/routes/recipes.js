const express = require('express');
const checkAuth = require('../utils/checkAuth');
const recipesRouter = express.Router();
const recipesController = require('../controllers/recipesController');

recipesRouter.get('/', checkAuth, recipesController.getRecipes);

recipesRouter.post('/', checkAuth, recipesController.postAddRecipe);

recipesRouter.delete('/:id', checkAuth, recipesController.deleteRecipe);

module.exports = recipesRouter;
