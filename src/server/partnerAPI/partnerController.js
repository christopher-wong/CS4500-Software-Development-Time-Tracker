const partnerModel = require('./model/partner.model');

function findPartnersForClasses(req, res) {
  return partnerModel.findPartnersForClasses(req.body.classList).then((partners) => {
    res.json(partners);
  });
}

function createPartner(req, res) {
  // const args = req; // eslint-disable-line
  const partner = req.body;

  partnerModel.createPartner(partner).then((p) => {
    res.json(p);
  });
}

function getAllPartners(req, res) {
  return partnerModel.getAllPartners().then(pl => res.json(pl));
}

function getPartner(req, res) {
  const { partnerId } = req.body;

  return partnerModel.getPartnerById(partnerId).then((p) => {
    res.json(p);
  });
}

function updatePartner(req, res) {
  const partner = req.body;
  const { partnerId } = partner;

  return classModel.updatePartner(partnerId, partner).then(p => res.json(p));
}

function deletePartner(req, res) {
  const partner = req.body;
  const { partnerId } = partner;

  classModel.deleteClass(partnerId).then(s => res.json(s));
}

module.exports = {
  getPartner,
  updatePartner,
  deletePartner,
  createPartner,
  getAllPartners,
  findPartnersForClasses,
};
