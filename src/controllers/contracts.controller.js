const { getContract, findAllContracts } = require('../services/contracts.service');

/**
 * Gets a contract for the given id and profile
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
async function get(req, res) {
  const {id} = req.params;
  const contract = await getContract(id, req.profile);
  if (!contract) return res.status(404).end();
  res.json(contract);
}

/**
 * List the contracts for the given profile
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
async function list(req, res) {
  const contract = await findAllContracts(req.profile);
  if (!contract) return res.status(404).end();
  res.json(contract)
}

module.exports = {
  get,
  list,
};
