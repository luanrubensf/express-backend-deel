const { depositsMoneyForUser } = require('../services/balances.service');

/**
 * Creates a deposit based on the user and deposit passed
 * @param req The body should contain a property called "amount"
 * { amount: 100 }
 * @param res
 * @returns {Promise<*>}
 */
async function depositsMoney(req, res) {
  const { userId } = req.params;
  const deposit = req.body;

  try {
    const result = await depositsMoneyForUser(userId, deposit);
    if (!result) {
      return res.status(404).send();
    }
    res.json(result);
  } catch (err) {
    res.status(422).send({
      message: err.message,
    });
  }
}

module.exports = {
  depositsMoney,
};
