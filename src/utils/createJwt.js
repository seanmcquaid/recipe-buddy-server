const jwt = require('jsonwebtoken');
require('dotenv').config();

const createJwt = (id, username) =>
  jwt.sign({ id, username }, process.env.JWT_SECRET, { expiresIn: 360000 });

module.exports = createJwt;
