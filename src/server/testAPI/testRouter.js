const express = require('express');
const bodyParser = require('body-parser');
const expressSanitizer = require('express-sanitizer');
const testController = require('./testController');

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(expressSanitizer());

// return all openIssues JSON
router.get('/', testController.getData);

module.exports = router;
