/*
 * A Mongo Schema for Users.
 * UserTypes: {Admin, Student, TA, Professor}
 */
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const schema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  firstName: String,
  lastName: String,
  password: String,
  google: {
    id: String,
    token: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: (email => email.includes('@neu.edu')
      || email.includes('@husky.neu.edu')
      || email.includes('@northeastern.edu')),
  },
  dateCreated: { type: Date, default: Date.now },
  // Roles is an array of strings rather than an enum so that one userAPI may have multiple roles.
  roles: [{ type: String }],
  partners: [{ type: mongoose.Schema.ObjectId, ref: 'Partner' }],
  datesWorked: [{
    partner: { type: mongoose.Schema.ObjectId, ref: 'Partner', required: true },
    timeStarted: { type: Date, required: true },
    hoursWorked: { type: Number, required: true },
  }],
}, { collection: 'user' });

module.exports = mongoose.model('User', schema);
