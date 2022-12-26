const {getJobSum, getProfileById} = require('../src/repository/balances.repository');

const {depositsMoneyForUser} = require('../src/services/balances.service');

jest.mock('../src/repository/balances.repository.js', () => {
  return {
    getProfileById: jest.fn(() => ({id: 1, reload: () => ({id: 1})})),
    getJobSum: jest.fn(() => (100)),
    createDeposit: jest.fn(() => {
    }),
  };
});

const repository = jest.requireMock('../src/repository/balances.repository.js');


describe('balances service tests', () => {

  it('should call the repository methods to create a deposit', async () => {
    const profile = await depositsMoneyForUser(1, {amount: 20});
    expect(repository.getProfileById).toHaveBeenCalled();
    expect(repository.getJobSum).toHaveBeenCalled();
    expect(repository.createDeposit).toHaveBeenCalled();
    expect(profile.id).toBe(1);
  });

  it('should fail when no deposit is provided', async () => {
    await expect(depositsMoneyForUser(1, null)).rejects.toThrow('Invalid amount. Please pass a valid positive number');
  });

  it('should fail when amount is 0', async () => {
    await expect(depositsMoneyForUser(1, {amount: 0})).rejects.toThrow('Invalid amount. Please pass a valid positive number');
  });

  it('should fail when amount is NaN', async () => {
    await expect(depositsMoneyForUser(1, {amount: 'test'})).rejects.toThrow('Invalid amount. Please pass a valid positive number');
  });

  it('should fail when amount is negative', async () => {
    await expect(depositsMoneyForUser(1, {amount: -100})).rejects.toThrow('Invalid amount. Please pass a valid positive number');
  });

  it('should fail when amount is greater than the limit (25%)', async () => {
    await expect(depositsMoneyForUser(1, {amount: 100})).rejects.toThrow('You can\'t make a deposit greather than 25');
  });

  it('should fail when amount is greater than the limit (25%) for a given job sum', async () => {
    getJobSum.mockImplementation(() => 1000);
    await expect(depositsMoneyForUser(1, {amount: 251})).rejects.toThrow('You can\'t make a deposit greather than 250');
  });

  it('should create the deposit when job sum is inside the limit', async () => {
    getJobSum.mockImplementation(() => 1000);
    const profile = await depositsMoneyForUser(1, {amount: 250});
    await expect(profile.id).toBe(1);
  });

  it('should fail there are no job sum', async () => {
    getJobSum.mockImplementation(() => null);
    await expect(depositsMoneyForUser(1, {amount: 251})).rejects.toThrow('It is not possible to create a deposit since the user does not have unpaid jobs');
  });

  it('should return null when the profile is not found', async () => {
    getProfileById.mockImplementation(() => null);
    const profile = await depositsMoneyForUser(1, {amount: 20});
    expect(profile).toBeNull();
  });
});
