const { calculateBestProfession, calculateBestClients } = require('../services/admin.service');

const DEFAULT_LIMIT = 2;

/**
 * Return the best profession with name and total
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function bestProfession(req, res) {
  try {
    const { start, end } = req.query;
    const result = await calculateBestProfession(start, end);
    res.json(result);
  } catch (err) {
    res.status(422).send({
      message: err.message,
    });
  }
}

/**
 * Return a list with the best clients. The size of the list is limited by the `limit` param.
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function bestClients(req, res) {
  try {
    const { start, end, limit } = req.query;
    const result = await calculateBestClients(start, end, limit || DEFAULT_LIMIT);
    res.json(result);
  } catch (err) {
    res.status(422).send({
      message: err.message,
    });
  }
}

module.exports = {
  bestProfession,
  bestClients,
};
