const {Contract} = require('../models/model');
const {Op} = require('sequelize');

/**
 * Return the contract for the given id and profile.
 * @param id Id of the contract
 * @param profile Profile of the user. The profile will be used for filtering the ContractorId and ClientId
 * @returns {Promise<Contract>} Promise resolved with the contract found or empty
 */
async function getContractByIdAndProfile(id, profile) {
  return Contract.findOne({
    where: {
      id,
      [Op.or]: [{ContractorId: profile.id}, {ClientId: profile.id}],
    }
  });
}

/**
 * Find all contracts based on a profile. The profile will be used to filter by ContractorId and ClientId
 * @param profile Profile to be used on the filters ClientId and ContractorId
 * @returns {Promise<Contract[]>} Promise that resolves a list of Contracts that belongs to the profile
 */
async function findAllContractsByProfile(profile) {
  return Contract.findAll({
    where: {
      [Op.or]: [{ContractorId: profile.id}, {ClientId: profile.id}],
      status: {
        [Op.ne]: 'terminated',
      },
    }
  });
}

module.exports = {
  getContractByIdAndProfile,
  findAllContractsByProfile,
};
