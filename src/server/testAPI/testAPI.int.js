import { should } from 'chai'; // eslint-disable-line no-unused-vars

const chaiHttp = require('chai-http');
const chai = require('chai');
const server = require('../server.js');

chai.should();
chai.use(chaiHttp);

describe('Routes', () => {
  it('/api/testAPI should return status 200', (done) => {
    chai.request(server).get('/api/testAPI')
      .end((err, res) => {
        if (err) {
          done(err);
        }
        res.should.have.status(200);
        res.body.message.should.equal('hi there!');
      });
    done();
  });
  it('/api/testAPI should return message', (done) => {
    chai.request(server).get('/api/testAPI')
      .end((err, res) => {
        if (err) {
          done(err);
        }
        res.should.have.status(200);
        res.body.message.should.equal('hi there!');
      });
    done();
  });
});
