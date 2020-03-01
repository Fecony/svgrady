module.exports = {
  transform: {
    '^.+\\.ts?$': 'ts-jest'
  },
  collectCoverage: true,
  collectCoverageFrom: ['src/*.ts', 'src/**/*.ts', '!**/node_modules/**'],
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'js']
}
