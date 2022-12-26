const {calculateBestProfession, calculateBestClients} = require('../src/services/admin.service');

jest.mock('../src/repository/admin.repository', () => {
  return {
    getBestProfession: jest.fn(() => ([{profession: 'Programmer', total: 100}])),
    getBestClients: jest.fn(() => ([
      {
        'ClientId': 4,
        'firstName': 'Ash',
        'lastName': 'Kethcum',
        'total': 2020
      },
      {
        'ClientId': 1,
        'firstName': 'Harry',
        'lastName': 'Potter',
        'total': 643
      }
    ])),
  };
});

const repository = jest.requireMock('../src/repository/admin.repository');

describe('admin service calculateBestProfession tests', () => {
  it('should use the repository to find the best job', async () => {
    const bestProfession = await calculateBestProfession('2020-01-01', '2022-12-30');
    expect(repository.getBestProfession).toHaveBeenCalled();
    expect(bestProfession.profession).toBe('Programmer');
    expect(bestProfession.total).toBe(100);
  });

  it('should fail when the start date is null', async () => {
    await expect(calculateBestProfession(null, '2022-12-30')).rejects.toThrow('You must provide the start and end date');
  });

  it('should fail when the start date is invalid', async () => {
    await expect(calculateBestProfession('2022-40-30', '2022-12-30')).rejects.toThrow('You must provide the start and end date');
  });

  it('should fail when the start date is with an invalid format', async () => {
    await expect(calculateBestProfession('2022-', '2022-12-30')).rejects.toThrow('You must provide the start and end date');
  });

  it('should fail when the end date is null', async () => {
    await expect(calculateBestProfession('2022-12-30', null)).rejects.toThrow('You must provide the start and end date');
  });

  it('should fail when the end date is invalid', async () => {
    await expect(calculateBestProfession('2022-01-30', '2022-40-30')).rejects.toThrow('You must provide the start and end date');
  });

  it('should fail when the end date is with an invalid format', async () => {
    await expect(calculateBestProfession('2022-12-30', '2022-')).rejects.toThrow('You must provide the start and end date');
  });
});

describe('admin service calculateBestClients tests', () => {
  it('should use the repository to find the best clients', async () => {
    const bestClients = await calculateBestClients('2020-01-01', '2022-12-30', 2);
    expect(repository.getBestClients).toHaveBeenCalled();
    expect(bestClients.length).toBe(2);
  });

  it('should fail when the start date is null', async () => {
    await expect(calculateBestClients(null, '2022-12-30', 2)).rejects.toThrow('You must provide the start and end date');
  });

  it('should fail when the start date is invalid', async () => {
    await expect(calculateBestClients('2022-40-30', '2022-12-30', 2)).rejects.toThrow('You must provide the start and end date');
  });

  it('should fail when the start date is with an invalid format', async () => {
    await expect(calculateBestClients('2022-', '2022-12-30', 2)).rejects.toThrow('You must provide the start and end date');
  });

  it('should fail when the end date is null', async () => {
    await expect(calculateBestClients('2022-12-30', null, 2)).rejects.toThrow('You must provide the start and end date');
  });

  it('should fail when the end date is invalid', async () => {
    await expect(calculateBestClients('2022-01-30', '2022-40-30', 2)).rejects.toThrow('You must provide the start and end date');
  });

  it('should fail when the end date is with an invalid format', async () => {
    await expect(calculateBestClients('2022-12-30', '2022-', 2)).rejects.toThrow('You must provide the start and end date');
  });

  it('should fail when the limit is null', async () => {
    await expect(calculateBestClients('2022-01-01', '2022-12-31', null)).rejects.toThrow('You must provide a valid limit');
  });

  it('should fail when the limit is 0', async () => {
    await expect(calculateBestClients('2022-01-01', '2022-12-31', 0)).rejects.toThrow('You must provide a valid limit');
  });
});
