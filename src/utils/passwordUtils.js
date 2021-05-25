const bcrypt = require('bcrypt');
require('dotenv').config();

exports.hashPassword = (password) =>
  bcrypt.hashSync(
    password,
    Number.parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10,
  );

exports.verifyPassword = (password, hashedPassword) =>
  bcrypt.compareSync(password, hashedPassword);
