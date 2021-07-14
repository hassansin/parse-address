module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/+(*.)+(spec|test).+(ts|js)?(x)'],
  transform: {
    '^.+\\.(ts|js|html)$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageReporters: ['html'],
}
