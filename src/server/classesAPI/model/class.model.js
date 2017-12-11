/*
 * The operations that are available on Classes.
 */

const classModel = require('./class.schema');

function findClassById(classId) {
  return classModel.findById(classId);
}

function getAllClasses() {
  return classModel.find();
}

function createClass(slclass) {
  return classModel.create(slclass);
}

function findClassByName(classname) {
  return classModel.findOne({ classname });
}

function updateClass(classId, slclass) {
  return classModel.update({ _id: classId }, slclass);
}

function deleteClass(classId) {
  return classModel.remove({ _id: classId });
}

function findClassesWithStudent(studentId) {
  return classModel.find({ students: studentId });
}

module.exports = {
  getAllClasses,
  findClassById,
  createClass,
  findClassByName,
  updateClass,
  deleteClass,
  findClassesWithStudent,
};
