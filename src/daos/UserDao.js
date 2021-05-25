const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  username: String,
  password: String,
});

const UserDao = mongoose.model('User', userSchema);

module.exports = UserDao;
