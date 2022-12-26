const { findAllContracts, getContract } = require('../src/services/contracts.service');

jest.mock('../src/repository/contracts.repository', () => {
  return {
    getContractByIdAndProfile: jest.fn(() => ({ id: 1 })),
    findAllContractsByProfile: jest.fn(() => ([{ id: 1 }])),
  };
});

const repository = jest.requireMock('../src/repository/contracts.repository');

describe('contracts service tests', () => {
  it('should use the repository to find the contract', async () => {
    const contract = await getContract({id: 1});
    expect(contract.id).toBe(1);
    expect(repository.getContractByIdAndProfile).toHaveBeenCalled();
    expect(repository.getContractByIdAndProfile.mock.calls.length).toBe(1);
  });

  it('should use the repository to list the contracts', async () => {
    const contracts = await findAllContracts({id: 1});
    expect(contracts.length).toBe(1);
    expect(repository.findAllContractsByProfile).toHaveBeenCalled();
    expect(repository.findAllContractsByProfile.mock.calls.length).toBe(1);
  });
})

