const {Profile, sequelize, Job, Contract} = require('../models/model');
const {Op} = require('sequelize');

/**
 * Return the profile for the given id
 * @param userId Profile id
 * @returns {Promise<Profile | null>} Return the profile for the given id if it exists
 */
async function getProfileById(userId) {
  return Profile.findByPk(userId);
}

/**
 * Return the total amount for unpaid jobs for a specific ClientId
 * OBS: only considering active contracts (status = in_progress)
 * @param userId Client id
 * @returns {Promise<number>} The total amount for non paid jobs
 */
async function getJobSum(userId) {
  return Job.sum('price', {
    where: {
      [Op.or]: [
        {paid: false},
        {paid: null},
      ]
    },
    include: {
      model: Contract,
      required: true,
      where: {
        ClientId: userId, status: 'in_progress',
      },
    },
  });
}

/**
 * Creates a deposit for the profile. It increments the balance of the client by a given amount
 * @param userProfile Profile to receive the deposit
 * @param amount Amount to be increased
 * @returns {Promise<void>}
 */
async function createDeposit(userProfile, amount) {
  await userProfile.increment('balance', { by: amount });
}

module.exports = {
  getProfileById,
  getJobSum,
  createDeposit,
};
