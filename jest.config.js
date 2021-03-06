module.exports = {
  preset: 'ts-jest/presets/js-with-ts',
  testEnvironment: 'node',
  testPathIgnorePatterns: [
    '/dist/',
    '/node_modules/',
  ],
  coverageReporters: [
    'text',
    'html',
    'lcov',
  ],
  coverageThreshold: {
    global: {
      branches: 40,
      functions: 38,
      lines: 40,
      statements: 40,
    },
  },
};
