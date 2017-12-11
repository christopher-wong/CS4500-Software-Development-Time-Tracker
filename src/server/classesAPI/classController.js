const classModel = require('./model/class.model');

function getAllClasses(req, res) {
  return classModel.getAllClasses().then(classes => res.json(classes));
}

function createClass(req, res) {
  // const args = req; // eslint-disable-line
  const slclass = req.body;

  return classModel.createClass(slclass)
    .then((newClass) => {
      res.json(newClass);
    });
}

function getClass(req, res) {
  const slclass = req.body;
  const { classId } = slclass;

  classModel.findClassById(classId)
    .then((foundClass) => {
      res.json(foundClass);
    });
}

function updateClass(req, res) {
  const slclass = req.body;
  const { classId } = slclass;

  classModel.updateClass(classId, slClass)
    .then((updatedClass) => {
      res.json(updatedClass);
    });
}

function deleteClass(req, res) {
  const slclass = req.body;
  const { classId } = slclass;

  classModel.deleteClass(classId)
    .then((status) => {
      res.json(status);
    });
}

module.exports = {
  getAllClasses,
  createClass,
  getClass,
  updateClass,
  deleteClass,
};
