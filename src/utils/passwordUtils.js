const bcrypt = require('bcrypt');
require('dotenv').config();

exports.hashPassword = (password) =>
  bcrypt.hashSync(password, process.env.BCRYPT_SALT_ROUNDS);

exports.verifyPassword = (password, hashedPassword) =>
  bcrypt.compareSync(password, hashedPassword);
