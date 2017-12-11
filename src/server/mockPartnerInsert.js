const Partner = require('./partnerAPI/model/partner.schema');

const p1 = new Partner({
  name: 'Boys and Girls Club',
  email: 'email@email.com',
  description: 'A service learning partner',
});

p1.save();
