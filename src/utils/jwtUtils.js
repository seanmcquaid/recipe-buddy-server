const jwt = require('jsonwebtoken');
require('dotenv').config();

export const createJwt = (id, username) =>
  jwt.sign({ id, username }, process.env.JWT_SECRET, { expiresIn: 360000 });
