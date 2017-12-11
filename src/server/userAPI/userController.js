/* eslint-disable no-underscore-dangle */

/*
 * APIs for Users.
 */

const userModel = require('./model/user.model');

function givePrivilege(req, res) {
  return userModel.givePrivilegeByUserId(
    req.body.userId,
    req.body.privilege,
  ).then((user) => {
    res.send(user);
  }, (err) => {
    res.send(err);
  });
}

function addHours(req, res) {
  const userId = req.user._id;
  const { partnerId, dateStarted, hoursWorked } = req.body;

  return userModel.addPartnerHours(userId, partnerId, dateStarted, hoursWorked)
    .then((status) => {
      res.json(status);
    });
}

function getPartners(req, res) {
  const studentId = req.body.user._id;

  return userModel.getPartnersForClasses(studentId)
    .then((result) => {
      res.json(result);
    });
}

function getHours(req, res) {
  const userId = req.body.user._id;
  return res.json(userModel.getClassesWithPartnerInformation(userId));
}

function addPartnerToUser(req, res) {
  const { partner } = req.body;
  return userModel.addPartnerToUser(partner).then((user) => {
    res.json(user);
  });
}

function getAllUsers(req, res) {
  // return res.json({ users: userModel.getUsersList() });
  return userModel.getUsersList().then((result) => {
    const users = [];

    result.map((user) => {
      return users.push({
        id: user._id, // eslint-disable-line
        firstName: user.firstName,
        lastName: user.lastName,
        roles: user.roles,
      });
    });
    return res.json({ users });
  });
}

function getProfessors(req, res) {
  return userModel.findAllProfessors().then((result) => {
    const professors = [];

    result.map((prof) => {
      return professors.push({
        id: prof._id,
        firstName: prof.firstName,
        lastName: prof.lastName,
        roles: prof.roles,
      });
    });
    return res.json({ professors });
  });
}

module.exports = {
  givePrivilege,
  addHours,
  getPartners,
  getHours,
  getAllUsers,
  getProfessors,
  addPartnerToUser,
};
