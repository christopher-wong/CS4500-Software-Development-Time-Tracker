/*
 * A Mongo Schema for Service Learning Partners.
 */
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const schema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String },
  description: { type: String },
  dateCreated: { type: Date, default: Date.now },
  tags: [{ type: String }],
  classes: [{ type: mongoose.Schema.ObjectId, ref: 'Class' }],

}, { collection: 'partner' });

module.exports = mongoose.model('Partner', schema);
