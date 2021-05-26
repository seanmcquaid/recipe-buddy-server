const expect = require('chai').expect;
const sinon = require('sinon');
const UserDao = require('../../daos/UserDao');
const usersController = require('../../controllers/usersController');
const { hashPassword } = require('../../utils/passwordUtils');
const mockRequest = require('../../testUtils/mockRequest');
const mockResponse = require('../../testUtils/mockResponse');

describe('usersController', () => {
  describe('postLogin', () => {
    afterEach(() => {
      sinon.restore();
    });

    it("User doesn't exist", async () => {
      sinon
        .stub(UserDao, 'findOne')
        .withArgs({ username: 'sean' })
        .returns(null);

      const req = mockRequest({}, { username: 'sean', password: 'hello' });
      const res = mockResponse();

      await usersController.postLogin(req, res);

      expect(res.status.calledWith(401)).to.be.true;
      expect(
        res.json.calledWith({
          errorMessage: "This user doesn't exist, please try again!",
        }),
      ).to.be.true;
    });

    it('Password is incorrect', async () => {
      sinon
        .stub(UserDao, 'findOne')
        .withArgs({ username: 'sean' })
        .returns({
          username: 'sean',
          password: hashPassword('hello'),
        });

      const req = mockRequest(
        {},
        { username: 'sean', password: 'hello there' },
      );
      const res = mockResponse();

      await usersController.postLogin(req, res);

      expect(res.status.calledWith(401)).to.be.true;
      expect(
        res.json.calledWith({
          errorMessage: "This password isn't correct, please try again!",
        }),
      ).to.be.true;
    });

    it('Valid user info', async () => {
      sinon
        .stub(UserDao, 'findOne')
        .withArgs({ username: 'sean' })
        .returns({
          username: 'sean',
          password: hashPassword('hello'),
        });

      const req = mockRequest({}, { username: 'sean', password: 'hello' });
      const res = mockResponse();

      await usersController.postLogin(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.args[0][0].token.length).greaterThan(0);
    });
  });

  describe('postRegister', () => {
    afterEach(() => {
      sinon.restore();
    });
    it('User exists', async () => {
      sinon
        .stub(UserDao, 'findOne')
        .withArgs({ username: 'sean' })
        .returns({
          username: 'sean',
          password: hashPassword('hello'),
        });

      const req = mockRequest({}, { username: 'sean', password: 'hello' });
      const res = mockResponse();

      await usersController.postRegister(req, res);

      expect(res.status.calledWith(401)).to.be.true;
      expect(
        res.json.calledWith({
          errorMessage: 'This user already exists, please try again!',
        }),
      ).to.be.true;
    });

    it('Valid user info', async () => {
      sinon
        .stub(UserDao, 'findOne')
        .withArgs({ username: 'sean' })
        .onFirstCall()
        .returns(null)
        .onSecondCall()
        .returns({
          username: 'sean',
          password: hashPassword('hello'),
        });

      sinon.stub(UserDao, 'create').returns(null);

      const req = mockRequest({}, { username: 'sean', password: 'hello' });
      const res = mockResponse();

      await usersController.postRegister(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.args[0][0].token.length).greaterThan(0);
    });
  });
});
