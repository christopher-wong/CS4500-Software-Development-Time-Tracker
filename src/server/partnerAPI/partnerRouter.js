const express = require('express');
const bodyParser = require('body-parser');
const expressSanitizer = require('express-sanitizer');
const partnerController = require('./partnerController');

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
router.post('/get', partnerController.getPartner);
router.get('/all', partnerController.getAllPartners);
router.post('/', allowAdmin, partnerController.createPartner);
router.put('/', allowAdmin, partnerController.updatePartner);
router.delete('/', allowAdmin, partnerController.deletePartner);

module.exports = router;
