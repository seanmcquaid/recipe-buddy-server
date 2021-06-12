const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  username: String,
  password: String,
  recipes: [
    {
      id: String,
      title: String,
    },
  ],
});

userSchema.methods.addRecipe = function (recipe) {
  this.recipes.push(recipe);
  return this.save();
};

userSchema.methods.deleteRecipe = function (recipeId) {
  this.recipes = this.recipes.filter((recipe) => recipe.id !== recipeId);
  return this.save();
};

const UserDao = mongoose.model('User', userSchema);

module.exports = UserDao;
