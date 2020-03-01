module.exports = {
  transform: {
    '^.+\\.ts?$': 'ts-jest'
  },
  collectCoverage: true,
  coverageReporters: ['lcov', 'text-summary', 'json', 'text', 'text-summary', 'html'],
  collectCoverageFrom: ['src/*.ts', 'src/**/*.ts', '!**/node_modules/**'],
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'js']
}
