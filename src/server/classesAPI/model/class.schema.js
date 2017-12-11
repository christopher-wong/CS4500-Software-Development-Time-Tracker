/*
 * A Mongo Schema for Classes.
 * UserTypes: {name, crn, description, dateCreated, students, professor, tas}
 */
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const schema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  crn: { type: String, required: true },
  description: String,

  dateCreated: { type: Date, default: Date.now },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  professor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  tas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  partners: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Partner' }],
}, { collection: 'class' });

module.exports = mongoose.model('Class', schema);
