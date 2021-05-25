const jwt = require('jsonwebtoken');
require('dotenv').config();

const checkAuth = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).send({
      errorMessage: 'Invalid token',
    });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.token = decodedToken;
    next();
  } catch (err) {
    return res.status(401).send({
      errorMessage: 'Expired Token',
    });
  }
};

module.exports = checkAuth;
