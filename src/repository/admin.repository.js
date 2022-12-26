const {Job, sequelize, Contract, Profile} = require('../models/model');
const {Op} = require('sequelize');

/**
 * Return the top 1 best paid profession.This considers that the jobs was paid between the start and end date.
 *
 * @param start start date to filter the paymentDate
 * @param end end date to filter the paymentDate
 * @returns {Promise<Job[]>} Best paid profession and value
 */
async function getBestProfession(start, end) {
  return Job.findAll({
    attributes: [
      [sequelize.literal('profession'), 'profession'],
      [sequelize.fn('sum', sequelize.col('price')), 'total']
    ],
    include: [
      {
        model: Contract,
        attributes: [],
        required: true,
        include: [
          {
            model: Profile,
            as: 'Contractor',
            required: true,
            attributes: [],
            where: {
              type: 'contractor',
            },
          },
        ],
      },
    ],
    where: {
      paid: true,
      paymentDate: {
        [Op.gte]: start,
        [Op.lte]: end,
      },
    },
    group: ['profession'],
    order: [[sequelize.col('total'), 'DESC']],
    limit: 1,
    subQuery: false,
  });
}

/**
 * Return a list containing the best clients. The list is sorted by the biggest amount spent with jobs (DESC).
 * It uses the start and end date to filter paymentDate field of the job.
 * @param start start date to filter the paymentDate
 * @param end end date to filter the paymentDate
 * @param limit limit to be applied to the list
 * @returns {Promise<Job[]>} A list containing `limit` results with { ClientId, firstName, lastName, total }
 */
async function getBestClients(start, end, limit) {
  return Job.findAll({
    attributes: [
      [sequelize.literal('Contract.ClientId'), 'id'],
      [sequelize.literal('firstName || " " || lastName'), 'fullName'],
      [sequelize.fn('sum', sequelize.col('price')), 'paid']
    ],
    include: [
      {
        model: Contract,
        attributes: [],
        required: true,
        include: [
          {
            model: Profile,
            as: 'Client',
            required: true,
            attributes: [],
          },
        ],
      },
    ],
    where: {
      paid: true,
      paymentDate: {
        [Op.gte]: start,
        [Op.lte]: end,
      },
    },
    group: ['Contract.ClientId'],
    order: [[sequelize.col('paid'), 'DESC']],
    limit,
    subQuery: false,
  });
}

module.exports = {
  getBestProfession,
  getBestClients,
};
