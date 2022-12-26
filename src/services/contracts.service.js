const { getContractByIdAndProfile, findAllContractsByProfile } = require('../repository/contracts.repository');

/**
 * Uses the repository layer to access the contract based on the id and profile
 * @param id Id of the contract
 * @param profile Profile of the user
 * @returns {Promise<Contract>} Promise resolved with the contract found or empty
 */
async function getContract(id, profile) {
  return getContractByIdAndProfile(id, profile);
}

/**
 * Uses the repository layer to find a list of contracts for the given profile
 * @param profile Profile to be filtered
 * @returns {Promise<Contract[]>} List of contracts
 */
async function findAllContracts(profile) {
  return findAllContractsByProfile(profile);
}

module.exports = {
  getContract,
  findAllContracts,
};
