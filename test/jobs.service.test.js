const { getJobByIdAndProfile } = require('../src/repository/jobs.repository');

const { getUnpaidJobs, payForJob } = require('../src/services/jobs.service');

jest.mock('../src/repository/jobs.repository', () => {
  return {
    getUnpaidJobsByProfile: jest.fn(() => ([{ id: 1 }])),
    getJobByIdAndProfile: jest.fn(() => ({
      id: 1,
      paid: false,
      price: 200,
    })),
    payJob: jest.fn(() => {}),
  };
});

const repository = jest.requireMock('../src/repository/jobs.repository');

describe('jobs service tests', () => {
  it('should use the repository to find unpaid jobs', async () => {
    const unpaidJobs = await getUnpaidJobs({id: 1});
    expect(unpaidJobs.length).toBe(1);
    expect(repository.getUnpaidJobsByProfile).toHaveBeenCalled();
    expect(repository.getUnpaidJobsByProfile.mock.calls.length).toBe(1);
  });

  it('should use the repository to pay for a valid job', async () => {
    await payForJob(1,{id: 1});
    expect(repository.getJobByIdAndProfile).toHaveBeenCalled();
    expect(repository.payJob).toHaveBeenCalled();
  });

  it('cant pay for an already paid job', async () => {
    getJobByIdAndProfile.mockImplementation(() => ({
      id: 1,
      paid: true,
    }));
    await expect(payForJob(1,{id: 1})).rejects.toThrow('This Job is already paid');
  });

  it('cant pay for not found job', async () => {
    getJobByIdAndProfile.mockImplementation(() => null);
    await expect(payForJob(1,{id: 1})).rejects.toThrow('Job not found for this client');
  });

  it('cant pay for a job if the profile does not have funds', async () => {
    getJobByIdAndProfile.mockImplementation(() => ({
      id: 1,
      paid: false,
      price: 500,
    }));
    await expect(payForJob(1,{id: 1, balance: 100})).rejects.toThrow('The client does not have enough money on the balance');
  });
});


