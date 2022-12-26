const { getUnpaidJobs, payForJob } = require('../services/jobs.service');

/**
 * Return the list of unpaid jobs
 * @param req request
 * @param res response
 * @returns {Promise<void>}
 */
async function getUnpaid(req, res) {
  const jobs = await getUnpaidJobs(req.profile);
  res.json(jobs);
}

/**
 * Endpoint to allow the user to pay for jobs
 * @param req request
 * @param res response
 * @returns {Promise<void>}
 */
async function payJob(req, res) {
  const {id} = req.params;
  try {
    const job = await payForJob(id, req.profile);
    res.json({ id: job.id });
  } catch (err) {
    res.status(422).send({
      message: err.message,
    });
  }
}

module.exports = {
  getUnpaid,
  payJob,
};
