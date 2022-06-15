import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  moduleFileExtensions: ['js', 'json', 'ts'],
  verbose: true,
  testEnvironment: 'node',
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{tsx,ts}',
    '!<rootDir>/src/app.module.ts',
    '!<rootDir>/src/main.ts',
    '!<rootDir>/node_modules/',
    '!<rootDir>/**/__tests__/**',
    '!<rootDir>/**/*.d.ts',
  ],
  coverageDirectory: '../coverage',
  collectCoverage: true,
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80,
    },
  },
};
export default config;
