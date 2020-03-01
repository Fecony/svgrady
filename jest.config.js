module.exports = {
  transform: {
    '^.+\\.ts?$': 'ts-jest'
  },
  collectCoverage: true,
  coverageDirectory: './coverage/',
  collectCoverageFrom: ['src/*.ts', 'src/**/*.ts', '!**/node_modules/**'],
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'js']
}
