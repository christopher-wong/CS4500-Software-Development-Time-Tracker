const Class = require('./classesAPI/model/class.schema');

const c1 = new Class({
  name: 'CS 3500',
  crn: '104537',
});

const c2 = new Class({
  name: 'CS 4500',
  crn: '978275',
});

c1.save();
c2.save();
