const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.createJwt = (id, username) =>
  jwt.sign({ id, username }, process.env.JWT_SECRET, { expiresIn: 360000 });

exports.decodeJwt = (token) => jwt.decode(token, process.env.JWT_SECRET);
