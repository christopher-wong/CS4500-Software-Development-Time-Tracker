const { expect } = require('chai');

const Class = require('./class.schema');

describe('ClassSchema', () => {
  it("should be invalid if name doesn't exist", (done) => {
    const u = new Class();

    u.validate((err) => {
      expect(err.name).to.exist;
      done();
    });
  });

  it('properly creates a class', (done) => {
    const u = new Class({
      name: 'CS3500',
      crn: '123456',
      description: 'Object Oriented Design',
    });

    u.validate((err) => {
      expect(err).to.not.exist;
      done();
    });
  });
});
