const bcrypt = require('bcrypt');
require('dotenv').config();

export const hashPassword = (password) =>
  bcrypt.hashSync(password, process.env.BCRYPT_SALT_ROUNDS);

export const verifyPassword = (password, hashedPassword) =>
  bcrypt.compareSync(password, hashedPassword);
