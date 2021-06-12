const checkAuth = require('../../utils/checkAuth');
const mockRequest = require('../../testUtils/mockRequest');
const mockResponse = require('../../testUtils/mockResponse');
const mockNext = require('../../testUtils/mockNext');
const expect = require('chai').expect;

describe('checkAuth', () => {
  it('No token provided', () => {
    const req = mockRequest({});
    const res = mockResponse();
    const next = mockNext();

    checkAuth(req, res, next);

    expect(res.status.calledWith(401)).to.be.true;
    expect(
      res.json.calledWith({
        errorMessage: 'Invalid token',
      }),
    ).to.be.true;
  });

  it('Valid token provided', () => {
    const req = mockRequest();
    const res = mockResponse();
    const next = mockNext();
  });

  it('Invalid token provided', () => {
    const req = mockRequest();
    const res = mockResponse();
    const next = mockNext();
  });
});
