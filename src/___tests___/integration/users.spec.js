const expect = require('chai').expect;
const sinon = require('sinon');
const UserDao = require('../../daos/UserDao');
const { hashPassword } = require('../../utils/passwordUtils');
const app = require('../../app');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('/users', () => {
  describe('/login', () => {
    afterEach(() => {
      sinon.restore();
    });

    it("User doesn't exist", async () => {
      sinon
        .stub(UserDao, 'findOne')
        .withArgs({ username: 'sean' })
        .returns(null);

      chai
        .request(app)
        .post('/users/login')
        .send({
          username: 'sean',
          password: 'password',
        })
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body.errorMessage).to.equal(
            "This user doesn't exist, please try again!",
          );
        });
    });

    it('Password is incorrect', async () => {
      sinon
        .stub(UserDao, 'findOne')
        .withArgs({ username: 'sean' })
        .returns({
          username: 'sean',
          password: hashPassword('hello'),
        });

      chai
        .request(app)
        .post('/users/login')
        .send({
          username: 'sean',
          password: 'password',
        })
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body.errorMessage).to.equal(
            "This password isn't correct, please try again!",
          );
        });
    });

    it('Valid user info', async () => {
      sinon
        .stub(UserDao, 'findOne')
        .withArgs({ username: 'sean' })
        .returns({
          username: 'sean',
          password: hashPassword('hello'),
        });

      chai
        .request(app)
        .post('/users/login')
        .send({
          username: 'sean',
          password: 'password',
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.token.length).greaterThan(0);
        });
    });
  });

  describe('/register', () => {
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

      chai
        .request(app)
        .post('/users/register')
        .send({
          username: 'sean',
          password: 'hello',
        })
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body.errorMessage).to.equal(
            'This user already exists, please try again!',
          );
        });
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

      chai
        .request(app)
        .post('/users/register')
        .send({
          username: 'sean',
          password: 'hello',
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.token.length).greaterThan(0);
        });
    });
  });
});
