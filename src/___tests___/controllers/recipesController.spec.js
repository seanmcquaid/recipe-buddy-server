const expect = require('chai').expect;
const sinon = require('sinon');
const UserDao = require('../../daos/UserDao');
const recipesController = require('../../controllers/recipesController');
const { createJwt } = require('../../utils/jwtUtils');
const { hashPassword } = require('../../utils/passwordUtils');
const mockRequest = require('../../testUtils/mockRequest');
const mockResponse = require('../../testUtils/mockResponse');

describe('recipesController', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('getRecipes', async () => {
    sinon
      .stub(UserDao, 'findOne')
      .withArgs({ username: 'sean' })
      .returns({
        username: 'sean',
        password: hashPassword('hello'),
        recipes: [],
      });

    const req = mockRequest({}, {}, {}, createJwt(1, 'sean'));
    const res = mockResponse();

    await recipesController.getRecipes(req, res);

    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.args[0][0].recipes.length).equal(0);
  });
});
