const {Job, Contract, sequelize} = require('../models/model');
const {Op} = require('sequelize');

/**
 * Returns a list of unpaid jobs for the given profile.
 * OBS: only return jobs that belongs to active contracts (status = in_progress)
 * @param profile The profile to be filtered
 * @returns {Promise<Job[]>} List of unpaid jobs
 */
async function getUnpaidJobsByProfile(profile) {
  return await Job.findAll({
        where: {
          [Op.or]: [
            {paid: false},
            {paid: null},
          ]
        },
        include: [{
          model: Contract,
          required: true,
          where: {
            [Op.or]: [{ContractorId: profile.id}, {ClientId: profile.id}],
            status: 'in_progress',
          }
        }]
      }
  );
}

/**
 * Returns a job for the given id that belongs to the client passed on the profile
 * @param id Id of the job
 * @param profile Client profile
 * @returns {Promise<Job>} Job
 */
async function getJobByIdAndProfile(id, profile) {
  return Job.findOne({
    where: {
      id,
    },
    include: {
      model: Contract,
      required: true,
      where: { ClientId: profile.id },
      include: ['Contractor']
    }
  });
}

/**
 * Pay for the job passed. The balance of the profile (client) and the contractor will be updated.
 * It decrements the balance from the profile (client) and increments the balance of the contractor
 * The job paid status will be updated as well.
 *
 * @param job Job to be paid
 * @param profile profile to be updated
 * @returns {Promise<void>}
 */
async function payJob(job, profile) {
  try {
    const contractor = job.Contract.Contractor;

    await sequelize.transaction(async (transaction) => {
      await Promise.all([
        profile.decrement('balance', { by: job.price, transaction }),
        contractor.increment('balance', { by: job.price, transaction }),
        job.update({ paid: true, paymentDate: new Date() }, { transaction }),
      ]);
    });
  } catch (err) {
    console.error(err);
    throw new Error('Occurred an error on the transaction. Try again later.');
  }
}

module.exports = {
  getUnpaidJobsByProfile,
  getJobByIdAndProfile,
  payJob,
};
