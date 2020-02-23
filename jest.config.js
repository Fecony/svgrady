module.exports = {
  transform: {
    '^.+\\.ts?$': 'ts-jest'
  },
  collectCoverageFrom: ['src/*.{js,ts}'],
  coveragePathIgnorePatterns: ['/node_modules/', '/test/'],
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$',
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'js']
}
