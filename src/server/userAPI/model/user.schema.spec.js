const { expect } = require('chai');


const User = require('./user.schema');

describe('UserSchema', () => {
  it('should be invalid if username or email is empty', (done) => {
    const u = new User();

    u.validate((err) => {
      expect(err.errors.email).to.exist;
      expect(err.errors.username).to.exist;
      done();
    });
  });

  it('properly creates a user', (done) => {
    const u = new User({ username: 'hello', email: 'testEmail@husky.neu.edu' });

    u.validate((err) => {
      expect(err).to.not.exist;
      done();
    });
  });

  it('should reject non-neu emails', (done) => {
    const u = new User({ username: 'test', email: 'testEmaill@gmail.com' });

    u.validate((err) => {
      expect(err.errors.email).to.exist;
      done();
    });
  });
});
