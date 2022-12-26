const { getBestProfession, getBestClients } = require('../repository/admin.repository');
const { isValidDate } = require('../utils/date.utils');
/**
 * Validate the input dates and computes the best profession. Return only one pair of {profession, total}
 * @param start start date to filter the paymentDate
 * @param end end date to filter the paymentDate
 * @returns {Promise<Job>} Pair of {profession, total}
 */
async function calculateBestProfession(start, end) {
  validateDates(start, end);
  const [bestProfessionByMoney] = await getBestProfession(start, end);
  return bestProfessionByMoney;
}

/**
 * Validate the inputs and use the repository layer to get the best clients.
 * @param start start date to filter the paymentDate
 * @param end end date to filter the paymentDate
 * @param limit limit to be applied on the search
 * @returns {Promise<Job[]>} list of the best clients sorted by total spent DESC
 */
async function calculateBestClients(start, end, limit) {
  validateDates(start, end);
  validateLimit(limit);

  return getBestClients(start, end, limit);
}

/**
 * Validate the start and end date.
 * @param start start date
 * @param end end date
 */
function validateDates(start, end) {
  if (!start || !end || !isValidDate(start) || !isValidDate(end)) {
    throw new Error('You must provide the start and end date');
  }
}

/**
 * Validate the limit parameter. It should be a positive number.
 * @param limit limit to be validated
 */
function validateLimit(limit) {
  if (isNaN(limit) || limit <= 0) {
    throw new Error('You must provide a valid limit');
  }
}

module.exports = {
  calculateBestProfession,
  calculateBestClients,
};
