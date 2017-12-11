require('./db');

const express = require('express');
const config = require('config');
const path = require('path');
const expressSanitizer = require('express-sanitizer');
const bodyParser = require('body-parser');
const serveStatic = require('serve-static');
const winston = require('winston');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSanitizer());
app.use(cookieParser());
app.use(session({
  secret: 'my secret',
  resave: true,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

// noinspection Annotator
winston.add(winston.transports.File, { filename: './log.log' });

const sampleRouter = require('./testAPI/testRouter');
const userRouter = require('./userAPI/userRouter');
const classRouter = require('./classesAPI/classRouter');
const partnerRouter = require('./partnerAPI/partnerRouter');

app.use('/api/testAPI/', sampleRouter);
app.use('/api/user/', userRouter);
app.use('/api/class/', classRouter);
app.use('/api/partner/', partnerRouter);


app.use(serveStatic(config.get('static.dirName')));

app.all('*', (req, res) => {
  res.sendFile('/index.html', { root: path.resolve(__dirname, '../..', config.get('static.dirName')) });
});

module.exports = app;
