const UserDao = require('../daos/UserDao');
const { hashPassword, verifyPassword } = require('../utils/passwordUtils');
const { createJwt } = require('../utils/jwtUtils');

exports.postLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const userInfo = await UserDao.findOne({ username });
    if (!userInfo) {
      return res.status(401).json({
        errorMessage: "This user doesn't exist, please try again!",
      });
    }

    const isPasswordCorrect = verifyPassword(password, userInfo.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({
        errorMessage: "This password isn't correct, please try again!",
      });
    }

    const token = createJwt(userInfo._id, userInfo.username);

    return res.status(200).json({
      token,
    });
  } catch (error) {
    return res.status(500).json({
      errorMessage: 'There was an issue with logging in, please try again',
    });
  }
};

exports.postRegister = async (req, res) => {
  const { username, password } = req.body;
  try {
    const userExists = await UserDao.findOne({ username });

    if (userExists) {
      return res.status(401).json({
        errorMessage: 'This user already exists, please try again!',
      });
    }
    const hashedPassword = hashPassword(password);
    await UserDao.create({ username, password: hashedPassword });

    const userInfo = await UserDao.findOne({ username });
    const token = createJwt(userInfo._id, userInfo.username);

    return res.status(200).json({
      token,
    });
  } catch (error) {
    return res.status(500).json({
      errorMessage: 'There was an issue with registering, please try again',
    });
  }
};
