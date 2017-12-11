const config = require('config');

const connectionString = `mongodb://${config.get('mongodb.host')}:${config.get('mongodb.port')}/${config.get('mongodb.db')}`;
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connection.openUri(connectionString);

module.exports = mongoose;
