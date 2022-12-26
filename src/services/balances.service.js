const {getProfileById, getJobSum, createDeposit}  = require('../repository/balances.repository');

const ALLOWED_JOB_RATE = 0.25;

/**
 * Creates a deposit for a given user. This function runs some validations on the input data.
 * Then it uses the repository layer to compute the jobs sum and to create the deposit.
 * @param userId
 * @param deposit
 * @returns {Promise<Profile|null>}
 */
async function depositsMoneyForUser(userId, deposit) {

  const userProfile = await getProfileById(userId);

  if (!userProfile) {
    return null;
  }

  validateDeposit(deposit);

  const jobsSum = await getJobSum(userId);

  validateJobTotal(deposit, jobsSum);

  await createDeposit(userProfile, deposit.amount);

  return userProfile.reload();
}

function validateDeposit(deposit) {
  if (!deposit || !deposit.amount || isNaN(deposit.amount) || deposit.amount <= 0) {
    throw new Error('Invalid amount. Please pass a valid positive number');
  }
}

function validateJobTotal(deposit, jobsSum) {
  if (!jobsSum) {
    throw new Error('It is not possible to create a deposit since the user does not have unpaid jobs');
  }
  const maxDepositValue = jobsSum * ALLOWED_JOB_RATE;
  if (deposit.amount > maxDepositValue) {
    throw new Error(`You can't make a deposit greather than ${maxDepositValue}`);
  }
}

module.exports = {
  depositsMoneyForUser,
};
