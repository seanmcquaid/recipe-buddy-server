const expect = require('chai').expect;
const sinon = require('sinon');
const UserDao = require('../../daos/UserDao');
const usersController = require('../../controllers/usersController');

describe('usersController', () => {
  describe('postLogin', () => {
    sinon.stub(UserDao, 'findOne').withArgs({ username: 'sean' }).returns(null);
    usersController.postLogin({
      body: { username: 'sean', password: 'hello' },
    });
  });
});
