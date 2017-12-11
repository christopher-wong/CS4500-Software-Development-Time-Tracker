/*
 * The operations that are available on Partners.
 */

const partnerModel = require('./partner.schema');

function createPartner(partner) {
  return partnerModel.create(partner);
}

function getAllPartners() {
  return partnerModel.find();
}

function updatePartner(partnerId, partner) {
  return partnerModel.update({ _id: partnerId }, partner);
}

function findPartnersForClasses(classList) {
  const partners = classList.map((thisClass) => {
    return partnerModel.find({ classes: thisClass });
  });

  return partners;
}

function getPartnerById(partnerId) {
  return partnerModel.findById(partnerId);
}

module.exports = {
  getPartnerById,
  createPartner,
  getAllPartners,
  updatePartner,
  findPartnersForClasses,
};
