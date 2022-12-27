// eslint-disable-next-line @typescript-eslint/no-var-requires
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  moduleDirectories: ['node_modules', '<rootDir>/'],
  moduleNameMapper: {
    '^@assets/(.*)$': '<rootDir>/src/assets/$1',
    '^@infrastructure/(.*)$': '<rootDir>/src/controller/infrastructure/$1',
    '^@model/(.*)$': '<rootDir>/src/controller/model/$1',
    '^@viewModel/(.*)$': '<rootDir>/src/controller/viewModel/$1',
    '^@service/(.*)$': '<rootDir>/src/controller/service/$1',
    '^@app/(.*)$': '<rootDir>/src/core/app/$1',
    '^@components/(.*)$': '<rootDir>/src/core/components/$1',
    '^@hooks/(.*)$': '<rootDir>/src/core/hooks/$1',
    '^@utils/(.*)$': '<rootDir>/src/core/utils/$1',
    '^@pages/(.*)$': '<rootDir>/src/pages/$1',
    '^@pagesProps/(.*)$': '<rootDir>/src/pagesProps/$1',
    '^@ui/(.*)$': '<rootDir>/src/ui/$1',

    '^spacetime': 'spacetime/builds/spacetime.cjs',
  },
  collectCoverage: false,
  collectCoverageFrom: ['**/*.{ts,tsx}', '!**/*.d.ts', '!**/node_modules/**'],
  reporters: ['default', 'jest-junit'],
  coverageReporters: ['clover', 'json', 'lcov', 'cobertura'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
  testEnvironment: 'jest-environment-jsdom',
  testResultsProcessor: 'jest-sonar-reporter',
  // transformIgnorePatterns: ['/node_modules/(?!(iso-3166))'],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
