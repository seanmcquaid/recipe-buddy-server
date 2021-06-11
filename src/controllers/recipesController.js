const UserDao = require('../daos/UserDao');
const { decodeJwt } = require('../utils/jwtUtils');

exports.getRecipes = async (req, res) => {
  const { username } = decodeJwt(req.token);
  try {
    const { recipes } = await UserDao.findOne({ username });
    return res.status(200).json({
      recipes,
    });
  } catch (error) {
    return res.status(500).json({
      errorMessage: 'There was an issue with getting recipes',
    });
  }
};
