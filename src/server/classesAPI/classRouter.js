const express = require('express');
const bodyParser = require('body-parser');
const expressSanitizer = require('express-sanitizer');
const classController = require('./classController');

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(expressSanitizer());

/* istanbul ignore next */
function allowAdmin(req, res, next) {
  if (!req.user.roles.includes('ADMIN')) {
    res.send(401);
  } else {
    next();
  }
}

// return all openIssues JSON
router.get('/', classController.getClass);
router.get('/all', allowAdmin, classController.getAllClasses);
router.post('/', allowAdmin, classController.createClass);
router.put('/', allowAdmin, classController.updateClass);
router.delete('/', allowAdmin, classController.deleteClass);

module.exports = router;
