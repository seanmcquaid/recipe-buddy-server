const UserDao = require('../daos/UserDao');
const { decodeJwt } = require('../utils/jwtUtils');

exports.getRecipes = async (req, res) => {
  try {
    const { username } = decodeJwt(req.token);
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

exports.postAddRecipe = async (req, res) => {
  try {
    const { username } = decodeJwt(req.token);
    const { id, title } = req.body;
    const userInfo = await UserDao.findOne({ username });

    await userInfo.addRecipe({ id, title });

    const { recipes } = await UserDao.findOne({ username });

    return res.status(200).json({
      recipes,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errorMessage: 'There was an issue with getting recipes',
    });
  }
};

exports.deleteRecipe = async (req, res) => {
  try {
    const { username } = decodeJwt(req.token);
    const { id } = req.params;
    const userInfo = await UserDao.findOne({ username });

    await userInfo.deleteRecipe(id);

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
