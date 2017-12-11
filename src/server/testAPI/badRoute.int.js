import { should } from 'chai'; // eslint-disable-line no-unused-vars

const chaiHttp = require('chai-http');
const chai = require('chai');
const server = require('../server.js');

chai.should();
chai.use(chaiHttp);

describe('Routes', () => {
  describe('/garbageRouteTest', () => {
    it('test for valid error handling', (done) => {
      chai.request(server).get('/api/garbage')
        .end((err, res) => {
          if (err) {
            done(err);
          }

          res.should.have.status(200);

          done();
        });
    });
    it('test for redirect', (done) => {
      chai.request(server).get('/moreGarbage')
        .end((err, res) => {
          if (err) {
            done(err);
          }

          res.should.have.status(200);

          done();
        });
    });
  });
});
