const http = require('http');
const config = require('config');
const app = require('./app');
const winston = require('winston');

const httpServer = http.createServer(app);

httpServer.listen(config.get('express.port'), () => {
  winston.log('info', `API server listening on port ${config.get('express.port')}`);
});

module.exports = app;
