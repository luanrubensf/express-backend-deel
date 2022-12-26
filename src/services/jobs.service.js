const { getUnpaidJobsByProfile, getJobByIdAndProfile, payJob } = require('../repository/jobs.repository');

/**
 * Return a list of unpaid jobs for the given profile
 * @param profile Profile to be filtered
 * @returns {Promise<Job[]>} List of unpaid jobs
 */
async function getUnpaidJobs(profile) {
  return getUnpaidJobsByProfile(profile);
}

/**
 * Pay for a job. It runs some validations first. Then execute the transaction using the repository layer.
 * @param id Id of the job to be paid
 * @param profile Profile that pays the job
 * @returns {Promise<Job>} Paid job
 */
async function payForJob(id, profile) {
  const jobToBePaid = await getJobByIdAndProfile(id, profile);

  validateJobPayment(jobToBePaid, profile);

  await payJob(jobToBePaid, profile);

  return jobToBePaid;
}

/**
 * Validate the job and the profile balance
 * @param jobToBePaid Job to be validated
 * @param profile Profile to be validated
 */
function validateJobPayment(jobToBePaid, profile) {
  if (!jobToBePaid) {
     throw new Error('Job not found for this client');
  }

  if (jobToBePaid.paid) {
    throw new Error('This Job is already paid');
  }

  if (profile.balance < jobToBePaid.price) {
    throw new Error('The client does not have enough money on the balance');
  }
}

module.exports = {
  getUnpaidJobs,
  payForJob,
};
