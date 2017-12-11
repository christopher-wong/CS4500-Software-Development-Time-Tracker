const { expect } = require('chai');

const Partner = require('./partner.schema');

describe('PartnerSchema', () => {
  it("should be invalid if name doesn't exist", (done) => {
    const u = new Partner();

    u.validate((err) => {
      expect(err.name).to.exist;
      done();
    });
  });

  it('properly creates a class', (done) => {
    const u = new Partner({
      name: 'Boys and Girls Club',
      email: 'email@email.com',
      description: 'A service learning partner',
    });

    u.validate((err) => {
      expect(err).to.not.exist;
      done();
    });
  });
});
