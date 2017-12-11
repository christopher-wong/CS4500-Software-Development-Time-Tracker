/*
 * The operations that are available on Users.
 */

const userModel = require('./user.schema');
const partnerModel = require('../../partnerAPI/model/partner.model');
const classModel = require('../../classesAPI/model/class.model');
const bcrypt = require('bcrypt-nodejs');


function findUserByGoogleId(googleId) {
  return userModel.findOne({ 'google.id': googleId });
}

function findUserById(userId) {
  return userModel.findById(userId);
}

function findUserByEmail(email) {
  return userModel.findOne({ email });
}

function findUserByUsername(username) {
  return userModel.findOne({ username });
}

function getPartnersForClasses(username) {
  return classModel.findClassesWithStudent(username)
    .then((classes) => {
      return partnerModel.findPartnersForClasses(classes);
    });
}

function addPartnerToUser(userId, partnerId) {
  return userModel.update({ _id: userId }, { $push: { partners: partnerId } });
}

function givePrivilegeByUserId(userId, privilege) {
  return userModel.findById(userId).then((user) => {
    if (!user.roles.includes(privilege)) {
      return userModel.update({ _id: userId }, { $push: { roles: privilege } });
    }
    return user;
  });
}

function addPartnerHours(userId, partnerId, dateStarted, hoursWorked) {
  const partnerEntry = {
    partner: partnerId,
    timeStarted: dateStarted,
    hoursWorked,
  };
  return userModel.update({ _id: userId }, { $push: { datesWorked: partnerEntry } });
}

function createUser(user) {
  const tempUser = user;
  tempUser.password = bcrypt.hashSync(tempUser.password);
  return userModel.create(tempUser);
}


function findUserByCredentials(username, password) {
  return userModel
    .findOne({ username })
    .then((user) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        return user;
      }
      return null;
    });
}

function getClassesWithPartnerInformation(userId) {
  const results = {};
  userModel
    .findById(userId)
    .then((user) => {
      user.datesWorked.map((thisDate) => {
        const result = {};
        if (!(thisDate.classId in results)) {
          results[thisDate.classId] = {};
          results[thisDate.classId].class = thisDate.class;
          results[thisDate.classId].partner = thisDate.class.partners;
        }
        if (!('hours' in result[thisDate.classId])) {
          results[thisDate.classId].hours = 0;
        }
        results[thisDate.classId].hours += thisDate.hoursWorked;
        return result;
      });
    });
  return results;
}

function getUsersList() {
  return userModel.find();
}

function findAllProfessors() {
  return userModel.find({ roles: 'PROFESSOR' });
}

module.exports = {
  findUserByCredentials,
  findUserByGoogleId,
  createUser,
  findUserByEmail,
  findUserByUsername,
  findUserById,
  givePrivilegeByUserId,
  addPartnerHours,
  getPartnersForClasses,
  addPartnerToUser,
  getClassesWithPartnerInformation,
  getUsersList,
  findAllProfessors,
};
