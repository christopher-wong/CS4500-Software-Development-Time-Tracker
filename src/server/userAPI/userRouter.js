const express = require('express');
const bodyParser = require('body-parser');
const expressSanitizer = require('express-sanitizer');
const authController = require('./authController');
const userController = require('./userController');

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

// Assign google auth APIs.
router.get('/auth/student', authController.googleAuth);
router.post('/auth/faculty', authController.localAuth, authController.login);
router.post('/auth/loginFaculty', authController.localAuth, authController.login);
router.get('/auth/loggedIn', authController.loggedIn);
router.get('/auth/logout', authController.logout);
router.post('/auth/register', authController.register);
router.get(
  '/auth/google/callback',
  authController.googleAuthCallback,
);
router.put('/givePrivilege', allowAdmin, userController.givePrivilege);
router.post('/addHours', userController.addHours);
router.post('/getPartners', userController.getPartners);
router.post('/getHours', userController.getHours);
router.get('/getAllUsers', userController.getAllUsers);
router.get('/getProfessors', userController.getProfessors);
router.put('/addPartnerToUser', userController.addPartnerToUser);

module.exports = router;
