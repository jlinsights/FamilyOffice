// Mock for uncrypto ESM module to prevent Jest parsing errors
module.exports = {
  default: {
    getRandomValues: jest.fn(),
    randomUUID: jest.fn(() => 'test-uuid'),
    subtle: {},
  },
  getRandomValues: jest.fn(),
  randomUUID: jest.fn(() => 'test-uuid'),
  subtle: {},
};
